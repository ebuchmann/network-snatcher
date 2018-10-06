import * as React from 'react';
import styled from 'react-emotion';

import RequestList from '../components/RequestList';
import SingleRequest from '../components/SingleRequest';
import SingleTabs from '../components/SingleTabs';

export class App extends React.Component {
  render() {
    return (
      <Container>
        <Column>
          <RequestList />
        </Column>
        <Column>
          <SingleTabs />
          <SingleRequest />
        </Column>
      </Container>
    );
  }
}

const Container = styled('div')`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-column-gap: 32px;
`;

const Column = styled('div')``;

export default App;
