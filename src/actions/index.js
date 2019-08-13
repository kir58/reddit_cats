import { createAction } from 'redux-actions';
import axios from 'axios';
import { LIMIT } from '../constants';

export const fetchPostsRequest = createAction('POSTS_FETCH_REQUEST');
export const fetchPostsSuccess = createAction('POSTS_FETCH_SUCCESS');
export const fetchPostsFailure = createAction('POSTS_FETCH_FAILURE');
export const toggleFavouritePosts = createAction('TOGGLE_FAVOURITE_POSTS');

export const fetchPosts = (lastId = '') => async (dispatch) => {
  dispatch(fetchPostsRequest());
  try {
    const response = await axios.get(`https://www.reddit.com/r/cats.json?after=${lastId}&limit=${LIMIT}`);
    dispatch(fetchPostsSuccess({ cats: response.data.data.children }));
  } catch (e) {
    dispatch(fetchPostsFailure());
  }
};
