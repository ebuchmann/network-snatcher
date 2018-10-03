import * as React from 'react';
import TabItem from './TabItem';

interface Props {
  selectedTab: string;
  setTab: (tab: string) => void;
}

export class SingleTabs extends React.Component<Props, null> {
  render() {
    const { setTab, selectedTab } = this.props;

    return (
      <div>
        <TabItem onClick={() => setTab('response')} selectedTab={selectedTab}>
          Response
        </TabItem>
        <TabItem onClick={() => setTab('headers')} selectedTab={selectedTab}>
          Headers
        </TabItem>
      </div>
    );
  }
}

export default SingleTabs;
