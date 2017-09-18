import { compose } from "react-apollo";
import { connect } from "react-redux";
import Questionnaires from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";

const mapStateToProps = (state, ownProps) => ({
  questionnaires: [
    // {
    //   id: 1,
    //   name: "Retail turnover",
    //   date: "10/07/2017",
    //   theme: "Business",
    //   status: "Unpublished",
    //   comments: {
    //     unread: true,
    //     count: 1
    //   },
    //   actions: {
    //     delete: true
    //   }
    // },
    // {
    //   id: 2,
    //   name: "MWSS",
    //   date: "20/08/2017",
    //   theme: "Business",
    //   status: "Unpublished",
    //   comments: {
    //     unread: false,
    //     count: 0
    //   },
    //   actions: {
    //     delete: true
    //   }
    // },
    // {
    //   id: 3,
    //   name: "Census",
    //   date: "10/07/2017",
    //   theme: "Business",
    //   status: "Unpublished",
    //   comments: {
    //     unread: false,
    //     count: 1
    //   },
    //   actions: {
    //     delete: true
    //   }
    // }
  ]
});

export default compose(connect(mapStateToProps), withQuestionnaireList)(
  Questionnaires
);
