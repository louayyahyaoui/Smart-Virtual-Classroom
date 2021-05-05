import React, { useState } from "react";
import { Button, Form, Divider, Grid, Segment, Icon, Header } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import Select from 'react-select';
export default function AddQuiz(props) {
  const Options = [
    { label: "OPTION A", value: "OPTION A" },
    { label: "OPTION B", value: "OPTION B" },
    { label: "OPTION C", value: "OPTION C" },
    { label: "OPTION D", value: "OPTION D" },
];
const [selected, setSelected] = useState(null);
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

  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      fquestion: "",
      foptionA: "",
      foptionB: "",
      foptionC: "",
      foptionD: "",
      correct_answer: "",
      fpoint: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);

  };

  const handleChangeSelect = (id,selectedOption) => {
    console.log(id);
    console.log(selectedOption);
    const newInputFields = inputFields.map((i) => {
    
      if (id === i.id) {
        switch (selectedOption.value) {
          case 'OPTION A':
            i["correct_answer"] = i["foptionA"];
            break;
          case 'OPTION B':
            i["correct_answer"] = i["foptionB"];
            break;
          case 'OPTION C':
            i["correct_answer"] = i["foptionC"];
            break;
            case 'OPTION D':
              i["correct_answer"] = i["foptionD"];
              break;
         
        }
       
      }


      return i;
    });
    console.log(newInputFields);
    setInputFields(newInputFields);
  };
  const handleChangeInput = (id, event) => {
   
    console.log(id);
    const newInputFields = inputFields.map((i) => {
    

      if (id === i.id) {
        i[event.target.name] = event.target.value;
       
      }


      return i;
    });
    console.log(newInputFields);
    setInputFields(newInputFields);
  };
  const [theme, setTheme] = useState();
  const selectedTheme = (selectedList, selectedItem) => {

    
  //  inputFields[0]["correct_answer"] = selectedItem.value;
    
    
    console.log(inputFields);
    setInputFields(inputFields);
        
  };
  const handleAddFields = () => {

    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        fquestion: "",
        foptionA: "",
        foptionB: "",
        foptionC: "",
        foptionD: "",
        correct_answer: "",
        fpoint: "",
      },
    ]);
  };
  const [selectedItem, SetSelectedItem] = useState();
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  var step = 2;
  const event = () => {
    props.addTask((tasks.listQuestion = inputFields));
    props.addTask(tasks);
    props.nextStep(step + 1);
  };

 
  return (
    <div>
      <Grid centered>
        <Grid.Column>
          <Segment raised>
            <Form className="qsd" onSubmit={handleSubmit}>
              {inputFields.map((inputField, index) => (
                <div key={inputField.id}>
                  <Divider />
                  <label>Question </label>{index + 1}
                  <Form.Group widths="equal" inline>
                    <Form.Input
                     icon={<Icon name="question circle outline" />}
                      name="fquestion"
                      fluid
                      value={inputFields.fquestion}
                      onChange={(event) =>
                        handleChangeInput(inputField.id, event)
                      }
                    />
 
                    <Form.Input
                        icon={<Icon name="check circle outline" />}
                      name="fpoint"
                      value={inputFields.fquestion}
                      onChange={(event) =>
                        handleChangeInput(inputField.id, event)
                      }
                    />
                   
                    <Button.Group>
                      <Button
                        size="mini"
                        disabled={inputFields.length === 1}
                        onClick={() => handleRemoveFields(inputField.id)}
                      >
                        -
                      </Button>
                      <Button.Or></Button.Or>
                      <Button size="mini" onClick={handleAddFields}>
                        +
                      </Button>
                    </Button.Group>
                  </Form.Group>
                  <label>A</label>

                  <Form.Input
                 
                    name="foptionA"
                    fluid
                    value={inputFields.foptionA}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />

                  <Form.Input
                    name="foptionB"
                    label="B"
                    variant="filled"
                    value={inputFields.foptionB}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <Form.Input
                    name="foptionC"
                    label="C"
                    variant="filled"
                    value={inputFields.foptionC}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <Form.Input
                    name="foptionD"
                    label="D"
                    variant="filled"
                    value={inputFields.foptionD}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                    
                  />
                <Header as="h5" icon="check square outline" content={"The Correct Answer : "+inputField.correct_answer} /> 
                <Select
              
        value={selected}
        onChange={( selectedOption , event) =>
          handleChangeSelect(inputField.id,selectedOption)  
        }
        options={Options}

      />
          
    
              
                </div>
              ))}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
      <br/>
      <Divider hidden></Divider>
      <Button color="red" type="submit" floated="right" onClick={event}
      disabled={inputFields.correct_answer==="" || inputFields.fpoint==="" || inputFields.fquestion==="" || inputFields.foptionA===""
    
    || inputFields.foptionB==="" || inputFields.foptionC==="" || inputFields.foptionD==="" 
  }
      >
        Next
      </Button>

    </div>
  );
}
