import { Component } from "react";
import Dropzone from "react-dropzone-uploader";
import { Form, Input } from "semantic-ui-react";

const imageDataUrl =
  "http://localhost:5000/public/01a17c80-4320-4f6e-aded-a3d973a6deb4-téléchargement.jpg";

class InitialFileFromDataUrl extends Component {
  constructor() {
    super();
    this.state = {
      file: undefined,
      text: "",
      list: [],
    };
    this.handleClick = this.handleClick.bind(this);
    //this.test = this.test.bind(this);
    this.onChangeMethode = this.onChangeMethode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeMethode() {
    return (e) => {
      this.setState({
        text: e.target.value,
      });
    };
  }

  UNSAFE_componentWillMount() {
    fetch(imageDataUrl).then((res) => {
      res.arrayBuffer().then((buf) => {
        const file = new File([buf], "image_data_url.jpg", {
          type: "image/jpeg",
        });
        this.setState({ file });
      });
    });
  }

  handleClick() {}

  getUploadParams() {
    return { url: "https://httpbin.org/post" };
  }

  async handleSubmit(files, allFiles) {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());

    this.setState({
      // list: this.state.list.push(files.map((f) => f.meta.name)),
      list: [...this.state.list.concat(files.map((f) => f.meta.name))],
    });

    console.log("this is your list " + this.state.list);
  }

  render() {
    const { file } = this.state;
    if (!file)
      return (
        <div
          style={{ border: "2px solid #d9d9d9", padding: 10, borderRadius: 4 }}
          onClick={this.handleClick}
        >
          Click me .
        </div>
      );

    return (
      <div>
        <Form onSubmit={this.test}>
          <Input type="text" onChange={this.onChangeMethode} />
          <Dropzone
            //getUploadParams={this.getUploadParams}
            InputComponent={null}
            onSubmit={this.handleSubmit}
            initialFiles={[file]}
            canCancel={true}
            canRemove={true}
            canRestart={true}
          />
        </Form>
        <h3>{this.state.list}</h3>
      </div>
    );
  }
}
export default InitialFileFromDataUrl;
