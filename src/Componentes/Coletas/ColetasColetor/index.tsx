import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { DistribuidorItemGet } from '../../../Types/DistribuidorItem';
import { AgendamentoGet } from '../../../Types/Agendamento';
import Modal from '../../Modal/index';
import DetalhesColetaColetor from '../DetalhesColetaColetor/index';
import { Container } from './style';
import { useGlobalContext } from '../../../Contexts/GlobalContext';
import * as AgendaService from '../../../Services/Clients/AgendamentoService';
import { OcorreuUmErro } from '../../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../../Types/Notificacao';
import Alert from '../../Alertas/alert';
import { useUserContext } from '../../../Contexts/UserContext';
import Coletor from '../../../Pages/Coletor/Index';

type PropsColetasColetor = {
    idColetor?: string;
};

export default function ColetasColetor(props: PropsColetasColetor) {
    const globalContext = useGlobalContext();
    const userContext = useUserContext();
    const [coleta, setColeta] = useState<DistribuidorItemGet>({});
    const [modal, setModal] = useState<boolean>(false);
    const [agendamentos, setAgendamentos] = useState<AgendamentoGet[]>([]);
    const Cabecalho = <Row className="justify-content-md-center"><h4>Dados do distribuidor</h4></Row>
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const OpenModal = (dados: DistribuidorItemGet) => {
        setColeta(dados);
        setModal(true);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const GetAsync = async () => {
        const response = await AgendaService.Get({ idColetor: userContext.user?.idEspecifico });
        if (!response.sucesso)
            globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
        else
            setAgendamentos(response.data || []);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const GetEffectAsync = async () => {
            globalContext.SetLoading(true);
            await GetAsync();
            globalContext.SetLoading(false);
        }
        GetEffectAsync();
    }, [props.idColetor]);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const HandleDelete = async (id: string) => {
        globalContext.SetLoading(true);
        const response = await AgendaService.Delete(id);
        if (!response.sucesso)
            globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
        else {
            globalContext.SetMensagemSnack("Agendamento desmarcado com sucesso!", TypeMensagemSnack.success);
            await GetAsync();
        }
        globalContext.SetLoading(false);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <Container>
                {
                    agendamentos === undefined || agendamentos?.length === 0 &&
                    (<Alert type="info"
                        title={"Você não agendou nenhuma coleta por enquanto!"}
                        subTitle={"Vá até a aba de distribuidores e encontre uma coleta =)"} />)
                }
                {
                    agendamentos !== undefined && agendamentos?.length > 0 &&
                    (<>
                        <Row className="justify-content-md-center">
                            <h3>Suas coletas agendadas até o momento</h3>
                            <hr style={{ backgroundColor: "white", width: "90%" }} />
                        </Row>
                        <Row className="justify-content-md-center">
                            {
                                agendamentos && (
                                    agendamentos.map(x => (
                                        <>
                                            <Col key={x.id.toString()} sm={3}>
                                                <Card bg={"dark"} text={"light"} className="card-hover">
                                                    <Card.Header>{x.diaDaSemanaColeta}</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <b>Item: </b> {x.distribuidorItem?.item?.nome}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <b>Distribuidor: </b> {x.distribuidorItem?.distribuidor?.nome}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <b>Horário: </b>{x.horaColeta}h:{x.minutoColeta}m
                                                            </Card.Text>
                                                        <hr style={{ backgroundColor: "white" }} />
                                                        <Card.Link className="float-md-left">
                                                            <Row>
                                                                <Col sm={6} className="mt-2">
                                                                    <Button onClick={() => OpenModal(x?.distribuidorItem)}
                                                                        id="btnDetalhes" name="btnDetalhes" variant="light">
                                                                        Detalhes
                                                                    </Button>
                                                                </Col>
                                                                <Col sm={6} className="mt-2">
                                                                    <Button onClick={() => HandleDelete(x.id)}
                                                                        id="btnDesmarcar" name="btnDesmarcar" variant="danger">
                                                                        Desmarcar
                                                                    </Button>
                                                                </Col>
                                                            </Row>

                                                        </Card.Link>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </>
                                    ))
                                )
                            }
                        </Row>
                        <Modal Cabecalho={Cabecalho} StatusModal={modal} FunctionClose={() => setModal(false)}
                            ComponentView={<DetalhesColetaColetor distribuidorItem={coleta} />}
                            ViewButtomSucess={false} TextButtomDanger="Fechar" />
                    </>)
                }
            </Container >
        </>
    )
}