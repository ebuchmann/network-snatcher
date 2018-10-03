import * as React from 'react';
import styled from 'react-emotion';
import RequestItem from './RequestItem';
import { Request } from '../store/reducers/network';

interface Props {
  requests: { [id: string]: Request };
  setRequest: (id: string) => void;
}

export class RequestList extends React.Component<Props, null> {
  render() {
    const items = Object.values(this.props.requests).map(request => (
      <RequestItem
        setRequest={this.props.setRequest}
        key={request.id}
        id={request.id}
        statusCode={request.response.statusCode}
        {...request.request}
      />
    ));

    return (
      <React.Fragment>
        <Header>
          <span>Method</span>
          <span>Host</span>
          <span>Status</span>
        </Header>
        {items}
      </React.Fragment>
    );
  }
}

const Header = styled('div')`
  border-bottom: 2px solid #999;
  display: grid;
  grid-template-columns: 15% 75% 10%;
  padding: 10px 0;
`;

export default RequestList;
