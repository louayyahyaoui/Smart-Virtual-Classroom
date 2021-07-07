import { Icon } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Card, Grid, Label, Segment ,Button} from 'semantic-ui-react';
import { fetchClassByLevel } from '../../redux/slices/classsline';
import { getClassByLevel } from '../../redux/slices/Courses';
import {Link} from "react-router-dom";

export default function ClassByLevel(props) {

    const {l} = useParams ();
    const data = useSelector((state)=>state.courses.class);

    console.log(l);
        const dispatch = useDispatch();
        useEffect(()=>{
                dispatch(getClassByLevel(l));
        },[l])
        console.log(data);
    return (
        <>
<Grid>
    
            {data.map((c,index) => (
              
<Grid.Column width={5} >

<Link to={"/courses/"+c._id}>
<Card key={index}>

<Card.Content as="h3" header={c.className +" ( "+ c.classSection+" )" }  />

<Card.Content description={c.classDescription} />
<Card.Content extra>
  <Icon name='user' />{c.classUsers.length} membres
</Card.Content>
</Card>
</Link>
</Grid.Column>


  ))}
     </Grid>
        </>
    )
}
