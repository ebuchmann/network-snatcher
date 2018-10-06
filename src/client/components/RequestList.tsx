import * as React from 'react';
import styled from 'react-emotion';
import { view } from 'react-easy-state';
import RequestItem from './RequestItem';
import ScrollContainer from './ScrollContainer';
import HostFilter from './HostFilter';
import ClearRequests from './ClearRequests';
import store from '../store';

export class RequestList extends React.Component {
  render() {
    const items = Object.values(store.requests)
      .filter(request => request.request.path.includes(store.hostFilter))
      .reverse()
      .map(request => (
        <RequestItem
          key={request.id}
          id={request.id}
          statusCode={request.response.statusCode}
          {...request.request}
        />
      ));

    return (
      <React.Fragment>
        <Header>
          <HostFilter />
          <ClearRequests />
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

export default view(RequestList);
