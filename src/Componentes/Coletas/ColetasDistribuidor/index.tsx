import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Container } from './style';
import { AgendamentoGet } from '../../../Types/Agendamento';
import * as AgendaService from '../../../Services/Clients/AgendamentoService';
import { OcorreuUmErro } from '../../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../../Types/Notificacao';
import { useGlobalContext } from '../../../Contexts/GlobalContext';
import Alert from '../../Alertas/alert';
import { useUserContext } from '../../../Contexts/UserContext';

type PropsColetasColetor = {
    idDistribuidor?: string;
};

export default function ColetasDistribuidor(props: PropsColetasColetor) {
    const globalContext = useGlobalContext();
    const userContext = useUserContext();
    const [agendamentos, setAgendamentos] = useState<AgendamentoGet[]>([]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const GetAsync = async () => {
        const response = await AgendaService.Get({ idDistribuidor: userContext.user?.idEspecifico });
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
    }, [props.idDistribuidor]);

    const HandleDelete = async (id: string) => {
        globalContext.SetLoading(true);
        const response = await AgendaService.Delete(id);
        if (!response.sucesso)
            globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
        else{
            globalContext.SetMensagemSnack("Agendamento desmarcado com sucesso!", TypeMensagemSnack.success);
            await GetAsync();
        }
        globalContext.SetLoading(false);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Container>
            {
                agendamentos === undefined || agendamentos?.length <= 0 &&
                (<Alert type="info" 
                title={"Nenhum coletor agendou uma coleta com você ainda!"} 
                subTitle={"Fique no aguardo, alguém irá te encontrar =)"} />)
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
                                                <Card.Header>{x.diaDaSemanaColeta} as {x.horaColeta}h:{x.minutoColeta}m</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        <b>Item: </b> {x.distribuidorItem?.item?.nome}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>Coletor: </b> {x.distribuidorItem?.distribuidor?.nome}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>E-mail: </b> {x.distribuidorItem?.distribuidor?.nome}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>Telefone: </b> {x.distribuidorItem?.distribuidor?.nome}
                                                    </Card.Text>
                                                    <hr style={{ backgroundColor: "white" }} />
                                                    <Card.Link className="float-md-right">
                                                        <Button onClick={() => HandleDelete(x.id)}
                                                            id="btnDesmarcar" name="btnDesmarcar" variant="danger">
                                                            Desmarcar
                                                        </Button>
                                                    </Card.Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </>
                                ))
                            )
                        }
                    </Row>
                </>)
            }
        </Container>
    )
}