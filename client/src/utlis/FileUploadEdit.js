
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Icon, Segment, Loader, Tab, Dimmer,Message } from "semantic-ui-react";

import { AddquestionsApi } from "../api/api";

function FileUploadEdit(props) {
  const arr = [];
  const [endloader, SetEndLoader] = useState(true);
  const [loader, SetLoader] = useState(false);
  useEffect(() => {
    if (props.listfile != null) {
      props.listfile.forEach((element) => {
        arr.push(element);
      });
    }
  });

  const [hideshow, setetat] = useState("none");

  const [Images, setImages] = useState([]);
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
      props.refreshFunction([...Images, f.name]);
    });
    fd = formData;
    setfd(formData);
    console.log(fd.getAll("files"));
    setImages(arr);

 
  };
  useEffect(async () => {
    console.log(fd.getAll("files"));
    if (props.Enbale ) {
      //save the Image we chose inside the Node Server

    //  SetLoader(true);
      console.log(fd.getAll("files"));
      const config = {
        header: { "content-type": "multipart/form-data" },
      };

      const res = await AddquestionsApi.uploadFileQuestions(fd, config).then(
        (response) => {
          if (response.data) {
          //  SetEndLoader(false)
            console.log("fileeee heree111111111");
          //  SetLoader(false);
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
      <h3>old Files</h3>
      {props.listfile.length===0 &&(
    <Message color='brown'>Opps !! you didn't add files </Message>

      )}
      {props.listfile.map((image, index) => (
          <Segment
            key={index}
            raised
            color="black"
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
                  return (
                    <img
                      style={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                      }}
                      src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${image}?alt=media`}
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
                      src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${image}?alt=media`}
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
                      src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${image}?alt=media`}
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
      <div
        style={{
          display: "wrap" + hideshow,
        }}
      >
          <h3>All File</h3>

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
            
      {loader ? (
        <Dimmer active inverted>
          <Loader inline="centered">Preparing Files ... please wait !</Loader>
        </Dimmer>
      ) : (
        <></>
      )}
   
        
      </div>
      
    </div>
  );
}

export default FileUploadEdit;
