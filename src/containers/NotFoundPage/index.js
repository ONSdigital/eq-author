import React from "react";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import Link from "components/Link";
import brokenPencil from "./broken-pencil.min.svg";
import styled from "styled-components";

const CenteredPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6em;
`;

const Pencil = styled.div`
  background: url(${brokenPencil}) no-repeat top left;
  background-size: contain;
  width: 397px;
  height: 135px;
`;

const Title = styled.h1`
  font-size: 1em;
  font-weight: 600;
`;

const pageTitle = "Page not found";

const NotFound = props => {
  return (
    <BaseLayout docTitle={pageTitle} hasNav={false}>
      <Grid>
        <Column cols={6} offset={3}>
          <CenteredPane>
            <Pencil />
            <Title>
              404 – Sorry, the page you were looking for was not found.
            </Title>
            <Link href="/">Back to home</Link>
          </CenteredPane>
        </Column>
      </Grid>
    </BaseLayout>
  );
};

export default NotFound;
