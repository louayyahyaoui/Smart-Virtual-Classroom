import React from "react";
import {

  Grid,
  Icon,
  Image,
 
} from "semantic-ui-react";

function ListUsers(props) {
  console.log(props.userlistromm);
  return (
    <div>
      {props.userlistromm?.map((cl, index) => (
        <div key={index}>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image circular size="medium" src={cl.info.Image} />
              </Grid.Column>
              <Grid.Column width={5}>{cl.info.userName}</Grid.Column>
              <Grid.Column width={8}>
                {cl.info.audio ? <></> : <Icon name="mute" />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default ListUsers;
