import React, { useState, memo, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { DistribuidorCadastro } from '../../../Types/Distribuidor';
import * as DistribuidorService from '../../../Services/Clients/DistribuidorService';
import { Container } from './style';
import { useGlobalContext } from '../../../Contexts/GlobalContext';
import { useUserContext } from '../../../Contexts/UserContext';
import { OcorreuUmErro } from '../../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../../Types/Notificacao';

function PerfilDistribuidor() {
    const userContext = useUserContext();
    const globalContext = useGlobalContext();
    const [distribuidorState, setDistribuidorState] = useState<DistribuidorCadastro>({} as DistribuidorCadastro);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        async function GetDistribuidor() {
            const response = await DistribuidorService.Get({ idUser: userContext.user?.id });
            if (!response.sucesso)
                globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
            else {
                if(response.data){
                    setDistribuidorState({...response.data[0], cep: response.data[0]?.endereco?.cep, email: userContext.user?.dados?.userToken?.email});
                    userContext.SetUser({ ...userContext.user, idEspecifico: response.data[0]?.id });
                }
                else
                    setDistribuidorState({email: userContext.user?.dados?.userToken?.email});
            }
        }
        GetDistribuidor().then();
    }, []);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const HandleSave = async () => {
        globalContext.SetLoading(true);
        const response = distribuidorState?.id ? await DistribuidorService.Put(distribuidorState) : await DistribuidorService.Post(distribuidorState);
        if (!response.sucesso)
            globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
        else
            globalContext.SetMensagemSnack(distribuidorState?.id ? "Informações atualizadas com sucesso!" : "Informações salvas com sucesso!", TypeMensagemSnack.success);
        globalContext.SetLoading(false);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <h3>Informações sobre o Perfil</h3>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={4}>
                        <div className="input-field">
                            <input defaultValue={distribuidorState?.nome?.toString()}
                                onBlur={e => setDistribuidorState({ ...distribuidorState, nome: e.target.value })}
                                id="nome" name="nome" type="text" required className="validate" />
                            <label htmlFor="nome">Nome</label>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="input-field">
                            <input defaultValue={distribuidorState?.telefone?.toString()}
                                onBlur={e => setDistribuidorState({ ...distribuidorState, telefone: e.target.value })}
                                id="telefone" maxLength={11} name="telefone" required type="text" className="validate" />
                            <label htmlFor="telefone">Telefone</label>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={2}>
                        <div className="input-field">
                            <input defaultValue={distribuidorState?.cep?.toString()}
                                onBlur={e => setDistribuidorState({ ...distribuidorState, cep: e.target.value })}
                                id="cep" maxLength={8} name="cep" type="text" required className="validate" />
                            <label htmlFor="cep">CEP</label>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="input-field">
                            <input defaultValue={distribuidorState?.numeroResidencia?.toString()}
                                onBlur={e => setDistribuidorState({ ...distribuidorState, numeroResidencia: e.target.value })}
                                id="residencia" name="residencia" type="text" required className="validate" />
                            <label htmlFor="residencia">Residência</label>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Button
                        onClick={() => HandleSave()}
                        id="btnLogin" name="btnLogin" variant="success">
                        Salvar
                    </Button>
                </Row>
            </Container>
        </>
    )
}

export default memo(PerfilDistribuidor);