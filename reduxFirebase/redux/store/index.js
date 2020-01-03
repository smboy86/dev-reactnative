import {createStore, combineReducers} from 'redux';

import counterReducer from '../reducers/CounterReducer';

const store = createStore(
  combineReducers({
    counter: counterReducer,
  }),
);

export default store;
