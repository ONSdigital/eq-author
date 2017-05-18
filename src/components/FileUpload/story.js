import React from "react";
import { storiesOf } from "@kadira/storybook";
import Button from "../Button";
import FileUpload from "./index";

storiesOf("FileUpload", module)
  .add("Default", () => (
    <FileUpload>
      <button>Open a file</button>
    </FileUpload>
  ))
  .add("Restrict file type", () => (
    <FileUpload accept=".json">
      <button>Open a file</button>
    </FileUpload>
  ))
  .add("Custom Button Style", () => (
    <FileUpload>
      <Button primary>Open a file</Button>
    </FileUpload>
  ))
  .add("File Selected", () => {
    const onFileSelected = (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => alert(e.target.result);
        fileReader.readAsText(file);
      }
    };

    return (
      <FileUpload onFileSelected={onFileSelected} accept=".json">
        <button>Open a file</button>
      </FileUpload>
    );
  });
