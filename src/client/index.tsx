import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import 'normalize.css';
import './styles.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers';
import { addRequest } from './store/actions/network';
import App from './components/App';

const store = createStore(rootReducer, composeWithDevTools());

const socket = io.connect('http://localhost:3002');

socket.on('data', data => {
  console.log(data);
  store.dispatch(addRequest(data));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
