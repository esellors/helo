const bcrypt = require('bcryptjs');

module.exports = {
   getSession: async function(req, res) {

      // if no current session, return response
      if (!req.session.user) return res.sendStatus(204);

      // if current session, get and return user info
      const {id} = req.session.user;

      const db = req.app.get('db');

      const foundUserRes = await db.auth.get_session(id);
      const foundUser = foundUserRes[0];

      const userInfo = {
         username: foundUser.username,
         profilePic: foundUser.profile_pic
      };

      res.status(200).json(userInfo);
   },
   register: async function(req, res) {
      const {username, password} = req.body;
      const db = req.app.get('db');

      // check for existing username
      const existingUser = await db.auth.check_username(username);

      if (existingUser[0]) {
         return res.status(400).send('That username is taken');
      }

      // generate password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      // generate profile pic
      const profilePic = `https://robohash.org/${username}`;

      // add new user to users db
      const newUserRes = await db.auth.register(username, hash, profilePic);
      const newUser = newUserRes[0];

      // add new user to session and return user info
      req.session.user = { id: newUser.id };

      const userInfo = {
         username: newUser.username,
         profilePic: newUser.profile_pic
      };

      res.status(200).json(userInfo);
   },
   login: async function(req, res) {
      const {username, password} = req.body;
      const db = req.app.get('db');

      // validate is existing username and get object if is
      const foundUserRes = await db.auth.check_username(username);
      const foundUser = foundUserRes[0];
      
      if (!foundUserRes[0]) {
         return res.status(400).send('Username not found');
      }

      // compare saved hash w/ user's pw
      const isAuthenticated = bcrypt.compareSync(password, foundUser.password);

      if (!isAuthenticated) return res.status(401).send('Password incorrect');

      // if passwords match, create session and return user info
      req.session.user = { id: foundUser.id };

      const userInfo = {
         username: foundUser.username,
         profilePic: foundUser.profile_pic
      };

      res.status(200).json(userInfo);
   },
   updateUsername: async function(req, res) {
      const {username} = req.params;
      const db = req.app.get('db');

      await db.auth.update_username(req.session.user.id, username);

      res.sendStatus(200);
   },
   logout: function(req, res) {
      req.session.destroy();
      res.sendStatus(200);
   }
};