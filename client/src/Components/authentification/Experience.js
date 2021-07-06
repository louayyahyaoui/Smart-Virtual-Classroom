import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {

  Item,
  Button,

  Header,

  Segment,

} from "semantic-ui-react";
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';
import ModalExperience from "./ModalExperience"
export default function Experience(props) {

  const data = useSelector((state) => state.user.UserDataById);
  const [experience, setExperience] = useState([]);
  const dispatch = useDispatch();
  console.log(data);
  useEffect(() => {
   dispatch(getUserDataById(isAuth()._id)).then((res)=>{
 
    setExperience(res.payload.data.experiences);
   });
  }, [])
  return (
    <div>
      <Segment raised>
      <ModalExperience info="add"  addExperience={ experience => setExperience(experience)} />
        <Header as="h3" dividing>
          Experience
        </Header>
        <Item.Group divided>
        {experience.map((exp)=>(
           <Item >
           <Item.Image size="tiny" src={process.env.PUBLIC_URL+"/company.png"} />

            <Item.Content>
              <Item.Header as='h2'>{exp.title}</Item.Header>
              <Item.Meta>
              <span className='cinema'>{moment(exp.dateDebut).format("L")} ~ {moment(exp.dateFin).format("L")} </span>
              </Item.Meta>
              <Item.Description>{exp.description}</Item.Description>
              <Item.Extra>
                <ModalExperience info="edit" title={exp.title} id={exp.id} description={exp.description} dateDebut={exp.dateDebut} dateFin={exp.dateFin} addExperience={ experience => setExperience(experience)}  />
              </Item.Extra>
            </Item.Content>
          </Item>
     ))}
         
        </Item.Group>
      </Segment>
    </div>
  )
}
