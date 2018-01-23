import { compose } from "react-apollo";
import { connect } from "react-redux";

import QuestionnaireRouting from "./QuestionnaireRoutingPage";
import withQuestionnaire from "containers/enhancers/withQuestionnaire";
import { getUrlParams } from "utils/UrlUtils";
import { bindActionCreators } from "redux";
import * as ActionCreators from "redux/routing/actions";

import { map } from "lodash";

export const mapStateToProps = (state, { match }) => {
  const urlParams = getUrlParams(match.params);
  const { pageId } = urlParams;
  const { pages, rules, conditions, options } = state.routing;

  const page = pages[pageId];

  let props = {
    ...urlParams,
    routing: {
      pages
    }
  };

  if (page) {
    props = {
      ...props,
      routing: {
        ...props.routing,
        rules: map(page.rules, ruleId => ({
          ...rules[ruleId],
          conditions: map(rules[ruleId].conditions, conditionId => ({
            ...conditions[conditionId],
            options: map(rules[ruleId].options, conditionId => ({
              ...options[conditionId]
            }))
          }))
        }))
      }
    };
  }

  return props;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

const connected = connect(mapStateToProps, mapDispatchToProps);

export default compose(connected, withQuestionnaire)(QuestionnaireRouting);
