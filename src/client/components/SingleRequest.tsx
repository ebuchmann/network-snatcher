import * as React from 'react';
import ReactJson from 'react-json-view';
import { Request } from '../store/reducers/network';
import ScrollContainer from './ScrollContainer';

interface Props {
  request: Request;
  selectedTab: string;
}

export class SingleRequest extends React.Component<Props, null> {
  render() {
    const { request, selectedTab } = this.props;

    if (!request) return null;

    const src = selectedTab === 'response' ? request.response.data : request.response.headers;

    const test = { ...src, res2: src.residents, res3: src.residents, res4: src.residents };

    return (
      <ScrollContainer>
        <ReactJson src={test} theme="monokai" displayDataTypes={false} name={false} />
      </ScrollContainer>
    );
  }
}

export default SingleRequest;
