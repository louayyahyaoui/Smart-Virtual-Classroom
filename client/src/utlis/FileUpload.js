import { set } from "js-cookie";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Icon, Segment, Loader, Tab, Dimmer, Label } from "semantic-ui-react";
import { array } from "yup/lib/locale";
import { AddquestionsApi } from "../api/api";

function FileUpload(props) {
  const arr = [];
  const [enablee, setUploadfilee] = useState(props.Enbale);
  const [loader, SetLoader] = useState(false);
  const [endloader, SetEndLoader] = useState(true);
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

  const [Images, setImages] = useState(arr);
  var [fd, setfd] = useState(new FormData());

  const onDrop = (files) => {
    const file = [];
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    files.forEach((f) => {
      formData.append("files", f);

      arr.push(f.name);
      props.refreshFunction(arr);
    });
    fd = formData;
    setfd(formData);
    setImages(arr);

    /*formData.append("files", files[i]);
    fd = formData;
    setfd(formData);
   */
  };

  useEffect(async () => {
    if (props.Enbale && endloader) {
      //save the Image we chose inside the Node Server

      SetLoader(true);
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      const res = await AddquestionsApi.uploadFileQuestions(fd, config).then(
        (response) => {
          if (response.data) {
            SetEndLoader(false);
            setImages(response.data);
            props.refreshFunction(response.data);
            SetLoader(false);
            setImages([]);
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
              //border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Label as="a" onClick={() => setetat("flex")}>
              <div style={{ display: "flex" }}>
                <Icon name="paperclip" floated />
                <p>Add</p>
              </div>
            </Label>
          </div>
        )}
      </Dropzone>

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
      {loader ? (
        <Dimmer active inverted>
          <Loader inline="centered">Preparing Files ... please wait !</Loader>
        </Dimmer>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FileUpload;
