import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Divider, Card, Icon, Header } from "semantic-ui-react";

export default function Task() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();
  

  useEffect(() => {
  
  }, [dispatch]);

  return (
    <>
      <Header as="h2" block>
        Dispaly Tasks
      </Header>
      <Divider hidden />
      <Card.Group>
        {tasks.map((task, index) => (
          <Card href="#card-example-link-card" key={index}>
            <Card.Content header={task.title} />
            <Card.Content description={task.theme} />
            <Card.Content extra>
              <Icon name="user" />4 Students
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}
