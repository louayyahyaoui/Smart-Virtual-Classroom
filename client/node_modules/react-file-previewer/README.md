# react-file-previewer
A browser/device-agnostic file previewer for PDF and image file types built on top of React-PDF.

## Installation
```
npm i react-file-previewer
```

## Usage
This component supports URLs and base64 encoded data.

### Basic Usage
```javascript
import FilePreviewer from 'react-file-previewer';

export const App = () => (
    <div>
        <h1>My App</h1>
        <FilePreviewer file={{
            url: "https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf"}}
        />
    </div>
);
```

### Base64 Usage
```javascript
import FilePreviewer from 'react-file-previewer';

export const App = () => (
    <div>
        <h1>My App</h1>
        <FilePreviewer 
            file={{
                data: "<base64 string>",
                mimeType: 'application/pdf',
                name: 'sample.pdf' // for download
            }}
        />
    </div>
);
```

### Using with HTML file input
```javascript
import { useState } from 'react';
import FilePreviewer from 'react-file-previewer';

const PDF1_URL =
  'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';

export const App = () => {
    const [file, setFile] = useState({ url: PDF1_URL });
    
    const onFileChange = event => {
        const fileReader = new window.FileReader();
        const file = event.target.files[0];
        
        fileReader.onload = fileLoad => {
            const { result } = fileLoad.target;
            setFile({ url: result });
        };
        
        fileReader.readAsDataURL(file);
    };

    return (
        <div>
            <h1>My App</h1>
            <input type="file" onChange={onFileChange} />
            <FilePreviewer 
                file={file}
            />
        </div>
    )
};
```

### Using it as a thumbnail
This will render the first page of the file as a thumbnail. It takes the exact same props as the default export
`FilePreviewer`.

```javascript
import {FilePreviewerThumbnail} from 'react-file-previewer';

export const App = () => (
    <div>
        <h1>My App</h1>
        <FilePreviewerThumbnail 
            file={{
                data: "<base64 string>",
                mimeType: 'application/pdf',
                name: 'sample.pdf' // for download
            }}
        />
        -or-
        <FilePreviewerThumbnail file={{
            url: "https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf"}}
        />
    </div>
);
```

## FilePreviewer Props

| Prop name    | Type     | Description |
|:-------------|:---------|:------------|
| file         | object   | Refer to [file object](#file-object) |
| onClick      | function | Event handler for when viewer is clicked |
| hideControls | bool  | If 'true', viewer won't display the zoom, page up/down, and fit-to-screen controls |

## FilePreviewerThumbnail Props

| Prop name    | Type     | Description |
|:-------------|:---------|:------------|
| file         | object   | Refer to [file object](#file-object) |
| onClick      | function | Event handler for when viewer is clicked |
| hideControls | bool  | If 'true', viewer won't display the zoom, page up/down, and fit-to-screen controls |
| style        | object  | Any css style overrides |

### File Object

| Prop name | Type   | Description |
|:----------|:-------|:------------|
| url       | string | This can be used by itself with no other prop |
| data      | string | Base64 encoded string of file. If used, `mimeType` must also be provided |
| mimeType  | string | Type of the file |
| name      | string | Used to specify the filename when download button is clicked |
