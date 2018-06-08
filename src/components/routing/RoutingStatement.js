import React, { Fragment } from "react";
import PropTypes from "prop-types";

import TextButton from "components/TextButton";
import { Grid, Column } from "components/Grid";
import styled from "styled-components";

const CenteringColumn = styled(Column)`
  display: flex;
  justify-content: center;
  padding: 0.25em 0;
  margin-bottom: 0.5em;
`;

const RoutingStatement = ({
  children,
  onAddCondition,
  canRoute,
  routingRuleId
}) => (
  <Fragment>
    {children}
    {canRoute && (
      <Grid align="center">
        <CenteringColumn gutters={false} cols={1}>
          <TextButton
            onClick={function() {
              onAddCondition(routingRuleId);
            }}
            data-test="btn-add"
          >
            AND
          </TextButton>
        </CenteringColumn>
      </Grid>
    )}
  </Fragment>
);

RoutingStatement.propTypes = {
  children: PropTypes.node.isRequired,
  onAddCondition: PropTypes.func.isRequired,
  canRoute: PropTypes.bool.isRequired
};

export default RoutingStatement;
