import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Dropdown, MenuItem, MenuList, SubMenuItem } from "components/Menu";
import { map } from "lodash";

const PageMenu = ({ pages, ...otherProps }) => {
  const NUM_LINES = 2;
  const ITEM_HEIGHT = 0.8; //em
  const MAX_VISIBLE_ITEMS = 6;

  const height = MAX_VISIBLE_ITEMS * (ITEM_HEIGHT + NUM_LINES);

  return (
    <Dropdown maxWidth={"25em"}>
      <MenuList maxHeight={`${height}em`}>
        {map(pages, (page, i) => {
          return (
            <SubMenuItem
              key={`page-${i}`}
              menu={<AnswerMenu answers={page.answers} {...otherProps} />}
              lines={NUM_LINES}
            >
              {page.title}
            </SubMenuItem>
          );
        })}
      </MenuList>
    </Dropdown>
  );
};

PageMenu.propTypes = {
  pages: PropTypes.arrayOf(CustomPropTypes.page)
};

const AnswerMenu = ({ answers, ...otherProps }) => (
  <Dropdown maxWidth={"10em"}>
    <MenuList>
      {map(answers, (answer, i) => {
        return (
          <MenuItem key={`answer-${i}`} id={answer.id} {...otherProps}>
            {answer.title}
          </MenuItem>
        );
      })}
    </MenuList>
  </Dropdown>
);

AnswerMenu.propTypes = {
  answers: PropTypes.arrayOf(CustomPropTypes.answer)
};

const SectionMenu = ({ sections, ...otherProps }) => (
  <Dropdown maxWidth={"10em"}>
    <MenuList>
      {map(sections, (section, i) => {
        return section.pages.length > 0 ? (
          <SubMenuItem
            key={`page-${i}`}
            menu={<PageMenu pages={section.pages} {...otherProps} />}
          >
            {section.title}
          </SubMenuItem>
        ) : (
          <MenuItem
            key={`section-${section.id}`}
            id={section.id}
            {...otherProps}
          >
            {section.title}
          </MenuItem>
        );
      })}
    </MenuList>
  </Dropdown>
);

SectionMenu.propTypes = {
  sections: PropTypes.arrayOf(CustomPropTypes.section)
};

const QuestionnaireMenu = ({ questionnaire, ...otherProps }) => (
  <SectionMenu sections={questionnaire.sections} {...otherProps} />
);

QuestionnaireMenu.propTypes = {
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireMenu;
