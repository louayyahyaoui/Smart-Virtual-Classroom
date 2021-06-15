import React from 'react'

import { Grid, Statistic } from 'semantic-ui-react'


export default function StateTask(props) {
 
    return (
        <div>
               <Statistic.Group size="small">
                        
                        <Grid.Column>
                            <Statistic color="black">
                              <Statistic.Value>
                            {props.student}
                              </Statistic.Value>
                              <Statistic.Label>Students</Statistic.Label>
                            </Statistic>
                          </Grid.Column>
                          <Statistic color="red">
                            <Statistic.Value>
                         
                              {props.missing}
                            </Statistic.Value>
  
                            <Statistic.Label>Missing</Statistic.Label>
                          </Statistic>
                 
                          <Grid.Column>
                            <Statistic color="green">
                              <Statistic.Value>
                        
                                {props.remis}
                              </Statistic.Value>
                              <Statistic.Label>Done</Statistic.Label>
                            </Statistic>
                          </Grid.Column>
                        </Statistic.Group>
        </div>
    )
}
