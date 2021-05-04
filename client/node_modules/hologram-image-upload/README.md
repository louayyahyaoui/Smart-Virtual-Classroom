# Hologram Image Upload

React image uploader with dropzone and cropper function, which used [React Dropzone](https://github.com/okonet/react-dropzone) and [React Image Crop](https://github.com/DominicTobias/react-image-crop).

You can please feel free to open issues or pull request.

[![npm]( 	http://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/hologram-image-upload)

## Demo
https://hologram.sardo.work/

## Features
- Using dropzone to upload multiple image files
- Crop and preview image  

## Browser Support
- Latest Firefox
- Latest Chrome
- IE 11 and Edge

## Installation
```bash
npm install hologram-image-upload --save
```

## Usage
```js
import Hologram from 'hologram-image-upload';
```

After version 2.5, you will not need require any css file now.

## Props

#### defaultFiles (optional)
Mockup images of dropzone. You could pass the name, url, and type of file, then it will be add to dropzone when Hologram mounted.

```jsx
<Hologram defaultFiles={[{name: 'dummy.jpg', url: 'https://s3-ap-southeast-1.amazonaws.com/dummy/dummy.jpg', type: 'image/jpeg'}]}/>
```

#### uploader (optional)
The post url of your upload handler. You need to pass this prop or a custom upload function for everything to work.

```jsx
<Hologram uploader="upload.php"/>
```

#### maxFiles (optional)
If files more than this number, it will not be uploaded. However, if number is -1, user will be allow to upload unlimited number of image. Default Number is -1.

```js
var maxFiles = 10;
<Hologram uploader="upload.php" maxFiles={maxFiles}/>
```

#### Custom Upload Function (optional)
If you want, you can pass in your custom upload function as a prop. The function takes two arguments: The file information and the actual file data. This function MUST return a promise


```jsx
myUploadFunc(file, data) {
  return new Promise((resolve, reject) => {
    // FANCY TASKS HERE
    // do this and this and this
    // END OF FANCY TASKS
    request.post(FANCY_URL).send(MY_FANCY_DATA).end((err, res) =>{
      if (err) return reject(err)
      resolve(res)
    });
  });
}

<Hologram uploadFunction={this.myUploadFunc.bind(this)} ></Hologram>
```

#### dropzoneConfig (optional)
Config of React Dropzone.
https://github.com/okonet/react-dropzone

```jsx
var dropzoneConfig = {
            style : {
                textAlign: 'center',
                padding: '2.5em 0',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff'
            }
    }

<Hologram uploader="upload.php" dropzoneConfig={dropzoneConfig}/>
```


#### cropperConfig (optional)
Config of React Image Crop.
https://github.com/DominicTobias/react-image-crop

```jsx
var crop = {
	x: 20,
	y: 10,
}

<Hologram uploader="upload.php" cropperConfig={crop} />
```

#### onComplete(result) (optional)
Callback function which trigger when image uploaded.
It will pass a object which contain http response, you can use it to handler the result of upload.  

## Contributing

You can clone this repository then start develop at sandbox, or feel free to open issue on github.

Build package:

```bash
npm run build
```

Watch package change and build it:

```bash
npm run watch
```
