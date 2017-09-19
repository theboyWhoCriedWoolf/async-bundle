import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import SquaresView from './SquaresView';
import { fetchPageData } from './actions';
import { squaresState } from './reducer';

const mapStateToProps = state => ({
    ...squaresState(state)
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchPageData }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(SquaresView)
);
