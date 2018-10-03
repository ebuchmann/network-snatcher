import * as React from 'react';
import ReactJson from 'react-json-view';
import { Request } from '../store/reducers/network';

interface Props {
  request: Request;
  selectedTab: string;
}

export class SingleRequest extends React.Component<Props, null> {
  render() {
    const { request, selectedTab } = this.props;

    if (!request) return null;

    const src = selectedTab === 'response' ? request.response.data : request.response.headers;

    return <ReactJson src={src} theme="monokai" displayDataTypes={false} name={false} />;
  }
}

export default SingleRequest;
