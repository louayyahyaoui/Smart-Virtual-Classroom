import React from 'react'
import { Image,Segment,Dimmer,Loader } from 'semantic-ui-react';

import styled from "styled-components";

export default function LoaderC() {
    return (
        <div>
    

    <ErrorPage>
        <ErrorHeader></ErrorHeader>
       
        

        <ErrorMessage>
    
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

     
   
        </ErrorMessage>
       
      </ErrorPage>
      </div>
    );
  }
  const ErrorPage = styled.div`
    margin: 0 0 100px;
    text-align: center;
  `;
  const ErrorHeader = styled.div`
    width: 112px;
  `;
  const ErrorTitle = styled.div`
    font-family: "Roboto", Arial, sans-serif;
    font-size: 31px;
  `;
  const ErrorMessage = styled.div`
  margin: 1% 1% 1% 1%;
  `;
