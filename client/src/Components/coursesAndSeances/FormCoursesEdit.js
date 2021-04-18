import React from "react";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Image,
  List,
  Loader,
  Message,
  Table,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteResources,
  GetCoursesById,
  RetrieveCoursesByIdClass,
  UpdateCourses,
  UpdateResources,
} from "../../redux/slices/Courses";
import TextareaAutosize from "react-textarea-autosize";

import axios from "axios";

function FormCoursesEdit(props) {
  const seances = useSelector((state) => state.seance.seance);
  const [titre, SetTitre] = useState("");
  const [description, SetDescription] = useState("");
  const [idSance, SetIdSeance] = useState(2);
  const [dateCreation, SetDateCreation] = useState(Date.now());
  const [multiple_resources, SetMultiple_resources] = useState([]);
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [selectedItem, SetSelectedItem] = useState(seances[0]._id);
  const [loader, SetLoader] = useState(false);

  const SeanceOptions = [{ key: Number, text: "", value: "" }];

  const coursesId = props.coursesId;
  const dispatch = useDispatch();
  const Resources = useSelector((state) => state.courses.Resources);

  for (let i = 0; i < seances.length; i++) {
    const option = {
      key: seances[i]._id,
      text: seances[i].titre,
      value: seances[i].titre,
    };

    SeanceOptions.push(option);
  }

  useEffect(() => {
    const test = dispatch(GetCoursesById(coursesId)).then((response) => {
      console.log(response);
      SetTitre(response.payload.titre);
      SetDescription(response.payload.description);
      SetSelectedItem(response.payload.idSeance);

      console.log(multiple_resources);
    });
    console.log(test);
  }, [dispatch]);

  const handleTitreChanges = (e) => {
    e.preventDefault();
    SetTitre(e.target.value);
  };
  const handleDescriptionChanges = (e) => {
    e.preventDefault();
    SetDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("this is test");
    console.log(Resources);
    dispatch(
      UpdateCourses(coursesId, titre, description, Resources, selectedItem)
    )
      .then((response) => {
        const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
        console.log(CurrentClass._id);
        dispatch(RetrieveCoursesByIdClass(CurrentClass._id));
        console.log(response);
        SetFormClassName("success");
        SetFormSuccessMessage(response.msg);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            SetFormClassName("warning");
            SetFormErrorMessage(err.response.msg);
          }
        } else {
          SetFormClassName("warning");
          SetFormErrorMessage("Something wen wrong " + err);
        }
      });
  };

  const handleRemoveUpload = (e, res) => {
    console.log(selectedItem);

    console.log(res);
    dispatch(DeleteResources(res));
    console.log("Trigger remove photo");
    console.log(Resources);
  };

  const handleChangeStatus = async ({ meta, file }, status) => {
    console.log(status, meta, file);

    if (status === "done") {
      SetLoader(true);
      var formData = new FormData();
      formData.append("multiple_resources", file);
      await axios
        .post(
          "https://closer-server.herokuapp.com/courses/api/upload",
          formData
        )
        .then((response) => {
          SetLoader(false);
          console.log(response.data.result.reqFiles[0]);
          dispatch(UpdateResources(response.data.result.reqFiles[0]));
        });
      console.log("Trigger update photo");
      console.log(Resources);
    }
    if (status === "removed") {
      let multiple_resource = multiple_resources.slice();
      multiple_resource = multiple_resource.filter((u) => {
        return u !== file;
      });
      SetMultiple_resources(multiple_resource);
    }
  };

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };

  const Preview = ({ meta }) => {
    const { name, percent, status } = meta;
    return <span></span>;
  };

  return (
    <div>
      <Form className={formClassName}>
        <Form.Input
          label="Titre"
          type="text"
          placeholder="Seance 1"
          name="Titre"
          maxLength="40"
          required
          value={titre}
          onChange={handleTitreChanges}
        />
        <Form.Field
          control={TextareaAutosize}
          label="Description"
          type="text"
          placeholder="In this workshop we will learn ..."
          name="Description"
          maxLength="5000"
          required
          value={description}
          onChange={handleDescriptionChanges}
        />

        <br />

        <Header as="h5" icon="file alternate outline" content="Select Seance" />
        <select
          defaultValue={selectedItem}
          value={selectedItem}
          onChange={handleChangeSelect}
        >
          {SeanceOptions.map((c, index) => (
            <option key={index} value={c.key}>
              {c.text}
            </option>
          ))}
        </select>

        <Header as="h5" icon="images outline" content="Select Files" />

        <Dropzone
          inputContent="Drop Files here or click to choose ..."
          onChangeStatus={handleChangeStatus}
          canCancel={false}
          canRemove={false}
          canRestart={false}
          PreviewComponent={Preview}
        />
        <br />
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              <List divided verticalAlign="middle">
                {Resources.map((files, index) => (
                  <List.Item>
                    <List.Content floated="right">
                      <Button
                        circular
                        size="small"
                        color="red"
                        icon="trash"
                        onClick={(e) => {
                          handleRemoveUpload(e, files.url);
                        }}
                      ></Button>
                    </List.Content>
                    {files.type === "image/png" ||
                    files.type === "image/jpg" ||
                    files.type === "image/jpeg" ||
                    files.type === "image/gif" ? (
                      <Image src={files.url} rounded size="mini" />
                    ) : files.type === "application/pdf" ? (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL +
                          "/files-type/" +
                          "pdf" +
                          ".png"
                        }
                      />
                    ) : files.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL +
                          "/files-type/" +
                          "docx" +
                          ".png"
                        }
                      />
                    ) : files.type ===
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL +
                          "/files-type/" +
                          "pptx" +
                          ".png"
                        }
                      />
                    ) : files.type === "video/mp4" ? (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL +
                          "/files-type/" +
                          "mp4" +
                          ".png"
                        }
                      />
                    ) : files.type === "audio/mpeg" ? (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL +
                          "/files-type/" +
                          "mp3" +
                          ".png"
                        }
                      />
                    ) : (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL + "/files-type/" + "noFile.png"
                        }
                      />
                    )}

                    <List.Content>
                      <Header as="h4" color="red">
                        {files.originalname.slice(0, 20)}
                      </Header>
                      <highlight>
                        <strong>{files.type.slice(0, 40)}</strong>
                      </highlight>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid.Row>
        </Grid>

        {loader ? (
          <Dimmer active inverted>
            <Loader inline="centered">Preparing Files ... please wait !</Loader>
          </Dimmer>
        ) : (
          <></>
        )}

        <Message
          success
          color="green"
          header="Nice one! 📒 📕 📚 📖"
          content={formSuccessMessage}
        />
        <Message
          warning
          color="yellow"
          header="Woah! 😱 😨"
          content={formErrorMessage}
        />
        <br />

        <Button color="black" floated="right" onClick={handleSubmit}>
          Save
        </Button>
        <br />
        <br />
      </Form>
    </div>
  );
}

export default FormCoursesEdit;
