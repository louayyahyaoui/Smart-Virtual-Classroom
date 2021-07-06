import React, { useState } from 'react'
import ModalChangeProfilePicture from "./ModalChangeProfilePicture"
import DetailsContact from "./DetailsContact"
import {

    Grid,
    Header,
    Segment,


} from "semantic-ui-react";
export default function Contact(props) {
    //const [name, setName] = useState(props.name);
    return (
        <div>

            <Segment raised color="grey" size="mini">
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <ModalChangeProfilePicture
                              
          name={props.name} 
          email={props.email} 
           sexe={props.sexe} 
           address={props.address} 
            birthday={props.birthday}  
            linkedIn={props.linkedIn}  
            github={props.github} 
            cv={props.cv}
            bio={props.bio}
                            ></ModalChangeProfilePicture>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Header size="medium">{props.name}
                                <Header.Subheader>
                                    {props.address}
                                    <DetailsContact

                                        name={props.name} setName={name => props.setName(name)}
                                        email={props.email} setEmail={email => props.setEmail(email)}
                                        sexe={props.sexe} setSexe={sexe => props.setSexe(sexe)}
                                        address={props.address} setAddress={address => props.setAddress(address)}
                                        birthday={props.birthday} setBirthday={birthday => props.setBirthday(birthday)}
                                        linkedIn={props.linkedIn} setLinkedIn={linkedIn => props.setLinkedIn(linkedIn)}
                                        github={props.github} setGithub={github => props.setGithub(github)}
                                        bio={props.bio}
                                    />
                                </Header.Subheader>
                            </Header>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </div>
    )
}
