import React, { useState, memo, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ColetorCadastro } from '../../../Types/Coletor';
import { Container } from './style';
import { useGlobalContext } from '../../../Contexts/GlobalContext';
import { useUserContext } from '../../../Contexts/UserContext';
import * as ColetorService from '../../../Services/Clients/ColetorService';
import { OcorreuUmErro } from '../../../Services/Variaveis/Mensagens';
import { TypeMensagemSnack } from '../../../Types/Notificacao';

function PerfilColetor() {
    const userContext = useUserContext();
    const globalContext = useGlobalContext();
    const [coletorState, setColetorState] = useState<ColetorCadastro>({} as ColetorCadastro);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        async function GetColetor() {
            const response = await ColetorService.Get({ idUser: userContext.user?.id });
            if (!response.sucesso)
                globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
            else {
                setColetorState(response.data && response.data[0] ? response.data[0] : {email: userContext.user?.dados?.userToken?.email});
                userContext.SetUser({ ...userContext.user, idEspecifico: response.data ? response.data[0]?.id : "" });
            }
        }
        GetColetor().then();
    }, []);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const HandleSave = async () => {
        globalContext.SetLoading(true);
        const response = coletorState?.id ? await ColetorService.Put(coletorState) : await ColetorService.Post(coletorState);
        if (!response.sucesso)
            globalContext.SetMensagemSnack(response.error || OcorreuUmErro, TypeMensagemSnack.error);
        else
            globalContext.SetMensagemSnack(coletorState?.id ? "Informações atualizadas com sucesso!" : "Informações salvas com sucesso!", TypeMensagemSnack.success);
        globalContext.SetLoading(false);
    }
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <h3>Informações sobre o Perfil</h3>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={4}>
                        <div className="input-field">
                            <input defaultValue={coletorState?.nome?.toString()}
                                onBlur={e => setColetorState({ ...coletorState, nome: e.target.value })}
                                id="nome" name="nome" type="text" required className="validate" />
                            <label htmlFor="nome">Nome</label>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="input-field">
                            <input defaultValue={coletorState?.telefone?.toString()}
                                onBlur={e => setColetorState({ ...coletorState, telefone: e.target.value })}
                                id="telefone" maxLength={11} name="telefone" required type="text" className="validate" />
                            <label htmlFor="telefone">Telefone</label>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Button
                        onClick={() => HandleSave()}
                        id="btnSalvar" name="btnSalvar" variant="success">
                        Salvar
                    </Button>
                </Row>
            </Container>
        </>
    )
}

export default memo(PerfilColetor);