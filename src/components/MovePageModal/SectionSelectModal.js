import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Option, ItemSelect } from "./ItemSelect";
import PlainModal, { Title, Fieldset, Body } from "./PlainModal";
import getTextFromHTML from "utils/getTextFromHTML";

const SectionSelectModal = ({
  isOpen,
  onClose,
  sections,
  selectedSection,
  onChange
}) => (
  <PlainModal isOpen={isOpen} onClose={onClose}>
    <Fieldset>
      <Title>Section</Title>
      <Body>
        <ItemSelect
          value={selectedSection.id}
          onChange={onChange}
          name="section"
        >
          {sections.map(section => (
            <Option key={section.id} value={section.id}>
              {getTextFromHTML(section.title)}
            </Option>
          ))}
        </ItemSelect>
      </Body>
    </Fieldset>
  </PlainModal>
);

SectionSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedSection: CustomPropTypes.section.isRequired,
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired
};

export default SectionSelectModal;
