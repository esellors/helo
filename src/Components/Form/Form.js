import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class Form extends Component {
   constructor(props) {
      super(props);
      this.state = {
          title: '',
          img: '',
          content: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleInputChange(e) {
      const {name, value} = e.target;
      this.setState({ [name]: value });
   }
   handleSubmit() {
      const {title, img, content} = this.state;
      const {userId} = this.props;

      // validate all fields filled out
      if (!title || !img || !content) return alert('One or more fields are blank')
      
      const post = {userId, title, img, content};

      Axios
         .post('/posts/create', post)
         .then(() => this.props.history.push('/dashboard'))
         .catch(err => console.log(err.request));
   }
   render() {

      let {title, img, content} = this.state;

      if (!img) img = 'https://via.placeholder.com/150';

      return (
         <div>
            <h1>New Post</h1>
            <label>Title</label>
            <input
               type='text'
               value={title}
               name='title'
               onChange={this.handleInputChange}
            />
            <img src={img} alt='Post Visual' />
            <label>Image URL</label>
            <input
               type='text'
               value={this.state.img}
               name='img'
               onChange={this.handleInputChange}
            />
            <textarea
               value={content}
               name='content'
               onChange={this.handleInputChange}
            />
            <button onClick={this.handleSubmit}>Post</button>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.id
   }
}

export default connect(mapStateToProps)(Form)