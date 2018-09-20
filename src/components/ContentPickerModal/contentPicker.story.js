import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ContentPickerModal from "components/ContentPickerModal";
import generateTestData from "tests/utils/generateMockPiping";

storiesOf("ContentPicker", module)
  .add("ContentPicker", () => {
    const answerData = generateTestData();
    answerData[0].pages[0].answers = [];

    const metadataData = [
      { id: "1", displayName: "ru_name" },
      { id: "2", displayName: "collection_exercise_sid" },
      { id: "3", displayName: "language_code" }
    ];
    return (
      <ContentPickerModal
        answerData={answerData}
        metadataData={metadataData}
        isOpen
        onClose={action("close")}
        onSubmit={action(`submit`)}
      />
    );
  })
  .add("No metadata", () => {
    const answerData = generateTestData();
    answerData[0].pages[0].answers = [];

    const metadataData = [];
    return (
      <ContentPickerModal
        answerData={answerData}
        metadataData={metadataData}
        isOpen
        onClose={action("close")}
        onSubmit={action(`submit`)}
      />
    );
  });
