import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const postsFetchingState = handleActions(
  {
    [actions.fetchPostsRequest]() {
      return 'requested';
    },
    [actions.fetchPostsFailure]() {
      return 'failed';
    },
    [actions.fetchPostsSuccess]() {
      return 'finished';
    },
  },
  'none',
);

const posts = handleActions(
  {
    [actions.fetchPostsSuccess](state, { payload: { cats } }) {
      const filteredCats = cats.filter(({ data }) => data.post_hint === 'hosted:video' || data.post_hint === 'image');
      const lastId = cats[cats.length - 1].data.name;
      return { ...state, cats: [...state.cats, ...filteredCats], lastId };
    },
  },
  { cats: [], lastId: '', favouritesCatsIds: [] },
);
const favouritesCatsIds = handleActions(
  {
    [actions.toggleFavouritePosts](state, { payload: { name } }) {
      return state.includes(name)
        ? state.filter((namePost) => namePost !== name)
        : [name, ...state];
    },
  },
  [],
);
export default combineReducers({
  postsFetchingState,
  posts,
  favouritesCatsIds,
});
