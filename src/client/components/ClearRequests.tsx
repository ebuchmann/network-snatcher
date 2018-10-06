import * as React from 'react';
import store from '../store';

export class ClearRequests extends React.Component {
  render() {
    return (
      <span onClick={store.clearRequests} style={{ justifySelf: 'right' }}>
        Clear list
      </span>
    );
  }
}

export default ClearRequests;
