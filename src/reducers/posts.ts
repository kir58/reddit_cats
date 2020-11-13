import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { Post } from '../types';

const posts = handleActions<Post>(
  {
    [actions.fetchPostsSuccess.toString()](state, { payload: { cats } }) {
      const filteredCats = cats.filter(({ data }) => data.post_hint === 'hosted:video' || data.post_hint === 'image');
      const lastId = cats[cats.length - 1].data.name;
      return { ...state, cats: [...state.cats, ...filteredCats], lastId };
    },
  },
  { cats: [], lastId: '', favouritesCatsIds: [] },
);

export { posts };
