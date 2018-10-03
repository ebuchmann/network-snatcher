import { connect } from 'react-redux';
import RequestList from '../components/RequestList';
import { setRequest } from '../store/actions/ui';

const mapStateToProps = (state, _ownProps) => ({
  requests: state.network,
});

const mapDispatchToProps = dispatch => ({
  setRequest: (id: string) => dispatch(setRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestList);
