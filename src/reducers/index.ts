import { combineReducers } from 'redux';
import { CatsIds, Post, PostsFetchingState } from '../types';
import { postsFetchingState } from './postsFetchingState';
import { posts } from './posts';
import { favouritesCatsIds } from './favouritesCatsIds';


export type RootState  = {
  favouritesCatsIds: CatsIds,
  postsFetchingState: PostsFetchingState,
  posts: Post,
};


const rootReducer = combineReducers({
  postsFetchingState,
  posts,
  favouritesCatsIds,
});

export default rootReducer;
