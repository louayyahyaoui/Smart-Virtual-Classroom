import React, { useState } from "react";

import { Multiselect } from "multiselect-react-dropdown";
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
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../helpers/auth";
import FileUpload from "../../utlis/FileUpload";
import { assignTask, getTaskByTeacher, postTasks } from "../../redux/slices/Task";
import { AddquestionsApi } from "../../api/api";
import { addQuestion } from "../../redux/slices/questionslice";

export default function ModalTaskFile(props) {

    const [cancel, setCancel] = useState(false);
    const [open, setOpen] = useState(false);
    const [opensave, setOpensave] = useState(false);
  
    const [close, setClose] = useState(false);
    const currentClass = JSON.parse(localStorage.getItem("idClass"));
    const seances = useSelector((state) => state.seance.seance);
    const [studentChosen] = useState(currentClass.classUsers);

    const [listStud , setListStud] = useState([]);

    const [theme, setTheme] = useState([]);
   
    const [tasks , setTask] = useState({
   
        title : "",
        description : "",
        theme : "",
        cour : currentClass._id,
        typeTask : "File",
        listQuestion : [],
        listStudents : [],
        endDate : null,
        creator : isAuth()._id
     
    });

    const taskDetail={
      "idUser":isAuth()._id,
      "idClass" : currentClass._id,
      
    }
  
    const  dispatch = useDispatch();
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
      //dispatch(postTasks(props.data));
     // props.nextStep(step + 1);
     setCancel(false);
    };
    const clicConfirm = () => {
      setTask(...tasks.theme = theme._id);
      setTask(...tasks.listStudents = listStud);
      setTask(...tasks.listQuestion = Images);
      setEnableUpload(true);
      dispatch(postTasks(tasks)).then(()=>{
        dispatch(getTaskByTeacher(taskDetail));
      });
     
    
      setOpensave(false);
    };
    const clicConfirmAssign = () => {
      setTask(...tasks.theme = theme._id);
      setTask(...tasks.listStudents = listStud);
      setTask(...tasks.listQuestion = Images);
      setEnableUpload(true);
      dispatch(assignTask(tasks)).then(()=>{
        dispatch(getTaskByTeacher(taskDetail));
      });;
    
      setOpen(false);
    };
    const clicClose = () => {
      setOpen(false);
    };
    const clicClosesave = () => {
      setOpensave(false);
    };
    const clicCloseCancel = () => {
      setCancel(false);
    };

      const event = (selectedList) => {
        //prop(tasks);

        setTask(...tasks.theme = theme._id);
        setTask(...tasks.listStudents = listStud);
        setTask(...tasks.listQuestion = Images);
        
        console.log(tasks.listStudents);
    
     
      };
    
      const onSelect = (selectedList, selectedItem) => {
       console.log(selectedItem);
       setListStud(selectedList);

    console.log(listStud);
      };
      const onRemove = (selectedList, removedItem) => {
    
         listStud.filter(
            (item) => item._id !== removedItem._id
          );
          setListStud(selectedList);
        
        console.log(listStud);
      
      };
    
      const selectedTheme = (selectedList, selectedItem) => {
       
       setTheme(selectedItem);
  
      };
      const [enableUpload, setEnableUpload] = useState(false);
      const [Images, setImages] = useState([]);
      const updateImages = (newImages) => {
    
        setImages(newImages);
        
       
      };
    return (
        <div>
               <Modal
        trigger={<Dropdown.Item icon="file text" text="Add Task" />}
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form >
                <Form.Field>
                  <Form.Input
                    label="Title"
                    required
                   
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
              <label>For : </label>
              <Multiselect
              required
                placeholder="Select seance"
                style={{
                  chips: { background: "red" },
                  option: { color: "black" },
                  searchBox: {
                  
                    border: "none",
                  },
                  chips: { // To change css chips(Selected options)
                    background: "red"
                    }
                }}
                onSelect={selectedTheme}
                fluid
                options={seances}
                selection
                singleSelect={true}
                hidePlaceholder
                displayValue="titre"
              
              />
              <br/>
              <Form.Field required>
                           <label>For : </label>
              <Multiselect
                placeholder="Select Student"
                style={{
                  chips: { background: "red" },
                  option: { color: "black" },
                  searchBox: {
                    // To change search box element look
                    border: "none",
                  },
                  chips: { // To change css chips(Selected options)
                    background: "red"
                    }
                }}
                loadingMessage
                showArrow
                fluid
                selection
                multiple
                displayValue="name"
                options={studentChosen}
                selectedValues={tasks.listStudents}
                onSelect={onSelect}
                onRemove={onRemove}
                hidePlaceholder
              />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>

               
        <FileUpload refreshFunction={updateImages} listfile={null} Enbale={enableUpload}/>
      
      
     
        </Modal.Content>
     
        <Button.Group floated="right">
        <Button onClick={() => clicCancel()}>Cancel</Button>
        <Confirm
          header="Cancel Add "
          content="Are you sure?"
          open={cancel}
          onCancel={clicCloseCancel}
          onConfirm={clicConfirmCancel}
        />
        <Button.Or />
        <Button
          color="red"
          type="submit"
          onClick={() => clicOpensave()}
          //onClick={onSubmitSaveTask}
        >
          Save
        </Button>
        <Confirm
          header="Save Task To Assign"
          content="Are you sure?"
          open={opensave}
          onCancel={clicClosesave}
          onConfirm={clicConfirm}
        />
        <Button.Or />
      
        <Button
          color="red"
          type="submit"
          // onClick={onSubmitAssignTask}
          onClick={() => clicOpen()}
        >
          Assign
        </Button>
   
        <Confirm
          header="Assign Task To Student"
          content="Are you sure?"
          open={open}
          onCancel={clicClose}
          onConfirm={clicConfirmAssign}
        />
      </Button.Group>
     
      <br/>
      <br/>
      <br/>
       
      </Modal>
        </div>
    )
}
