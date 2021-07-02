import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { DistribuidorItemGet } from '../../../Types/DistribuidorItem';
import WhatsLink from '../../Links/whats';
import MapsLink from '../../Links/maps';

type PropsDetalhesColetaColetor = {
    distribuidorItem: DistribuidorItemGet;
};

export default function DetalhesColetaColetor(props: PropsDetalhesColetaColetor) {
    return (
        <>
            <Row className="justify-content-md-between">
                <Col sm={6}>
                    <Card bg={"Light"} text={"dark"}>
                        <Card.Header>
                            <b>Contato</b>
                            <WhatsLink numeroTelefone={props.distribuidorItem.distribuidor?.telefone || ""} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Nome: </b> {props.distribuidorItem.distribuidor?.nome}
                            </Card.Text>
                            <Card.Text>
                                <b>Telefone: </b> {props.distribuidorItem.distribuidor?.telefone}
                            </Card.Text>
                            <Card.Text>
                                <b>E-mail: </b> {props.distribuidorItem.distribuidor?.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card bg={"Light"} text={"dark"}>
                        <Card.Header>
                            <b>Endereço</b>
                            <MapsLink 
                                bairro={props.distribuidorItem.distribuidor?.endereco?.bairro || ""}
                                cidade={props.distribuidorItem.distribuidor?.endereco?.cidade || ""}
                                uf={props.distribuidorItem.distribuidor?.endereco?.uf || ""}
                                numero={props.distribuidorItem.distribuidor?.numeroResidencia || ""}
                                rua={props.distribuidorItem.distribuidor?.endereco?.rua || ""}
                             />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>CEP: </b> {props.distribuidorItem.distribuidor?.endereco?.cep}
                            </Card.Text>
                            <Card.Text>
                                <b>UF: </b> {props.distribuidorItem.distribuidor?.endereco?.uf}
                            </Card.Text>
                            <Card.Text>
                                <b>Cidade: </b> {props.distribuidorItem.distribuidor?.endereco?.cidade}
                            </Card.Text>
                            <Card.Text>
                                <b>Bairro: </b> {props.distribuidorItem.distribuidor?.endereco?.bairro}
                            </Card.Text>
                            <Card.Text>
                                <b>Logradouro: </b> {props.distribuidorItem.distribuidor?.endereco?.rua}
                            </Card.Text>
                            <Card.Text>
                                <b>Número: </b> {props.distribuidorItem.distribuidor?.numeroResidencia}
                            </Card.Text>
                            <Card.Text>
                                <b>Complemento: </b> {props.distribuidorItem.distribuidor?.endereco?.complemento}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}