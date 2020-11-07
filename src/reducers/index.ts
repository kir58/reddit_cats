import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { CatDetail, CatsIds } from '../types';

interface Post {
  cats: CatDetail[],
  lastId: string,
  favouritesCatsIds: CatsIds
}

export type RootState  = {
  favouritesCatsIds: Array<string>,
  postsFetchingState: string,
  posts: Post,
};

const postsFetchingState = handleActions(
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

const posts = handleActions(
  {
    [actions.fetchPostsSuccess.toString()](state, { payload: { cats } }) {
      const filteredCats = cats.filter(({ data }) => data.post_hint === 'hosted:video' || data.post_hint === 'image');
      const lastId = cats[cats.length - 1].data.name;
      return { ...state, cats: [...state.cats, ...filteredCats], lastId };
    },
  },
  { cats: [], lastId: '', favouritesCatsIds: [] },
);

type PayloadFavouritesCatsIds = {
  name: string,
}

const favouritesCatsIds = handleActions<CatsIds, PayloadFavouritesCatsIds>(
  {
    [actions.toggleFavouritePosts.toString()](state, { payload: { name } }) {
      return state.includes(name)
        ? state.filter((namePost) => namePost !== name)
        : [name, ...state];
    },
  },
  [],
);

const rootReducer = combineReducers({
  postsFetchingState,
  posts,
  favouritesCatsIds,
});

export default rootReducer;
