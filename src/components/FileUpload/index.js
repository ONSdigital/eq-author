import React from "react";

const FileUpload = (props) => {
  let fileUpload = null;

  const onRef = (input) => (fileUpload = input);
  const onClick = (e) => fileUpload.click();
  const addClickHandler = el => React.cloneElement(el, { onClick });
  const handleFileSelected = e => props.onFileSelected(e.target.files[0]);

  const FileInput = (props) => (
    <input type="file" ref={props.onRef}
      hidden={props.hidden}
      accept={props.accept}
      onChange={handleFileSelected}
    />
  );

  const FileUploadWrapper = (props) => (
    <div>
      <FileInput hidden
        onRef={onRef}
        accept={props.accept}
        onChange={props.onFileSelected}
      />
      {props.children}
    </div>
  );

  return (
    <FileUploadWrapper {...props}>
      {React.Children.map(props.children, addClickHandler)}
    </FileUploadWrapper>
  );
};

FileUpload.propTypes = {
  children: React.PropTypes.element.isRequired,
  onFileSelected: React.PropTypes.func.isRequired
};

export default FileUpload;
