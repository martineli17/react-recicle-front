import React from 'react';
import Login from '../../Componentes/Login/index';
import InfoApp from '../../Componentes/InfoApp/index';
import { Container } from './style';
import Row from 'react-bootstrap/Row';

export default  function Home() {
  return (
    <Container>
        <Row className="justify-content-md-center">
          <Login />
        </Row>
        <Row className="justify-content-md-center">
          <InfoApp />
        </Row>
    </Container>
  );
}