import * as React from 'react';
import styled from 'react-emotion';

import RequestList from '../containers/RequestList';
import SingleRequest from '../containers/SingleRequest';

export class App extends React.Component {
  render() {
    return (
      <Container>
        <Column>
          <RequestList />
        </Column>
        <Column>
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
