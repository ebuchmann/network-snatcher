import * as React from 'react';
import TabItem from './TabItem';

export class SingleTabs extends React.Component {
  render() {
    return (
      <div>
        <TabItem>Response</TabItem>
        <TabItem>Headers</TabItem>
      </div>
    );
  }
}

export default SingleTabs;
