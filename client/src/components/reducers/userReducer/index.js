/**
 * @function UserReducer [Get the user list]
 * @param {object} state
 * @param {object} action
 */

const initialState = {
    tasks: []
  };
  
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return { ...state, userList: action.payload };
        default:
            return state;
    }
};
  
export default UserReducer;