import React from "react";
import PropTypes from "prop-types";

const FileUpload = props => {
  let fileUpload = null;

  const onRef = input => (fileUpload = input);
  const onClick = e => fileUpload.click();
  const addClickHandler = el => React.cloneElement(el, { onClick });
  const handleFileSelected = e => props.onFileSelected(e.target.files[0]);

  return (
    <div>
      <input
        hidden
        type="file"
        ref={onRef}
        accept={props.accept}
        onChange={handleFileSelected}
      />
      {React.Children.map(props.children, addClickHandler)}
    </div>
  );
};

FileUpload.propTypes = {
  children: PropTypes.node.isRequired,
  accept: PropTypes.string,
  onFileSelected: PropTypes.func.isRequired
};

export default FileUpload;
