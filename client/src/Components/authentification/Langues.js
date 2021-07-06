import React, { useEffect, useState } from 'react'
import { Icon,Button,Header, Label,Segment } from 'semantic-ui-react'
import ModalLangues from "./ModalLangues"
import ModalAddLangues from "./ModalAddLangues"
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataById } from '../../redux/slices/User';
import { isAuth } from '../../helpers/auth';
export default function Langues(props) {

    const data = useSelector((state) => state.user.UserDataById);
    const [langues, setLangues] = useState([]);
    const dispatch = useDispatch();
    console.log(data);
    useEffect(() => {
     dispatch(getUserDataById(isAuth()._id)).then((res)=>{
   
        setLangues(res.payload.data.langues);
     });
    }, [])
    return (
        <div>
           <Segment raised>
           <ModalAddLangues />  <ModalLangues langues={langues}  addLangues={ langues => setLangues(langues) }/>
               
               <Header as="h3" dividing>
        Langues 
     
      </Header>
      {langues.map((lang)=>(
    <Label as='h3'>{lang}</Label>
   ))}
               </Segment>
        </div>
    )
}
