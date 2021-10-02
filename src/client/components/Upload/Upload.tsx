import React, { useEffect, useState } from "react";
import { CloudinaryContext } from "cloudinary-react";
import Button from "@mui/material/Button";

const CloudinaryUploadWidget = ({ image, setUpdate }) => {
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
            {image ? "Change file" : "Choose file"}
          </Button>
        </label>
      </CloudinaryContext>
    </>
  );
};

export default CloudinaryUploadWidget;
