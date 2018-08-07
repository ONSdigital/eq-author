import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { times } from "lodash";

import DataTable from "components/DataTable";
import DeleteButton from "components/DeleteButton";
import Button from "components/Button";
import IconText from "components/IconText";
import Icon from "./icon-plus.svg?inline";

const header = times(4, x => <td>Header {x}</td>);
const content = [times(4, x => <td>Content {x}</td>)];
const addRowButton = (
  <Button onClick={action("onAddRow")} variant="tertiary" small>
    <IconText icon={Icon} dark>
      Add
    </IconText>
  </Button>
);
const deleteRowButton = (
  <DeleteButton size={"medium"} onClick={action("onDeleteRow")} />
);

storiesOf("DataTable", module).add("Default", () => (
  <DataTable
    header={header}
    content={content}
    addRowButton={addRowButton}
    deleteRowButton={deleteRowButton}
  />
));
