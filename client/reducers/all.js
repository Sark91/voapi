// based on https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/create.js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import createMiddleware from 'client/helpers/clientMiddleware';
import ApiClient from 'client/helpers/ApiClient';

import products from 'client/reducers/products';

const finalCreateStore = compose(
  applyMiddleware(
    createMiddleware(new ApiClient()),
    routerMiddleware(browserHistory)
  ),
)(createStore);

export default finalCreateStore(
  combineReducers({
    products,
    debugReducer: (state = {}, action = null) => {
      // eslint-disable-next-line no-console
      console.log(action.type, action, state);
      return state;
    },
  }),
  window.__data,
);
