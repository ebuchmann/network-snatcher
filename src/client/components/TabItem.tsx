import * as React from 'react';
import styled, { cx } from 'react-emotion';

interface Props {
  onClick: () => void;
  selectedTab: string;
}

export class TabItem extends React.Component<Props> {
  render() {
    const { onClick } = this.props;
    const isSelected = this.props.selectedTab === this.props.children.toString().toLowerCase();

    return (
      <Tab onClick={onClick} className={cx({ isSelected })}>
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

export default TabItem;
