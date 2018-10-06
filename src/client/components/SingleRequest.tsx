import * as React from 'react';
import ReactJson from 'react-json-view';
import { view } from 'react-easy-state';
import ScrollContainer from './ScrollContainer';
import store from '../store';

export class SingleRequest extends React.Component {
  render() {
    const request = store.requests[store.selectedRequest];

    if (!request) return null;

    const src = store.selectedTab === 'response' ? request.response.data : request.response.headers;

    return (
      <ScrollContainer>
        <ReactJson src={src} theme="monokai" displayDataTypes={false} name={false} />
      </ScrollContainer>
    );
  }
}

export default view(SingleRequest);
