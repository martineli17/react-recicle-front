import React, { useEffect, useState } from 'react';
import { Distribuidor } from '../../Types/Distribuidor';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectCustom } from './style';
import { DistribuidorItemGet } from '../../Types/DistribuidorItem';
import { AgendamentoPost, EnumDiasDaSemana } from '../../Types/Agendamento';
import * as DistribuidorItemService from '../../Services/Clients/DistribuidorItemService';
import { OcorreuUmErro } from '../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../Types/Notificacao';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { useUserContext } from '../../Contexts/UserContext';
import WhatsLink from '../Links/whats';
import MapsLink from '../Links/maps';

type PropsAgendarColeta = {
    distribuidor: Distribuidor;
};
let _agendamento: AgendamentoPost = {};

export default function AgendarColeta(props: PropsAgendarColeta) {
    const globalContext = useGlobalContext();
    const userContext = useUserContext();
    const [agendamento, setAgendamneto] = useState<AgendamentoPost>({});
    const [distribuidorItem, setDistribuidorItem] = useState<DistribuidorItemGet[] | undefined>([]);
    _agendamento = agendamento;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const UpdateDistribuidorItem = (id: string) => {
        setAgendamneto({
            ...agendamento,
            idDistribuidorItem: distribuidorItem?.filter(x => x?.id == id)[0]?.id?.toString()
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const GetAsync = async () => {
            globalContext.SetLoading(true);
            const response = await DistribuidorItemService.Get({ idDistribuidor: props.distribuidor?.id });
            if (!response.sucesso)
                globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
            else
                setDistribuidorItem(response.data);
            globalContext.SetLoading(false);
        }
        GetAsync().then(() => setAgendamneto({...agendamento, idColetor: userContext.user?.idEspecifico}));
        
    }, [props.distribuidor.id]);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <Row className="justify-content-md-center">
                <Col>
                    <Alert variant="secondary">
                        Distribuidor
                    </Alert>
                </Col>
            </Row>
            <Row className="justify-content-md-between">
                <Col sm={6}>
                    <Card bg={"Light"} text={"dark"}>
                        <Card.Header>
                            <b>Contato</b>
                            <WhatsLink numeroTelefone={props.distribuidor?.telefone || ""} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Nome: </b> {props.distribuidor.nome}
                            </Card.Text>
                            <Card.Text>
                                <b>Telefone: </b> {props.distribuidor.telefone}
                            </Card.Text>
                            <Card.Text>
                                <b>Email: </b> {props.distribuidor.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card bg={"Light"} text={"dark"} >
                        <Card.Header>
                            <b>Endereço</b>
                            <MapsLink 
                                bairro={props.distribuidor.endereco?.bairro || ""}
                                cidade={props.distribuidor.endereco?.cidade || ""}
                                uf={props.distribuidor?.endereco?.uf || ""}
                                numero={props.distribuidor.numeroResidencia || ""}
                                rua={props.distribuidor.endereco?.rua || ""}
                             />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>CEP: </b> {props.distribuidor.endereco?.cep}
                            </Card.Text>
                            <Card.Text>
                                <b>UF: </b> {props.distribuidor.endereco?.uf}
                            </Card.Text>
                            <Card.Text>
                                <b>Cidade: </b> {props.distribuidor.endereco?.cidade}
                            </Card.Text>
                            <Card.Text>
                                <b>Bairro: </b> {props.distribuidor.endereco?.bairro}
                            </Card.Text>
                            <Card.Text>
                                <b>Logradouro: </b> {props.distribuidor.endereco?.rua}
                            </Card.Text>
                            <Card.Text>
                                <b>Número: </b> {props.distribuidor.numeroResidencia}
                            </Card.Text>
                            <Card.Text>
                                <b>Complemento: </b> {props.distribuidor.endereco?.complemento}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            {
                distribuidorItem !== undefined && distribuidorItem?.length > 0 &&
                (
                    <>
                        <Row className="justify-content-md-center">
                            <Col><Alert variant="secondary">Item</Alert></Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <SelectCustom multiple={false} id="itens"
                                onChange={e => UpdateDistribuidorItem(String(e.target.value))}>
                                {
                                    distribuidorItem.map(x => (
                                        <MenuItem value={`${x.id}`}>{x.item?.nome}</MenuItem>
                                    ))
                                }
                            </SelectCustom>
                        </Row>
                        <br />
                        <Row className="justify-content-md-center">
                            <Col><Alert variant="secondary">Dia da semana e horário para coletar</Alert></Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <SelectCustom multiple={false} id="itens" onChange={e =>
                                setAgendamneto({ ...agendamento, diaDaSemanaColeta: e.target.value as EnumDiasDaSemana })}>
                                <MenuItem value="Segunda">Segunda-Feira</MenuItem>
                                <MenuItem value="Terca">Terça-Feira</MenuItem>
                                <MenuItem value="Quarta">Quarta-Feira</MenuItem>
                                <MenuItem value="Quinta">Quinta-Feira</MenuItem>
                                <MenuItem value="Sexta">Sexta-Feira</MenuItem>
                                <MenuItem value="Sabado">Sábado</MenuItem>
                                <MenuItem value="Domingo">Domingo</MenuItem>
                            </SelectCustom>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <div className="input-field">
                                    <input onChange={e =>
                                        setAgendamneto({ ...agendamento, horaColeta: Number(e.target.value) })}
                                        id="Hora" type="number" className="validate" />
                                    <label htmlFor="Hora">Hora</label>
                                </div>
                            </Col>
                            <Col>
                                <div className="input-field">
                                    <input onChange={e =>
                                        setAgendamneto({ ...agendamento, minutoColeta: Number(e.target.value) })}
                                        id="Minuto" type="number" className="validate" />
                                    <label htmlFor="Minuto">Minuto</label>
                                </div>
                            </Col>
                        </Row>
                    </>
                )
            }
            {
                distribuidorItem === undefined || distribuidorItem?.length === 0 &&
                (<Row className="justify-content-md-center">
                    <Alert variant="primary">
                        <Alert.Heading>Este distribuidor ainda não cadastrou nenhum item para coleta!</Alert.Heading>
                        <p>Entre em contato com o mesmo para mais informações.</p>
                    </Alert>
                </Row>)
            }
        </>
    )
}

export function DadosAgendamentoColeta() {
    return _agendamento;
}