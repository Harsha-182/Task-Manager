import { combineReducers } from 'redux';
import { LoginReducer } from './authReducer/login';
import { SignUpReducer } from './authReducer/signup';
import {UserReducer, UserDBReducer} from './userReducer';
import TaskReducer from './tasksReducer';

const Reducers = combineReducers({
    Task: TaskReducer,
    Login: LoginReducer,
    User: UserReducer,
    Signup: SignUpReducer,
    GetUsers: UserDBReducer,
  });
  
export default Reducers;