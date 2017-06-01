import React from "react";
import { storiesOf } from "@kadira/storybook";
import styled from "styled-components";
import { Grid, Column } from "./index";
import { colors } from "constants/theme";

const GridHelper = styled.div`
  background: ${colors.darkBlue};
  color: white;
  padding: 1em;
`;

storiesOf("Grid", module)
  .add("Equal Columns", () => (
    <Grid>
      <Column>
        <GridHelper>
          Left Column
        </GridHelper>
      </Column>
      <Column>
        <GridHelper>
          Right Column
        </GridHelper>
      </Column>
    </Grid>
  ))
  .add("Unequal Columns", () => (
    <Grid>
      <Column cols={4}>
        <GridHelper>
          4 Columns wide
        </GridHelper>
      </Column>
      <Column>
        <GridHelper>
          8 Columns wide
        </GridHelper>
      </Column>
    </Grid>
  ));
