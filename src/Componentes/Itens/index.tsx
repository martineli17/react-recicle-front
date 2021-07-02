import React, { useEffect, useState, memo, useCallback } from 'react';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Lampada from '../../Assets/Imagens/item-lampada.png';
import Bateria from '../../Assets/Imagens/item-bateria.png';
import Papel from '../../Assets/Imagens/item-papel.png';
import Celular from '../../Assets/Imagens/item-celular.png';
import Oleo from '../../Assets/Imagens/item-oleo.png';
import { ItensSelecionados, DistribuidorItemGet } from '../../Types/DistribuidorItem';
import { Item } from '../../Types/Item';
import { Container } from './style';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { useUserContext } from '../../Contexts/UserContext';
import * as DistribuidorItemService from '../../Services/Clients/DistribuidorItemService';
import * as DistribuidorService from '../../Services/Clients/DistribuidorService';
import * as ItemService from '../../Services/Clients/ItemService';
import { OcorreuUmErro } from '../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../Types/Notificacao';

export default function ItensDistribuidor() {
    const globalContext = useGlobalContext();
    const userContext = useUserContext();
    const [itensSelecionados, setItensSelecionados] = useState<ItensSelecionados[]>([]);
    const [itensDistribuidor, setItensDistribuidor] = useState<DistribuidorItemGet[]>([]);
    const [itens, setItens] = useState<Item[] | undefined>([]);
    const [idDistribuidor, setIdDistribuidor] = useState<string | undefined>(undefined);
    const [refreshItensDistribuidor, setRefreshItensDistribuidor] = useState<boolean>(false);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const SelecionarItem = (nome: string) => {
        if (itensSelecionados.some(x => x.nome === nome))
            setItensSelecionados([...itensSelecionados.filter(x => x.nome !== nome)]);
        else {
            const newItemSelecionado = {
                nome: nome,
                id: itens?.find(x => x.nome?.toLowerCase() === nome)?.id?.toString(),
                idDistribuidorItem: itensDistribuidor?.find(x => x.item?.nome?.toLowerCase() === nome)?.id?.toString(),
            };
            setItensSelecionados([...itensSelecionados, newItemSelecionado]);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const GetDistribuidorItem = async (): Promise<boolean> => {
        const responseDistribuidor = await DistribuidorItemService.Get({ idDistribuidor: idDistribuidor });
        if (!responseDistribuidor.sucesso)
            globalContext.SetMensagemSnack(responseDistribuidor.error || "Erro ao buscar dados do distribuidor", TypeMensagemSnack.error);
        else
            setItensDistribuidor(responseDistribuidor.data as DistribuidorItemGet[]);
        return responseDistribuidor.sucesso;
    }
    const GetDistribuidor = async (): Promise<boolean> => {
        const responseIdDistribuidor = await DistribuidorService.Get({ idUser: userContext.user?.id });
        if (!responseIdDistribuidor.sucesso)
            globalContext.SetMensagemSnack(responseIdDistribuidor.error || "Erro ao buscar dados do distribuidor", TypeMensagemSnack.error);
        else
            setIdDistribuidor(responseIdDistribuidor.data?.[0]?.id);
        return responseIdDistribuidor.sucesso;
    }
    const GetItens = async (): Promise<boolean> => {
        const responseItens = await ItemService.Get({});
        if (!responseItens.sucesso)
            globalContext.SetMensagemSnack(responseItens.error || "Erro ao buscar itens", TypeMensagemSnack.error);
        else
            setItens(responseItens.data);
        return responseItens.sucesso;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const HandleAddItem = useCallback(async () => {
        globalContext.SetLoading(true);
        const response = await DistribuidorItemService.Post(itensSelecionados, itensDistribuidor || [], String(idDistribuidor));
        if (response.some(x => !x.sucesso))
            globalContext.SetMensagemSnack(response[0].error || OcorreuUmErro, TypeMensagemSnack.error);
        else
            globalContext.SetMensagemSnack("Itens atualizados com sucesso", TypeMensagemSnack.success);
        await GetDistribuidorItem();
        globalContext.SetLoading(false);
    }, [itensSelecionados, itensDistribuidor]);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        globalContext.SetLoading(true);
        const GetAsync = async () => {
            if (!await GetItens()) return;
            if (!await GetDistribuidor()) return;
            if (!await GetDistribuidorItem()) return;
        }
        globalContext.SetLoading(false);
        GetAsync();
    }, []);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Container>
            <Row className="justify-content-md-center" id="row-initial">
                <Col sm={4}>
                    <Row className="justify-content-md-center">
                        <img src={Papel} alt="item-papel" />
                        {
                            itensDistribuidor.some(x => x.item?.nome?.toLowerCase() === "papel") &&
                            (<>
                                <small><BeenhereIcon style={{ color: "lime", fontSize: 15 }} /></small>
                            </>)
                        }
                    </Row>
                    <Row className="justify-content-md-center">
                        <label>
                            <input type="checkbox" onClick={() => SelecionarItem("papel")} className="filled-in" />
                            <span>Papel</span>

                        </label>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row className="justify-content-md-center">
                        <img src={Oleo} alt="item-oleo" />
                        {
                            itensDistribuidor.some(x => x.item?.nome?.toLowerCase() === "óleo") &&
                            (<>
                                <small><BeenhereIcon style={{ color: "lime", fontSize: 15 }} /></small>
                            </>)
                        }
                    </Row>
                    <Row className="justify-content-md-center">
                        <label>
                            <input type="checkbox" onClick={() => SelecionarItem("óleo")} className="filled-in" />
                            <span>Óleo</span>
                        </label>
                    </Row>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Row className="justify-content-md-center">
                        <img src={Lampada} alt="item-lampada" />
                        {
                            itensDistribuidor.some(x => x.item?.nome?.toLowerCase() === "vidro") &&
                            (<>
                                <small><BeenhereIcon style={{ color: "lime", fontSize: 15 }} /></small>
                            </>)
                        }
                    </Row>
                    <Row className="justify-content-md-center">
                        <label>
                            <input type="checkbox" onClick={() => SelecionarItem("vidro")} className="filled-in" />
                            <span>Vidro</span>
                        </label>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row className="justify-content-md-center">
                        <img src={Bateria} alt="item-vidro" />
                        {
                            itensDistribuidor.some(x => x.item?.nome?.toLowerCase() === "bateria/pilha") &&
                            (<>
                                <small><BeenhereIcon style={{ color: "lime", fontSize: 15 }} /></small>
                            </>)
                        }
                    </Row>
                    <Row className="justify-content-md-center">
                        <label>
                            <input type="checkbox" onClick={() => SelecionarItem("bateria/pilha")} className="filled-in" />
                            <span>Bateria/Pilha</span>
                        </label>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row className="justify-content-md-center">
                        <img src={Celular} alt="item-celular" />
                        {
                            itensDistribuidor.some(x => x.item?.nome?.toLowerCase() === "eletroeletrônicos") &&
                            (<>
                                <small><BeenhereIcon style={{ color: "lime", fontSize: 15 }} /></small>
                            </>)
                        }
                    </Row>
                    <Row className="justify-content-md-center">
                        <label>
                            <input type="checkbox" onClick={() => SelecionarItem("eletroeletrônicos")} className="filled-in" />
                            <span>Eletroeletrônicos</span>
                        </label>
                    </Row>
                </Col>
            </Row>
            <Row className="justify-content-md-center pb-5">
                <Button id="button-atualizar" variant="success"
                    onClick={() => HandleAddItem()}>
                    Atualizar
                </Button>
            </Row>
        </Container>
    );
}