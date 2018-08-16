import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Dropdown, MenuItem, MenuList, SubMenuItem } from "components/Menu";
import { map } from "lodash";

const NUM_LINES = 2;
const ITEM_HEIGHT = 0.8; //em
const MAX_VISIBLE_ITEMS = 6;
const MAX_HEIGHT = MAX_VISIBLE_ITEMS * (ITEM_HEIGHT + NUM_LINES);

const PageMenu = ({ pages, sectionNumber, menuZIndex, ...otherProps }) => (
  <Dropdown maxWidth={"25em"}>
    <MenuList maxHeight={`${MAX_HEIGHT}em`}>
      {map(pages, (page, i) => {
        const title = page.plaintextTitle;
        const menu = page.answers.length ? (
          <AnswerMenu answers={page.answers} {...otherProps} />
        ) : (
          undefined
        );

        return (
          <SubMenuItem
            key={`page-${i}`}
            menu={menu}
            lines={NUM_LINES}
            menuZIndex={menuZIndex}
            disabled={!menu}
          >
            {sectionNumber}.{i + 1} {title || "Page Title"}
          </SubMenuItem>
        );
      })}
    </MenuList>
  </Dropdown>
);

PageMenu.propTypes = {
  pages: PropTypes.arrayOf(CustomPropTypes.page),
  sectionNumber: PropTypes.number.isRequired,
  menuZIndex: PropTypes.number
};

const AnswerMenu = ({ answers, ...otherProps }) => (
  <Dropdown maxWidth={"10em"}>
    <MenuList>
      {map(answers, (answer, i) => {
        return (
          <MenuItem key={`answer-${i}`} item={answer} {...otherProps}>
            {answer.label || "Answer Label"}
          </MenuItem>
        );
      })}
    </MenuList>
  </Dropdown>
);

AnswerMenu.propTypes = {
  answers: PropTypes.arrayOf(CustomPropTypes.answer)
};

const SectionMenu = ({ sections, menuZIndex, ...otherProps }) => (
  <Dropdown maxWidth={"10em"}>
    <MenuList>
      {map(sections, (section, i) => {
        const title = section.plaintextTitle;
        const menu = section.pages.length ? (
          <PageMenu
            pages={section.pages}
            menuZIndex={menuZIndex}
            sectionNumber={i + 1}
            {...otherProps}
          />
        ) : (
          undefined
        );

        return (
          <SubMenuItem
            key={`page-${i}`}
            menuZIndex={menuZIndex}
            menu={menu}
            disabled={!menu}
          >
            {i + 1}. {title}
          </SubMenuItem>
        );
      })}
    </MenuList>
  </Dropdown>
);

SectionMenu.propTypes = {
  sections: PropTypes.arrayOf(CustomPropTypes.section),
  menuZIndex: PropTypes.number
};

const QuestionnaireMenu = ({ questionnaire, ...otherProps }) => (
  <SectionMenu sections={questionnaire.sections} {...otherProps} />
);

QuestionnaireMenu.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  menuZIndex: PropTypes.number
};

export default QuestionnaireMenu;
