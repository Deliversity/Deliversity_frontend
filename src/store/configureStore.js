import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import authentication from './reducer/authentication';
import thunk from 'redux-thunk';

const enhancers = [];
const middleware = [thunk];

const composeEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const rootReducer = combineReducers({
  authentication: authentication,
});

const configureStore = () => createStore(rootReducer, composeEnhancers);
export default configureStore;
