import * as React from 'react';
import { connect } from 'react-redux';
import SingleRequest from '../components/SingleRequest';
import SingleTabs from '../components/SingleTabs';
import { setTab } from '../store/actions/ui';
import { Request } from '../store/reducers/network';

const mapStateToProps = (state, _ownProps) => ({
  request: state.network[state.ui.selectedRequest] as Request,
  selectedTab: state.ui.selectedTab as string,
});

const mapDispatchToProps = dispatch => ({
  setTab: (tab: string) => dispatch(setTab(tab)),
});

interface Props {
  request: Request;
  selectedTab: string;
  setTab: (tab: string) => void;
}

class SingleRequestContainer extends React.Component<Props> {
  render() {
    const { selectedTab, request, setTab } = this.props;
    return (
      <React.Fragment>
        <SingleTabs selectedTab={selectedTab} setTab={setTab} />
        <SingleRequest selectedTab={selectedTab} request={request} />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleRequestContainer);
