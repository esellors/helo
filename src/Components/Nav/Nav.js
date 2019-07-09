import React, {Component} from 'react';
import Axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';

class Nav extends Component {
   constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
   }
   componentDidMount() {
      Axios
         .get('/api/auth/me')
         .then(res => this.props.updateUser(res.data.username, res.data.profilePic))
         .catch(err => console.log(err.request));
   }
   handleLogout() {
      Axios
         .post('/api/auth/logout')
         .then(() => {
            this.props.updateUser('','');
            this.props.history.push('/');
         })
         .catch(err => console.log(err.request));
   }
   render() {
      return (
         <>
            {this.props.location.pathname === '/'
            ? null
            : (
               <div>
                  <span>
                     <h1>{this.props.username}</h1>
                     <img src={this.props.profilePic} alt='User Avatar' />
                  </span>
                  <ul>
                     <li><Link to='/dashboard'><button>Home</button></Link></li>
                     <li><Link to='/new'><button>New Post</button></Link></li>
                     <li><button onClick={this.handleLogout}>Logout</button></li>
                  </ul>
               </div>
            )}
         </>
      );
   }
}

const mapStateToProps = reduxState => {
   const {username, profilePic} = reduxState;
   return {
      username, profilePic
   }
};

export default withRouter(connect(mapStateToProps, {
   updateUser
})(Nav))