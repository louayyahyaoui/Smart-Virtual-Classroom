import React, { useEffect, useState } from 'react'
import ModalProfile from "./ModalProfile"
import { Button, List, Modal } from "semantic-ui-react";
import moment from 'moment';
export default function DetailsContact(props) {
   

  
    return (
        <>
            <Modal
                trigger={

                    <Button size="mini" icon="view" />

                }
                dimmer="inverted"
                size="tiny"
                closeIcon="close"
            >

                <Modal.Header>{props.name}

                    <ModalProfile 
                     
                     name={props.name} setName={name => props.setName(name)}
                     email={props.email} setEmail={email => props.setEmail(email)}
                     sexe={props.sexe} setSexe={sexe => props.setSexe(sexe)}
                     address={props.address} setAddress={address => props.setAddress(address)}
                     phone={props.phone} setPhone={phone => props.setPhone(phone)}
                     birthday={props.birthday} setBirthday={birthday => props.setBirthday(birthday)}
                     linkedIn={props.linkedIn} setLinkedIn={linkedIn => props.setLinkedIn(linkedIn)}
                     github={props.github} setGithub={github => props.setGithub(github)}
                     bio={props.bio}
                    />
                </Modal.Header>
                <Modal.Content>



                    <List>
                        <List.Item icon='linkedin' content='LinkedIn' as="h4" />
                        <a href={props.linkedIn}>{props.linkedIn}</a>
                        <List.Item icon='github' content='GitHub' as="h4" />
                        <a href={props.github}>{props.github}</a>
                        <List.Item icon='mail outline' content="E-mail" as="h4" />
                        <p>{props.email}</p>
                        <List.Item icon='phone' content="Phone Number" as="h4" />
                        <p>{props.phone}</p>
                        <List.Item icon='birthday cake' content="Birthday" as="h4" />
                        <p> {moment(props.birthday).format("MMM Do YY")}</p>
                    </List>

                </Modal.Content>

            </Modal>
        </>
    )
}
