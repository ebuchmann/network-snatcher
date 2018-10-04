import * as React from 'react';
import styled from 'react-emotion';
import RequestItem from './RequestItem';
import { Request } from '../store/reducers/network';
import ScrollContainer from './ScrollContainer';
import HostFilter from './HostFilter';
import ClearRequests from './ClearRequests';

interface Props {
  requests: { [id: string]: Request };
  hostFilter: string;
  setRequest: (id: string) => void;
  setFilter: (text: string) => void;
  clearRequests: () => void;
}

export class RequestList extends React.Component<Props, null> {
  render() {
    const { hostFilter, setRequest, requests, setFilter, clearRequests } = this.props;
    const items = Object.values(requests)
      .filter(request => request.request.path.includes(hostFilter))
      .reverse()
      .map(request => (
        <RequestItem
          setRequest={setRequest}
          key={request.id}
          id={request.id}
          statusCode={request.response.statusCode}
          {...request.request}
        />
      ));

    return (
      <React.Fragment>
        <Header>
          <HostFilter setFilter={setFilter} hostFilter={hostFilter} />
          <ClearRequests clearRequests={clearRequests} />
        </Header>
        <ScrollContainer>{items}</ScrollContainer>
      </React.Fragment>
    );
  }
}

const Header = styled('div')`
  border-bottom: 2px solid #999;
  display: grid;
  grid-template-columns: 80% 20%;
  padding: 10px 0;
`;

export default RequestList;
