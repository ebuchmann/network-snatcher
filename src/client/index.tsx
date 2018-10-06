import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import 'normalize.css';
import './styles.css';
import store from './store';
import App from './components/App';

const socket = io.connect('/');

socket.on('data', data => {
  store.addRequest(data);
});

ReactDOM.render(<App />, document.getElementById('root'));
