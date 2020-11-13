import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { CatsIds } from '../types';

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

export { favouritesCatsIds };
