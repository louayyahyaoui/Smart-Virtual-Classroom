import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';

import styled from "styled-components";
export default function Maintenance() {
  return (
    <div>
      <ErrorPage>
        <ErrorHeader></ErrorHeader>
        <Image centered src={process.env.PUBLIC_URL + "/404.jpg"}  alt="Sad computer" /><br/>
        <ErrorTitle> We&rsquo;ll be back soon!</ErrorTitle>

        <ErrorMessage>
          The page you are looking for could not be found.
        </ErrorMessage>
        <ErrorMessage>
        <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always <a href="mailto:#">contact us</a>, otherwise we&rsquo;ll be back online shortly!</p>
        <p>&mdash; The Team</p>
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