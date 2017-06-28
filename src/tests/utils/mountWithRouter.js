import PropTypes from "prop-types";
import { mount } from "enzyme";
import createRouterContext from "react-router-test-context";

export const mountWithRouter = child =>
  mount(child, {
    context: createRouterContext(),
    childContextTypes: { router: PropTypes.object }
  });
