import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import BuildingReducer from './BuildingReducer';
import PostReducer from './PostReducer';

const RootReducer = combineReducers({
  users: UserReducer,
  buildings: BuildingReducer,
  posts: PostReducer,
});

export default RootReducer;