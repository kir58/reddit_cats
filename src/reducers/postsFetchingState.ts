import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { PostsFetchingState } from '../types';

const postsFetchingState = handleActions<PostsFetchingState>(
  {
    [actions.fetchPostsRequest.toString()]()  {
      return 'requested';
    },
    [actions.fetchPostsFailure.toString()]() {
      return 'failed';
    },
    [actions.fetchPostsSuccess.toString()]() {
      return 'finished';
    },
  },
  'none',
);

export { postsFetchingState };

