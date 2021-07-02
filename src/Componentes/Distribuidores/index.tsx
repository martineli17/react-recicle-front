import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { Container } from './style';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from '../Modal/index';
import AgendarColeta, { DadosAgendamentoColeta } from '../AgendarColeta/index';
import { Distribuidor } from '../../Types/Distribuidor';
import * as DistribuidorService from '../../Services/Clients/DistribuidorService';
import * as AgendaService from '../../Services/Clients/AgendamentoService';
import { OcorreuUmErro } from '../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../Types/Notificacao';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import Alert from '../Alertas/alert';

export default function Distribuidores() {
    const globalContext = useGlobalContext();
    const [distribuidores, setDistribuidores] = useState<Distribuidor[] | undefined>([]);
    const [modal, setModal] = useState(Boolean);
    const [distribuidorState, setDistribuidorState] = useState<Distribuidor>({});
    const Cabecalho = <Row className="justify-content-md-center"><h4>Agendar coleta de itens</h4></Row>
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const GetAsync = async () => {
            globalContext.SetLoading(true);
            const response = await DistribuidorService.Get({});
            if (!response.sucesso)
                globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
            else
                setDistribuidores(response.data);
            globalContext.SetLoading(false);
        }
        GetAsync();
    }, []);

    const OpenModal = (dado: Distribuidor) => {
        setDistribuidorState(dado);
        setModal(true);
    }

    const HandleAgendamento = async () => {
        globalContext.SetLoading(true);
        const response = await AgendaService.Post(DadosAgendamentoColeta());
        if (!response.sucesso)
            globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
        else
            globalContext.SetMensagemSnack("Agendamento realizado com sucesso!", TypeMensagemSnack.success);
        globalContext.SetLoading(false);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <Container>
                {
                    distribuidores !== undefined && distribuidores.length > 0 &&
                    (<>
                        <Row className="justify-content-md-center">
                            <h3>Distribuidores disponíveis para agendar a coleta de item</h3>
                        </Row>
                        <Row className="justify-content-md-center">
                            <hr style={{ backgroundColor: "white", width: "90%" }} />

                        </Row>
                        <Row className="justify-content-md-center">
                            {
                                distribuidores.map(distribuidor => (
                                    <>
                                        <Col sm={3} key={String(distribuidor.id)} >
                                            <Card bg={"dark"} text={"light"} className="card-hover">
                                                <Card.Header>{distribuidor.nome}</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        <b>E-mail: </b> {distribuidor.email}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>UF: </b> {distribuidor.endereco?.uf}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>Cidade: </b>{distribuidor.endereco?.cidade}
                                                    </Card.Text>
                                                    <hr style={{ backgroundColor: "white" }} />
                                                    <Card.Link className="float-right">
                                                        <Button
                                                            id="btnSalvar" name="btnSalvar" variant="light" onClick={() => OpenModal(distribuidor)}>
                                                            Agendar
                                                         </Button>
                                                    </Card.Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </>
                                ))
                            }
                        </Row>
                        <Modal Cabecalho={Cabecalho} StatusModal={modal} FunctionClose={() => setModal(false)}
                            ComponentView={<AgendarColeta distribuidor={distribuidorState} />}
                            FunctionSuccess={() => HandleAgendamento()}
                            TextButtomSuccess="Confirmar" TextButtomDanger="Cancelar" />
                    </>)
                }
                {
                    distribuidores === undefined || distribuidores?.length === 0 &&
                    (<Alert type="info"
                        title={"Nenhum distribuidor disponível no momento!"}
                        subTitle={"Volte em breve para verificar novamente =)"} />)
                }

            </Container>
        </>
    )
}