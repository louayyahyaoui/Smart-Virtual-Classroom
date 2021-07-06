import React from 'react'
import { useSelector } from 'react-redux';
import {
    Image,
    Item,
    Button,
    Dimmer,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Radio,
    Loader,
    Segment,
    Label
  } from "semantic-ui-react";
  import ModalUploadCV from "./ModalUploadCV";
export default function ViewCv(props) {
 
    return (
        <div>
               <Grid>
        <Grid.Column width={13}>
          <Segment attached='top'>
            Upload your resume here , to help us 
          </Segment>
          <ModalUploadCV 
          
          name={props.name} 
          email={props.email} 
           sexe={props.sexe} 
           address={props.address} 
            birthday={props.birthday}  
            linkedIn={props.linkedIn}  
            github={props.github} 
            cv={props.resume}
            bio={props.bio}


          />
        </Grid.Column>
        <Grid.Column width={3}>




          {props.resume ==="" || props.resume ===null ? (<></>):(
             
              <>
            
              
                  <Grid.Column width={3}>
                  <a
                href={props.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/files-type/" +
                        "pdf" +
                        ".png"
                      }
                      style={{
                        margin: "10px",
                        height: "100px",
                        width: "100px",
                      }}
                      alt=""
                    />
                     </a>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Grid.Row>
                      <Header as="h4" color="red">
                        Your Resume
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as="h4" color="grey">
                        PDF File
                      </Header>
                    </Grid.Row>
                  </Grid.Column>
               
             
            </>
             
          )}
       
        </Grid.Column>
        
      </Grid>
        </div>
    )
}
