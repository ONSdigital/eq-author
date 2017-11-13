import { findIndex } from "lodash";

import getTextFromHTML from "utils/getTextFromHTML";

const routingOptions = (section, question, questionnaire) => {
  const { pages } = section;
  const { sections } = questionnaire;

  const questionIndex = findIndex(pages, question);
  const sectionIndex = findIndex(sections, section);

  const options = [
    {
      label: "Questions in this section",
      options: pages.map((question, index) => ({
        title: `${sectionIndex + 1}.${index + 1}. ${getTextFromHTML(
          question.title
        )}`,
        disabled: index <= questionIndex
      }))
    },
    {
      label: "Other sections",
      options: sections.map((section, index) => ({
        title: `${index + 1}. ${getTextFromHTML(section.title)}`,
        disabled: index <= sectionIndex
      }))
    },

    {
      label: "Questionnaire summary",
      options: [{ title: "Summary" }]
    }
  ];

  return options;
};

export default routingOptions;
