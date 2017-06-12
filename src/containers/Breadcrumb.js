import { connect } from "react-redux";
import Breadcrumb from "components/Breadcrumb";
import { getRouteByPath } from "routes";

export const mapStateToProps = (state, _) => {
  const { title } = state.questionnaire.meta;
  const { pathname } = state.router.location;
  const route = getRouteByPath(pathname);
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

export default connect(mapStateToProps)(Breadcrumb);
