import React, { Component } from "react";
import FileViewer from "react-file-viewer";
import PDFViewer from "pdf-viewer-reactjs";

const path = "http://localhost:5000/images/";

function DisplayFile(props) {
  const filename = props.match.params.name;
  var fileExtension = filename.split(".").pop();
  console.log(fileExtension);
  if (fileExtension === "pdf") {
    return (
      <PDFViewer 
    
        document={{
          url: `${path}/${filename}`,
        }}
      />
    );
  }
  return (
    <FileViewer
     fileType={fileExtension} filePath={`${path}/${filename}`}
      />
  );
}

export default DisplayFile;
