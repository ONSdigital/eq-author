import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ContentPickerModal from "components/ContentPickerModal";
import generateTestData from "tests/utils/generateMockPiping";

storiesOf("ContentPicker", module).add("ContentPicker", () => {
  const data = generateTestData();
  data[0].pages[0].answers = [];
  return (
    <ContentPickerModal
      data={data}
      isOpen
      onClose={action("close")}
      onSubmit={action(`submit`)}
    />
  );
});
