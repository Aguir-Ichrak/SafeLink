import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import BuildingReducer from './BuildingReducer';
import PostReducer from './PostReducer';
import  NotifReduce from './NotifReducer'
const RootReducer = combineReducers({
  users: UserReducer,
  buildings: BuildingReducer,
  posts: PostReducer,
  notifications:NotifReduce
});

export default RootReducer;