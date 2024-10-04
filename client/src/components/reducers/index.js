import { combineReducers } from 'redux';
import TaskReducer from './tasksReducer';
import { LoginReducer } from './authReducer/login';

const Reducers = combineReducers({
    Task: TaskReducer,
    Login: LoginReducer
  });
  
export default Reducers;