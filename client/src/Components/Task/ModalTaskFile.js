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
  Header,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../helpers/auth";
import FileUpload from "../../utlis/FileUpload";
import { assignTask, getTaskByTeacher, postTasks } from "../../redux/slices/Task";
import { AddquestionsApi } from "../../api/api";
import { addQuestion } from "../../redux/slices/questionslice";
import MultiSelect from "react-multi-select-component";

const currentClass = JSON.parse(localStorage.getItem("idClass"));
export default function ModalTaskFile(props) {
  
  const seances = useSelector((state) => state.seance.seance);
  const studentChosen = [];
  const seanceChosen = [];
 
  currentClass.classUsers.forEach((element) => {
    studentChosen.push({ label: element.name, value: element });
  });
  seances.forEach((element) => {
    seanceChosen.push({ label: element.titre, value: element });
  });
    const [cancel, setCancel] = useState(false);
    const [open, setOpen] = useState(false);
    const [opensave, setOpensave] = useState(false);
  
    const [close, setClose] = useState(false);
   
   
 
    const [selectedSeance, setSelectedSeance] = useState(null);
    

    const [selected, setSelected] = useState([]);
   
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

     setTask(
        selected.forEach((itemselect) => {
          const index = tasks.listStudents.findIndex(
            (item) => item._id === itemselect.value._id
          );
          if (index !== -1) {
            tasks.listStudents[index] = itemselect.value;
          }
          tasks.listStudents.push(  itemselect.value);
        })
      );
      console.log(selectedSeance);
      setTask(tasks.theme = selectedSeance.value);
     // setTask(...tasks.listStudents = listStud);
      setTask(...tasks.listQuestion = Images);
      setEnableUpload(true);
      dispatch(postTasks(tasks)).then(()=>{
        dispatch(getTaskByTeacher(taskDetail));
      });
     
    
      setOpensave(false);
    };
    const clicConfirmAssign = () => {
      setTask(
        selected.forEach((itemselect) => {
          const index = tasks.listStudents.findIndex(
            (item) => item._id === itemselect.value._id
          );
          if (index !== -1) {
            tasks.listStudents[index] = itemselect.value;
          }
          tasks.listStudents.push(  itemselect.value);
        })
      );
      setTask(tasks.theme = selectedSeance.value);
     // setTask(...tasks.listStudents = listStud);
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

    /*  const event = (selectedList) => {
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
  
      };*/
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

               
        <FileUpload refreshFunction={updateImages} listfile={null} Enbale={enableUpload}/>
      
      
     
        </Modal.Content>
     
       
        <Modal.Actions>
     
        <Button
          color="red"
          type="submit"
          onClick={() => clicOpensave()}
          //onClick={onSubmitSaveTask}
          floated="right"
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
      
      
        <Button
        floated="right"
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
        
    <Button color="black" onClick={() => clicCancel()}>Back</Button>
        <Confirm
          header="Cancel Add "
          content="Are you sure?"

          open={cancel}
          onCancel={clicCloseCancel}
          onConfirm={clicConfirmCancel}
        />
    
    
   
    </Modal.Actions>
      </Modal>
        </div>
    )
}
