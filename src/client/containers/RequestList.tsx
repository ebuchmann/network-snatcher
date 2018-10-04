import { connect } from 'react-redux';
import RequestList from '../components/RequestList';
import { setRequest, setFilter } from '../store/actions/ui';
import { clearRequests } from '../store/actions/network';

const mapStateToProps = (state, _ownProps) => ({
  requests: state.network,
  hostFilter: state.ui.hostFilter,
});

const mapDispatchToProps = dispatch => ({
  setRequest: (id: string) => dispatch(setRequest(id)),
  setFilter: (text: string) => dispatch(setFilter(text)),
  clearRequests: () => dispatch(clearRequests()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestList);
