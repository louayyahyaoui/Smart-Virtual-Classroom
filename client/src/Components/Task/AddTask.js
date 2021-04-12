import React , {  useState } from 'react';

import { Multiselect} from 'multiselect-react-dropdown';
import Select from 'react-select'
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import { Dropdown,Button,Form ,Grid, Rail, Segment,TextArea} from 'semantic-ui-react';
import { useSelector } from 'react-redux';


const options = [
  { key: 1, text: 'Quiz', value: 'Quiz' },
  { key: 2, text: 'File', value: 'File' },

]
export default function AddTask(props) {
  const seances = useSelector((state) => state.seance.seance);
  const data1 = [
    { value: 'Java', label: 'Java' },
    { value: 'PiWeb', label: 'PiWeb' },
    { value: 'NoSql', label: 'NoSql' }
  ]
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
/*const data = [
  {id : "606a379141fdc1d2a0d0078d" ,student : 'Sofien'},
  {id : "606a379141fdc1d2a0d0078d" ,student : 'hamza'},
  {id : "606781123ed972382c721fce" ,student : 'omar'},
  {id : "606b849539df17362cc2a222" ,student : 'Louay'}
]*/

const [themeChosen] = useState(data1)
const [studentChosen] = useState(currentClass.classUsers)
const [theme , setTheme] = useState(props.data.theme);


const SeanceOptions = [{ value: Number,label: "" }];

for (let i = 0; i < seances.length; i++) {
  const option = {
    value: seances[i]._id,
    label: seances[i].titre,
   
  };

  SeanceOptions.push(option);
}

  


var step = 1;
 
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
 
   
        const event = ()=>{
         
          
          props.addTask(tasks);
          console.log(tasks.listStudents);
        
          props.nextStep(step+1);
        
        }
      
  
const onSelect = (selectedList, selectedItem)=>{
  console.log(selectedItem);
  props.addTask(tasks.listStudents.push(selectedItem))

  console.log(tasks.listStudents)
}
const onRemove = (selectedList, removedItem)=>{

 props.addTask(tasks.listStudents = selectedList.filter((item) => item._id !== removedItem._id ));

    console.log(tasks.listStudents)

}

const selectedTheme = (data) =>{
  console.log(data);
  setTheme(data);
  props.addTask(tasks.theme=data.value);
}
 

    return (
      
        <div >
       
        <Grid centered columns={3}>
    <Grid.Column>
      <Segment raised>
        
        <Rail  position='left'>
          <Segment raised textAlign="center">
          <Select 
 
 values={theme}
         styles={{backgroundColor:"red"}}
      onChange={selectedTheme}
          options={SeanceOptions} />

          </Segment>
        </Rail>
        <Form >
        <Form.Field>
      
          <Form.Input  label='Title'   required value={tasks.title} onChange={ e  =>  setTask({ ...tasks, title : e.target.value })} placeholder='Title' />
        </Form.Field>
        <Form.Field   required>
          <label>Description</label>
          <TextArea label='Description'    value={tasks.description} onChange={ e  =>  setTask({ ...tasks, description : e.target.value })} placeholder='Description..' style={{ minHeight: 50 }} />
       </Form.Field>
       <Form.Field   required>
          <label>Type of Task </label>
          <Dropdown
          onChange={(e,data)  =>  setTask({ ...tasks, typeTask : data.value})}
      placeholder='I open on focus'
      openOnFocus
      options={options}
      selection
      required
      value={tasks.typeTask}
    />{' '}
     
  
       </Form.Field>
     <Form.Field>
     <label>Due</label>
     <SemanticDatepicker 
      onChange={ (e,data)  =>  setTask({ ...tasks, endDate : data.value})} 
      value={tasks.endDate}
      />
     </Form.Field>
    
     
        
        </Form>
        <Rail  position='right'>
          <Segment raised textAlign="center">
          <Multiselect
          
         style={       
           {chips : {background : "red"},
            option : {color : "black"},
            searchBox: {border: "none"}}
          }
       
         fluid
         selection
         multiple
    displayValue="name"
         options={studentChosen}
         selectedValues={tasks.listStudents}
         onSelect={onSelect}
         onRemove = {onRemove}
       
         placeholder='Select Student'
      
      
        
     
    />{' '}
            
           
          </Segment>
        </Rail>
      </Segment>
    </Grid.Column>
  </Grid>

 <Button
      disabled={step>2 || ( (!tasks.title) && (!tasks.description) && (!tasks.typeTask))}
         
              type="submit" 
              floated='right'
              color="red"
              onClick={event} >Next</Button>
    </div>
     
    )
}
