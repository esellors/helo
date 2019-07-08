module.exports = {
   getAll: async function(req, res) {
      const {userId, showOwnBool} = req.params;
      const {search} = req.body;

      let posts = [];

      const db = req.app.get('db');

      // get all posts
      if (showOwnBool === 'true') {
         posts = await db.posts.get_all_with_user();
      } else {
         posts = await db.posts.get_all_without_user(userId);
      }

      // filter retrieved posts if search was provided
      if (search) {
         const filteredPosts = posts.filter(post =>{
            return post.title.toLowerCase().includes(search.toLowerCase());
         });

         return res.status(200).json(filteredPosts);
      }

      res.status(200).json(posts);
   }
};