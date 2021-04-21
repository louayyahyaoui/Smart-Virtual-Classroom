import { set } from "js-cookie";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Icon, Segment, Loader, Tab, Dimmer } from "semantic-ui-react";
import { array } from "yup/lib/locale";
import { AddquestionsApi } from "../api/api";

function FileUpload(props) {
  const arr = [];
  const [enablee, setUploadfilee] = useState(props.Enbale);
  const [loader, SetLoader] = useState(false);

  useEffect(() => {
    if (props.upImg === 0) {
      if (props.listfile != null) {
        props.listfile.forEach((element) => {
          arr.push(element);
        });
      } else {
        setImages([]);
      }
    }
  });

  const [hideshow, setetat] = useState("none");

  const [loaderFile, setLoaderFile] = useState(true);
  const [Images, setImages] = useState(arr);
  var [fd, setfd] = useState(new FormData());

  const onDrop = (files) => {
    const file = [];
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    files.forEach((f) => {
      formData.append("files", f);

      console.log(formData.getAll("files"));
      arr.push(f.name);
      props.refreshFunction(arr);
    });
    fd = formData;
    setfd(formData);
    console.log(fd.getAll("files"));
    setImages(arr);

    /*formData.append("files", files[i]);
    fd = formData;
    setfd(formData);
   */
  };
  useEffect(async () => {
    console.log(fd.getAll("files"));
    if (props.Enbale) {
      setLoaderFile(false);
      //save the Image we chose inside the Node Server

      console.log(fd.getAll("files"));
      const config = {
        header: { "content-type": "multipart/form-data" },
      };

      const res = await AddquestionsApi.uploadFileQuestions(fd, config).then(
        (response) => {
          
          console.log("repsonse!!!!");

          if (response.data != null) {
            setLoaderFile(true);
            console.log("hi");
          } else {
            alert("Failed to save the File in Server");
          }
        }
      );
    }
  });

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flexwrap" }}>
      <Dropzone onDrop={onDrop} multiple={true} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <Icon
              onClick={() => setetat("flex")}
              name="paperclip"
              style={{ fontSize: "1rem" }}
            />
          </div>
        )}
      </Dropzone>
      {!loaderFile ? (
        <Dimmer active inverted>
          <Loader inline="centered">Preparing Files ... please wait !</Loader>
        </Dimmer>
      ) : (
        <></>
      )}

      <div
        style={{
          display: "wrap" + hideshow,
        }}
      >
        {Images.map((image, index) => (
          <Segment
            key={index}
            raised
            color="black"
            onClick={() => onDelete(image)}
          >
            {(() => {
              switch (image.split(".").pop()) {
                case "pdf":
                  return <Icon name="file pdf" color="white" size="huge" />;
                case "docx":
                  return <Icon name="file word" color="blue" size="huge" />;
                case "pptx":
                  return (
                    <Icon name="file powerpoint" color="red" size="huge" />
                  );
                case "xlsx":
                  return (
                    <Icon name="file excel outline" color="green" size="huge" />
                  );
                case "zip":
                  return <Icon name="zip" size="huge" />;
                case "js":
                  return <Icon name="js" size="huge" />;
                case "php":
                  return <Icon name="zip" size="huge" />;
                case "txt":
                  return <Icon name="file text" size="huge" />;

                case "jpg":
                  return <Icon name="file image" color="blue" size="huge" />;

                case "jpeg":
                  return <Icon name="file image" color="blue" size="huge" />;

                case "png":
                  return <Icon name="file image" color="blue" size="huge" />;

                default:
                  return <Icon name="file" color="red" />;
              }
            })()}
            <p
              style={{
                wordBreak: "break-all",
              }}
            >
              {image}
            </p>
          </Segment>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
