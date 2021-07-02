import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function NotFound() {
    function VoltarPaginaInicial(){
        window.location.href = "/";
    }
    return (
        <>
            <Row className="justify-content-md-center">
                <Col>
                    <Row className="justify-content-md-center">
                        <p><h1>404</h1></p>
                    </Row>
                    <Row className="justify-content-md-center">
                        <p><h2>Ops...A página solicitada não foi encontrada, ela pode não existir.</h2></p>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Button variant="danger" onClick={() => VoltarPaginaInicial()}>Página inicial</Button>
                    </Row>
                </Col>
            </Row>
        </>
    )
}