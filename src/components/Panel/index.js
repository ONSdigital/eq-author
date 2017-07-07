import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "constants/theme";

const Panel = styled.div`
  border-radius: ${theme.radius};
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadow};
`;

Panel.propTypes = {
  children: PropTypes.node.isRequired
};

export const CenteredPanel = styled(Panel)`
  padding: 3em;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Panel;
