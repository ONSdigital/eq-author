import {connect} from 'react-redux';
import SurveySidebar from 'components/SurveySidebar';

const mapStateToProps = (state, ownProps) => {
  return {
    sections: state.survey.groups[0].blocks[1].sections,
  };
};

export default connect(mapStateToProps)(SurveySidebar);
