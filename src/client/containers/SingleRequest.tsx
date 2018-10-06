import * as React from 'react';
import SingleRequest from '../components/SingleRequest';
import SingleTabs from '../components/SingleTabs';

class SingleRequestContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SingleTabs />
        <SingleRequest />
      </React.Fragment>
    );
  }
}

export default SingleRequestContainer;
