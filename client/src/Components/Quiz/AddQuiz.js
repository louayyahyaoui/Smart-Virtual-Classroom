import React ,{useState} from 'react'
import { Button,Form ,Divider,Grid, Segment, Icon} from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';


export default function AddQuiz(props) {

 
  const [tasks , setTask] = useState({
           
    title : props.data.title,
    description : props.data.description,
    theme : props.data.theme,
    typeTask : props.data.typeTask,
    listQuestion : props.data.listQuestion,
    listStudents : props.data.listStudents,
    endDate : props.data.endDate,
    creator : props.data.creator
 
});



    const [inputFields, setInputFields] = useState(
      
      [
        { id: uuidv4(),
          fquestion: "",
          foptionA: '',
          foptionB: '',
          foptionC: '',
          foptionD: '',
          correct_answer: '',
          fpoint : ''
        },
     ] );
   
    

    /*const [quiz , setQuiz] = useState({
        id : inputFields.id,
        question : inputFields.fquestion,
        optionA : inputFields.foptionA,
        optionB : inputFields.foptionB,
        optionC : inputFields.foptionC,
        optionD : inputFields.foptionD,


    })*/
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
      
       

        //dispatch(postQuiz(quiz));
      };
    
      const handleChangeInput = (id, event) => {
        
        const newInputFields = inputFields.map((i) => {
          if(id === i.id) {
       
            i[event.target.name] = event.target.value;
            if(event.target.name==='foptionA')
            i['correct_answer'] = event.target.value;
          }
          return i;
        })
        console.log(newInputFields);
        setInputFields(newInputFields);
      
    
          
      }
    
      const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(),  fquestion: '',foptionA: '',foptionB: '',foptionC: '',foptionD: '' ,  correct_answer: '',fpoint:''}])
      }
    
      const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
      }

      var step=2;
      const event = ()=>{
        
        props.addTask(tasks.listQuestion = inputFields);
        props.addTask(tasks);
        props.nextStep(step+1);
      }
  
    return (
        <div >
     

<Grid centered >
    <Grid.Column>
      <Segment raised>
        
        
      <Form className="qsd" onSubmit={handleSubmit}>
            { inputFields.map((inputField,index) => (
              <div key={inputField.id}>
                
                  <Divider />
                  <label>Question {index+1}</label>
                <Form.Group widths='equal' inline>
               
                <Form.Input
                  name="fquestion"
                  fluid
                
                  value={inputFields.fquestion}  
                  onChange={event => handleChangeInput(inputField.id, event)
                }
                />
                
                     <Form.Input
                  name="fpoint"
           
              
                  value={inputFields.fquestion}
                  onChange={event => handleChangeInput(inputField.id, event)
                }
                />
                <Button.Group>
                <Button  size='mini'   disabled={inputFields.length === 1}
                 onClick={() => handleRemoveFields(inputField.id)}>
                 -
                </Button>
                <Button.Or></Button.Or>
                <Button 
  size='mini'
                  onClick={handleAddFields}
                >
           +
                </Button>
                </Button.Group>
                </Form.Group>
                <label>A</label>
               
                <Form.Input
                 icon={<Icon name="check circle outline"   />}
                  name="foptionA"
                
                fluid
                  value={inputFields.foptionA}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
         
                 <Form.Input
                 
                  name="foptionB"
                  label="B"
                  variant="filled"
                  value={inputFields.foptionB}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
                 <Form.Input
                  name="foptionC"
                  label="C"
                  variant="filled"
                  value={inputFields.foptionC}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
                 <Form.Input
                  name="foptionD"
                  label="D"
                  variant="filled"
                  value={inputFields.foptionD}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
              </div>
            )) }
           
         
          </Form>
       
      </Segment>
    </Grid.Column>
  </Grid>
  <Divider hidden></Divider>
  <Button
      
            color="red"
              type="submit" 
              floated='right'
              onClick={event}
             >Next</Button>
    </div>

    )
}
