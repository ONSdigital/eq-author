import { connect } from "react-redux";

import * as ActionCreators from "redux/uiState/actions";

export const mapStateToProps = (state, { match }) => state.uiState;

export default connect(mapStateToProps, ActionCreators);
