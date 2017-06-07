import { connect } from "react-redux";
import Breadcrumb from "components/Breadcrumb";
import { getRouteByPath } from "routes";

export const mapStateToProps = (state, ownProps) => {
  const { title } = state.survey.meta;
  const { pathname } = state.router.location;
  const route = getRouteByPath(pathname);
  const rootPath = "/";

  return {
    breadcrumbs: [
      {
        title: getRouteByPath(rootPath).title,
        path: rootPath
      },
      {
        title: route ? route.title : title,
        path: state.router.location.pathname
      }
    ]
  };
};

export default connect(mapStateToProps)(Breadcrumb);
