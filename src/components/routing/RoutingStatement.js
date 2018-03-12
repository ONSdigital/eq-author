import React, { Fragment } from "react";
import PropTypes from "prop-types";

import TextButton from "components/TextButton";
import { Grid, Column } from "components/Grid";
import styled from "styled-components";

const CenteringColumn = styled(Column)`
  display: flex;
  justify-content: center;
  padding: 0.25em 0;
`;

const RoutingStatement = ({ children, onAddCondition }) => (
  <Fragment>
    {children}
    <Grid align="center">
      <CenteringColumn gutters={false} cols={1.5}>
        <TextButton onClick={onAddCondition} data-test="btn-add">
          AND
        </TextButton>
      </CenteringColumn>
    </Grid>
  </Fragment>
);

RoutingStatement.propTypes = {
  children: PropTypes.node.isRequired,
  onAddCondition: PropTypes.func.isRequired
};

export default RoutingStatement;
