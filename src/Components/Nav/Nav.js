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
   handleLogout() {
      Axios
         .post('/auth/logout')
         .then(() => {
            this.props.updateUser('','','');
            this.props.history.push('/');
         })
         .catch(err => {
            console.log(err.request);
            alert(err.request.response);
         });
   }
   render() {
      console.log(this.props)
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