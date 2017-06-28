import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

import {
  Table,
  TableBody,
  TableHead,
  TableCol,
  TableRow
} from "components/Table";

const Margin = styled.div`
  margin: 1em
`;

storiesOf("Table", module)
  .addDecorator(story => <Margin>{story()}</Margin>)
  .add("Default", () =>
    <Table>
      <TableHead>
        <TableCol>Justo</TableCol>
        <TableCol>Magna</TableCol>
        <TableCol>Amet</TableCol>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCol>1</TableCol>
          <TableCol>2</TableCol>
          <TableCol>3</TableCol>
        </TableRow>
      </TableBody>
    </Table>
  );
