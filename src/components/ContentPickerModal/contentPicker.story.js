import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ContentPickerModal from "components/ContentPickerModal";
import generateTestData from "tests/utils/generateMockPiping";

storiesOf("ContentPicker", module).add("ContentPicker", () => (
  <ContentPickerModal
    data={generateTestData()}
    isOpen
    onClose={action("close")}
    onSubmit={action(`submit`)}
  />
));
