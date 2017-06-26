import { graphql, gql } from "react-apollo";
import { connect } from "react-redux";
import Breadcrumb from "components/Breadcrumb";
import { getRouteByPath } from "routes";

export const getQuestionnaire = gql`
  query GetQuestionnaire($id: ID!) {
    questionnaire(id: $id) {
      title,
    }
  }
`;

export const mapStateToProps = (state, ownProps) => {
  return { pathname: state.router.location.pathname };
};

export const mapResultsToProps = ({ data, ownProps: { pathname } }) => {
  const rootPathname = "/";
  let title = "";

  const route = getRouteByPath(pathname);

  if (route) {
    title = route.title;
  } else if (data.questionnaire) {
    title = data.questionnaire.title;
  }

  return {
    breadcrumbs: [
      {
        title: getRouteByPath(rootPathname).title,
        pathname: rootPathname
      },
      {
        title,
        pathname
      }
    ]
  };
};

const BreadcrumbsWithData = graphql(getQuestionnaire, {
  props: mapResultsToProps,
  options: { variables: { id: 1 } }
})(Breadcrumb);

export default connect(mapStateToProps)(BreadcrumbsWithData);
