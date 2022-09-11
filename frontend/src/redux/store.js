import  {createStore, applyMiddleware} from 'redux';
// import {configureStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [thunk];
export const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
// export const store = configureStore(reducer);
