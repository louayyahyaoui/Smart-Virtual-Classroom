import React, { useState } from "react";

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
  Header,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import MultiSelect from "react-multi-select-component";

export default function AddTask(props) {
  const currentClass = JSON.parse(localStorage.getItem("idClass"));

  const seanceChosen = [];
  const studentChosen = [];
  const seances = useSelector((state) => state.seance.seance);
  currentClass.classUsers.forEach((element) => {
    studentChosen.push({ label: element.name, value: element._id });
  });

  seances.forEach((element) => {
    seanceChosen.push({ label: element.titre, value: element });
  });

  const [selectedSeance, setSelectedSeance] = useState(null);

  const [theme, setTheme] = useState(props.data.theme);

  const [selected, setSelected] = useState([]);

  var step = 1;

  const [tasks, setTask] = useState({
    title: props.data.title,
    description: props.data.description,
    theme: props.data.theme,
    cour: props.data.cour,
    typeTask: props.data.typeTask,
    listQuestion: props.data.listQuestion,
    listStudents: props.data.listStudents,
    endDate: props.data.endDate,
    creator: props.data.creator,
  });

  const event = () => {
    props.addTask(
      currentClass.classUsers.forEach((itemselect) => {
        const index = selected.findIndex(
          (item) => item.value === itemselect._id
        );
        if (index !== -1) {
          tasks.listStudents.push(itemselect);
        }
      })
    );
    // console.log(tasks.listStudents);
    props.addTask((tasks.theme = selectedSeance.value));
    // console.log(tasks.theme);
    props.addTask(tasks);

    props.nextStep(step + 1);
  };

  return (
    <div>
      <Segment raised>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
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
            <Grid.Column width={5}>
              <Header
                as="h5"
                icon="check square outline"
                content={"Choose Theme  "}
              />
              <Select
                value={selectedSeance}
                onChange={setSelectedSeance}
                options={seanceChosen}
              />

              <Header
                as="h5"
                icon="check square outline"
                content={" For Student  "}
              />
              <Form.Field required>
                <MultiSelect
                  options={studentChosen}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Button
      disabled={
        tasks.title === "" ||
        tasks.description === "" ||
        tasks.endDate === null ||
        selectedSeance === null ||
        selected === []
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
