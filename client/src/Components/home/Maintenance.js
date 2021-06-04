import React from 'react'

import { Image } from 'semantic-ui-react';

import styled from "styled-components";
export default function Maintenance() {
  return (
    <div>
      <ErrorPage>
        <ErrorHeader></ErrorHeader>
        <Image centered src={process.env.PUBLIC_URL + "/maintenance.jpg"}  alt="maintenance" /><br/>
        <ErrorTitle> We&rsquo;ll be back soon!</ErrorTitle>

    
        <ErrorMessage>
        <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment.otherwise we&rsquo;ll be back online shortly!</p>
        <p>&mdash; NoLimit Team</p>
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