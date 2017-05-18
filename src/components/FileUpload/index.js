import React from "react";

const FileUpload = (props) => {
  let fileUpload = null;

  const onRef = (input) => {
    fileUpload = input;
  };

  const onClick = (e) => {
    fileUpload.click();
  };

  const FileInput = (props) => (
    <input type="file" ref={props.onRef}
      hidden={props.hidden}
      accept={props.accept}
      onChange={props.onChange}
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
      {React.Children.map(props.children, button => {
        return React.cloneElement(button, { onClick: onClick });
      })}
    </FileUploadWrapper>
  );
};

FileUpload.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default FileUpload;
