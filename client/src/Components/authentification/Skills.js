import React, { useEffect, useState } from 'react'
import { Icon, Label ,Header,Button,Segment} from 'semantic-ui-react'
import ModalSkills from './ModalSkills'
import ModalAddSkills from './ModalAddSkills'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataById } from '../../redux/slices/User';
import { isAuth } from '../../helpers/auth';

export default function Skills(props) {

    const data = useSelector((state) => state.user.UserDataById);
    const [skills, setSkills] = useState([]);
    const dispatch = useDispatch();
    console.log(data);
    useEffect(() => {
     dispatch(getUserDataById(isAuth()._id)).then((res)=>{
   
        setSkills(res.payload.data.skills);
     });
    }, [])
    return (
        <div>
           <Segment raised>
           <ModalAddSkills/> <ModalSkills skills={skills} deleteskills={props.deleteskills}  addSkills={ skill => setSkills(skill)}/>
                     <Header as="h3" dividing>
        Skills 
      </Header>
              <Label.Group color='blue'>
   {skills.map((skill)=>(
    <Label as='h3'>{skill}</Label>
   ))}
    
    
  </Label.Group>
  </Segment>
        </div>
    )
}
