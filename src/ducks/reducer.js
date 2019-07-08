const initialState = {
   id: '',
   username: '',
   profilePic: ''
};

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(id, username, profilePic) {
   
   return {
      type: UPDATE_USER,
      payload: {id, username, profilePic}
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;

   switch(type) {
      case UPDATE_USER:
         const {id, username, profilePic} = payload;

         return {
            ...state,
            id,
            username,
            profilePic
         }
      default: return state;
   }
}