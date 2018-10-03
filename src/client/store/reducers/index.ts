import { combineReducers } from 'redux';
import network from './network';
import ui from './ui';

export default combineReducers({
  network,
  ui,
});
