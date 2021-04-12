import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Icon, Segment } from "semantic-ui-react";
import { AddquestionsApi } from "../api/api";

function FileUpload(props) {
  const arr = [];

  useEffect(() => {
    if (props.upImg === 0) {
      if (props.listfile != null) {
        
        props.listfile.forEach((element) => {
          arr.push(element);

        });   
      } else {
        alert("hi 2")
        setImages([]);
      }
    }
  });

  const [hideshow, setetat] = useState("none");

  const [Images, setImages] = useState(arr);
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    AddquestionsApi.uploadFileQuestions(formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.fileName]);
        console.log(Images)

        props.refreshFunction([...Images, response.data.fileName]);
      } else {
        alert("Failed to save the File in Server");
      }
    });
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flexwrap" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
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

      <div
        style={{
          display: "wrap" + hideshow,
        }}
      >
        {Images.map((image, index) => (
          <Segment  raised color="black" onClick={() => onDelete(image)}>
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
                  return (
                    <img
                      style={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                      }}
                      src={`http://localhost:5000/file/${image}`}
                      alt={`scan`}
                    />
                  );
                case "jpeg":
                  return (
                    <img
                      style={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                      }}
                      src={`http://localhost:5000/file/${image}`}
                      alt={`scan`}
                    />
                  );
                case "png":
                  return (
                    <img
                      style={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                      }}
                      src={`http://localhost:5000/file/${image}`}
                      alt={`scan`}
                    />
                  );

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
