import { graphql, gql } from "react-apollo";
import { connect } from "react-redux";
import Breadcrumb from "components/Breadcrumb";
import { getRouteByPath } from "routes";

const getQuestionnaire = gql`
  query GetQuestionnaire {
    questionnaire(id: 1) {
      title
    }
  }
`;

export const mapStateToProps = (state, ownProps) => {
  const { pathname } = state.router.location;
  const route = getRouteByPath(pathname);
  return { pathname, route };
};

export const mapResultsToProps = ({ data, ownProps }) => {
  const { title } = data.questionnaire || "";
  const { pathname, route } = ownProps;
  const rootPathname = "/";

  return {
    breadcrumbs: [
      {
        title: getRouteByPath(rootPathname).title,
        pathname: rootPathname
      },
      {
        title: route ? route.title : title,
        pathname
      }
    ]
  };
};

const BreadcrumbsWithData = graphql(getQuestionnaire, {
  props: mapResultsToProps
})(Breadcrumb);

export default connect(mapStateToProps)(BreadcrumbsWithData);
