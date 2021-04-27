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
} from "semantic-ui-react";
import { useSelector } from "react-redux";

const options = [
  { key: 1, text: "Quiz", value: "Quiz" },
  { key: 2, text: "File", value: "File" },
];
export default function AddTask(props) {
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const seances = useSelector((state) => state.seance.seance);

  const [studentChosen] = useState(currentClass.classUsers);
  const [theme, setTheme] = useState(props.data.theme);

  var step = 1;

  const [tasks, setTask] = useState({
    title: props.data.title,
    description: props.data.description,
    theme: props.data.theme,
    cour : props.data.cour,
    typeTask: props.data.typeTask,
    listQuestion: props.data.listQuestion,
    listStudents: props.data.listStudents,
    endDate: props.data.endDate,
    creator: props.data.creator,
  });

  const event = () => {
    props.addTask(tasks);
    console.log(tasks.listStudents);

    props.nextStep(step + 1);
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedItem);
    props.addTask(tasks.listStudents.push(selectedItem));

    console.log(tasks.listStudents);
  };
  const onRemove = (selectedList, removedItem) => {
    props.addTask(
      (tasks.listStudents = selectedList.filter(
        (item) => item._id !== removedItem._id
      ))
    );

    console.log(tasks.listStudents);
  };

  const selectedTheme = (selectedList, selectedItem) => {
    console.log(selectedItem);
    setTheme(selectedItem);
    props.addTask((tasks.theme = selectedItem._id));
  };

  return (
    <div>
      <Segment raised>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              <Form >
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
            <Grid.Column width={5}>
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
                selectedValues={tasks.theme.titre}
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
      </Segment>
      <Button
        disabled={
          step > 2 || (!tasks.title && !tasks.description && !tasks.typeTask)
        }
        type="submit"
        floated="right"
        color="red"
        onClick={event}
      >
        Next
      </Button>
    </div>
  );
}
