import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import CirclesView from './CirclesView';
import { fetchPageData } from './actions';
import { getCirclesState } from './reducer';

const mapStateToProps = state => ({
    ...getCirclesState(state)
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchPageData }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(CirclesView)
);
