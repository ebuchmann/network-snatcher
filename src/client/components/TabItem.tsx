import * as React from 'react';
import styled, { cx } from 'react-emotion';
import { view } from 'react-easy-state';
import store from '../store';

export class TabItem extends React.Component {
  render() {
    const tabName = this.props.children.toString().toLowerCase();
    const isSelected = store.selectedTab === tabName;

    return (
      <Tab onClick={() => store.setUiItem('selectedTab', tabName)} className={cx({ isSelected })}>
        {this.props.children}
      </Tab>
    );
  }
}

interface TabProps {
  className?: string;
}

const Tab = styled('span')<TabProps>`
  padding: 10px 10px 11px 10px;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;

  &.isSelected {
    border-bottom: 2px solid #999;
  }
`;

export default view(TabItem);
