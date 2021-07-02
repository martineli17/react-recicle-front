import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router';
import Alert from '../../Componentes/Alertas/alert';

export default function EmailPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const title = params.get("title");
    const body = params.get("body")?.split(".");
    return (
        <>
            <Alert type="info"
                title={"Novo e-mail!"}
                subTitle={title || ""} />
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <h3>Mensagem</h3>
                    <hr style={{ backgroundColor: "white", width: "90%" }} />
                    {
                        body
                            ?
                            (
                                body.map(x => <span><b>{x.split(":")[0]}</b> - {x.split(":")[1]}<br/></span>)
                            )
                            :
                            (<p>Nenhuma mensagem encontrada!</p>)
                    }
                </Col>
            </Row>
        </>
    )
}