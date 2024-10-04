import { combineReducers } from 'redux';
import TaskReducer from './tasksReducer';

const Reducers = combineReducers({
    Task: TaskReducer,
  });
  
export default Reducers;