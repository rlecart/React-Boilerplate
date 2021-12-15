import '../style/App.css'
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import NotFound from './components/NotFound';
import HomeContainer from './containers/HomeContainer';

import {
  Route,
  Switch
} from 'react-router-dom';

import socketReducer from './reducers/socketReducer.js';
import homeReducer from "./reducers/homeReducer.js";
import configureStore from './middleware/configureStore.js';

const Store = configureStore(combineReducers({
  socketReducer,
  homeReducer,
}, undefined, {}));

const Root = () => (
  <Provider store={Store}>
    <Switch>
      <Route exact path='/' component={HomeContainer} />
      <Route component={NotFound} />
    </Switch>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));