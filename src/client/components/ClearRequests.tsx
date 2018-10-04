import * as React from 'react';

interface Props {
  clearRequests: () => void;
}

export class ClearRequests extends React.Component<Props, null> {
  render() {
    const { clearRequests } = this.props;

    return (
      <span onClick={clearRequests} style={{ justifySelf: 'right' }}>
        Clear list
      </span>
    );
  }
}

export default ClearRequests;
