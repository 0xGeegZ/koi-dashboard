import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CloudinaryContext } from "cloudinary-react";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";

const StyledInput = styled.input`
  display: none;
`;

const CloudinaryUploadWidget = ({ setUpdate }) => {
  useEffect(() => {
    // @ts-ignore: test
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "djapnmv8y",
        uploadPreset: "amiub2zj",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setUpdate((k) => ({ ...k, image: result.info.url }));
        }
      }
    );
    // @ts-ignore: test
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <>
      <CloudinaryContext cloudName="djapnmv8y">
        <label htmlFor="image">
          <Button
            id="upload_widget"
            variant="contained"
            color="primary"
            component="span"
          >
            Choose file
          </Button>
        </label>
      </CloudinaryContext>

      {/* {showUploadWidget()} */}
    </>
  );
};

export default CloudinaryUploadWidget;
