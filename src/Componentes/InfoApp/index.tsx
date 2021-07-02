import React, { useCallback, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { Title, Paragrafo, DivCabecalho } from './style';
import Cadastro, { DadosCadastro } from '../Cadastro/index';
import Logo from '../../Assets/Imagens/logo@2x.png';
import Modal from '../Modal/index';
import { ButtonCustom } from '../Button/Button';
import * as UserService from '../../Services/Clients/UserService';
import { useHistory } from 'react-router';
import { useUserContext } from '../../Contexts/UserContext';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { TypeMensagemSnack } from '../../Types/Notificacao';
import { User } from '../../Types/User';

export default function InfoApp() {
    const [modal, setModal] = useState(Boolean);
    const globalContext = useGlobalContext();
    const userContext = useUserContext();
    const history = useHistory();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const HandleCadastro = useCallback(async () => {
        globalContext.SetLoading(true);
        const response = await UserService.Post(DadosCadastro());
        if (!response.sucesso) {
            globalContext.SetMensagemSnack(response.error || "", TypeMensagemSnack.error);
        }
        else {
            const typeUser = UserService.GetTypeUser(response.data || {} as User);
            userContext.SetUser({
                autenticado: true, id: response.data?.userToken?.id,
                token: response.data?.accessToken, type: typeUser, dados: response.data || {} as User
            });
            history.push(UserService.GetRouteUser(response.data || {} as User));
        }
        globalContext.SetLoading(false);
    }, [DadosCadastro()]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const Cabecalho = <DivCabecalho>
                        <img id="logo-modal" src={Logo} alt="logo-reciclagem" />
                      </DivCabecalho>

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div className="info">
                <Row className="titleInfo justify-content-md-center">
                    <Title>Marketplace de reciclagem</Title>
                </Row>
                <Row className="descricaoInfo justify-content-md-center">
                    <Paragrafo>
                        O intuito dessa aplicação é aproximar dois lados - quem pretende reciclar de quem pretende
                        dar um melhor destino aos materiais já usados - e atingir um objetivo em comum: ajudar o nosso Planeta.
                            </Paragrafo>
                    <Paragrafo>
                        Encontre os estabelecimentos de coleta da sua região. Ou cadastre o
                        seu estabelecimento.
                    </Paragrafo>
                    <Paragrafo>Reciclando, nós fazemos as coisas antigas se tornarem novas. :)</Paragrafo>
                </Row>
                <Row className="justify-content-md-center">
                    <ButtonCustom marginTop={30} width={230} variant="success"
                        onClick={() => setModal(true)}>
                        Cadastrar
                    </ButtonCustom>
                </Row>
                <Modal Cabecalho={Cabecalho}
                    StatusModal={modal}
                    FunctionClose={() => setModal(false)}
                    ComponentView={<Cadastro />}
                    FunctionSuccess={() => HandleCadastro()}
                    TextButtomSuccess="Confirmar" TextButtomDanger="Cancelar" />
            </div>
        </>
    )
}