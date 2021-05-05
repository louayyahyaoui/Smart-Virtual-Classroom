import React, { useEffect, useState } from "react";

import Select from "react-select";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import {
  Dropdown,
  Button,
  Form,
  Grid,
  Rail,
  Segment,
  TextArea,
  Label,
  Modal,
  Confirm,
  Header,
  Message,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../helpers/auth";
import FileUpload from "../../utlis/FileUpload";
import {
  assignTask,
  getTaskByTeacher,
  postTasks,
} from "../../redux/slices/Task";
import { AddquestionsApi } from "../../api/api";
import { addQuestion } from "../../redux/slices/questionslice";
import MultiSelect from "react-multi-select-component";

export default function ModalTaskFile(props) {
  const currentClass = JSON.parse(localStorage.getItem("idClass"));

  //const [classCurr , setClassCurr] = useState([]);
  // setClassCurr(currentClass.classUsers)
  //const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const seances = useSelector((state) => state.seance.seance);
  const studentChosen = [];
  const seanceChosen = [];

  currentClass.classUsers.forEach((element) => {
    studentChosen.push({ label: element.name, value: element._id });
  });
  console.log(studentChosen);
  seances.forEach((element) => {
    seanceChosen.push({ label: element.titre, value: element });
  });
  const [cancel, setCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const [opensave, setOpensave] = useState(false);

  const [close, setClose] = useState(false);

  const [successMessage, SetSuccessMessage] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const [selectedSeance, setSelectedSeance] = useState(null);
  const [openModel, setOpenModel] = useState(false);

  const [selected, setSelected] = useState([]);

  const [tasks, setTask] = useState({
    title: "",
    description: "",
    theme: "",
    cour: currentClass._id,
    typeTask: "File",

    listQuestion: [],
    listStudents: [],
    endDate: null,
    creator: isAuth()._id,
  });

  const taskDetail = {
    idUser: isAuth()._id,
    idClass: currentClass._id,
  };

  const dispatch = useDispatch();
  const clicCancel = () => {
    setCancel(true);
  };
  const clicOpen = () => {
    setOpen(true);
  };
  const clicOpensave = () => {
    setOpensave(true);
  };
  const clicConfirmCancel = () => {
    SetSuccessMessage("");
    setOpenModel(false);
  };
  const clicConfirm = () => {
    setTask(
      currentClass.classUsers.forEach((itemselect) => {
        const index = selected.findIndex(
          (item) => item.value === itemselect._id
        );
        if (index !== -1) {
          tasks.listStudents.push(itemselect);
          // tasks.listStudents.push(itemselect);
        }
      })
    );
    console.log(selectedSeance);
    setTask((tasks.theme = selectedSeance.value));
    // setTask(...tasks.listStudents = listStud);
    setTask(...(tasks.listQuestion = Images));

    setSelected([]);
    setSelectedSeance(null);
    setEnableUpload(true);
    setOpensave(false);
    dispatch(postTasks(tasks)).then(() => {
      setEnableUpload(false);
      dispatch(getTaskByTeacher(taskDetail));
      setTask({
        title: "",
        description: "",
        theme: "",
        cour: currentClass._id,
        typeTask: "File",

        listQuestion: [],
        listStudents: [],
        endDate: null,
        creator: isAuth()._id,
      });
      SetSuccessMessage("Assgin Task successfully !");
    });
  };

  const clicConfirmAssign = () => {
    setTask(
      currentClass.classUsers.forEach((itemselect) => {
        const index = selected.findIndex(
          (item) => item.value === itemselect._id
        );
        if (index !== -1) {
          tasks.listStudents.push(itemselect);
          // tasks.listStudents.push(itemselect);
        }
      })
    );
    setTask((tasks.theme = selectedSeance.value));
    // setTask(...tasks.listStudents = listStud);
    setTask(...(tasks.listQuestion = Images));
    setSelected([]);
    setSelectedSeance(null);
    setEnableUpload(true);
    setOpen(false);
    dispatch(assignTask(tasks)).then(() => {
      setEnableUpload(false);
      dispatch(getTaskByTeacher(taskDetail));

      setTask({
        title: "",
        description: "",
        theme: "",
        cour: currentClass._id,
        typeTask: "File",

        listQuestion: [],
        listStudents: [],
        endDate: null,
        creator: isAuth()._id,
      });
      SetSuccessMessage("Assgin Task successfully !");
    });
  };
  const clicClose = () => {
    setOpen(false);
    // setOpenModel(false);
  };
  const clicClosesave = () => {
    setOpensave(false);
    // setOpenModel(false);
  };
  const clicCloseCancel = () => {
    setCancel(false);
    // setOpenModel(false);
  };

  const [enableUpload, setEnableUpload] = useState(false);
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const handleOpen = () => {
    setOpenModel(true);
  };

  return (
    <>
      <Modal
        trigger={
          <Dropdown.Item
            onClick={handleOpen}
            icon="clipboard"
            text="Add Task"
          />
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
        open={openModel}
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          {successMessage ? (
            <Message
              success
              color="green"
              header="Nice one! 📒 📕 📚 📖"
              content={successMessage}
            />
          ) : (
            <></>
          )}

          {errorMessage ? (
            <Message
              warning
              color="yellow"
              header="Woah! 😱 😨"
              content={errorMessage}
            />
          ) : (
            <></>
          )}
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Form>
                  <Form.Field>
                    <Form.Input
                      label="Title"
                      required
                      value={tasks.title}
                      onChange={(e) =>
                        setTask({ ...tasks, title: e.target.value })
                      }
                      placeholder="Title"
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Description</label>
                    <TextArea
                      required
                      label="Description"
                      value={tasks.description}
                      onChange={(e) =>
                        setTask({ ...tasks, description: e.target.value })
                      }
                      placeholder="Description.."
                      style={{ minHeight: 50 }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Due</label>
                    <SemanticDatepicker
                      onChange={(e, data) =>
                        setTask({ ...tasks, endDate: data.value })
                      }
                      value={tasks.endDate}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header
                  as="h5"
                  icon="check square outline"
                  content={"Choose Theme  "}
                />
                <Select
                  options={seanceChosen}
                  value={selectedSeance}
                  onChange={setSelectedSeance}
                />

                <Header
                  as="h5"
                  icon="check square outline"
                  content={" For Student  "}
                />

                <MultiSelect
                  options={studentChosen}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <FileUpload
            refreshFunction={updateImages}
            listfile={null}
            Enbale={enableUpload}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" floated="right" onClick={clicConfirmCancel}>
            Back
          </Button>

          <Button
            color="red"
            type="submit"
            onClick={() => clicOpensave()}
            //onClick={onSubmitSaveTask}
            disabled={
              tasks.title === "" ||
              tasks.description === "" ||
              tasks.endDate === null ||
              selectedSeance === null ||
              selected === []
            }
          >
            Save
          </Button>
          <Confirm
            size="tiny"
            header="Save Task To Assign"
            content="Are you sure?"
            open={opensave}
            onCancel={clicClosesave}
            onConfirm={clicConfirm}
          />

          <Button
            color="red"
            type="submit"
            // onClick={onSubmitAssignTask}
            onClick={() => clicOpen()}
            disabled={
              tasks.title === "" ||
              tasks.description === "" ||
              tasks.endDate === null ||
              selectedSeance === null ||
              selected === []
            }
          >
            Assign
          </Button>

          <Confirm
            size="tiny"
            header="Assign Task To Student"
            content="Are you sure?"
            open={open}
            onCancel={clicClose}
            onConfirm={clicConfirmAssign}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
