/* eslint-disable no-undef */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App/App';
import reducers from './reducers';

const favouritesCatsIdsFromLocalStorage = localStorage.getItem('favouritesCatsIds');
const favouritesCatsIds = {
  favouritesCatsIds: favouritesCatsIdsFromLocalStorage ? JSON.parse(favouritesCatsIdsFromLocalStorage) : [],
};

const store = createStore(
  reducers,
  favouritesCatsIds,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

store.subscribe(() => {
  const { favouritesCatsIds } = store.getState();
  localStorage.setItem('favouritesCatsIds', JSON.stringify(favouritesCatsIds));
});

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
