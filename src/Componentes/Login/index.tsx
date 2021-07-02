import React, { useCallback, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Logo from '../../Assets/Imagens/logo@2x.png';
import { Imagem, Container } from './style';
import { ButtonCustom } from '../Button/Button';
import { User, UserLogin } from '../../Types/User';
import * as UserService from '../../Services/Clients/UserService';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { useUserContext } from '../../Contexts/UserContext';
import { TypeMensagemSnack } from '../../Types/Notificacao';
import { useHistory } from 'react-router-dom';


export default function Login() {
    const [login, setLogin] = useState<UserLogin>({ email: "", password: "" });
    const globalContext = useGlobalContext();
    const userContext = useUserContext();
    const history = useHistory();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const HandleLogin = useCallback(async () => {
        globalContext.SetLoading(true);
        const response = await UserService.Login(login);
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
    }, [login]);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <Container className="login">
                <Row className="justify-content-md-center">
                    <Imagem src={Logo} alt="logo-reciclagem" />
                </Row>
                <Row className="justify-content-md-center">
                    <div className="input-field">
                        <input
                            id="email" name="email" type="email" required className="validate"
                            onBlur={e => setLogin({ ...login, email: e.target.value })} />
                        <label htmlFor="email">E-mail</label>
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    <div className="input-field">
                        <input
                            id="senha" name="senha" type="password" required className="validate"
                            onBlur={e => setLogin({ ...login, password: e.target.value })} />
                        <label htmlFor="senha">Senha</label>
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    <ButtonCustom width={230}
                        onClick={HandleLogin}
                        id="btnLogin" name="btnLogin" variant="success">
                        Entrar
                    </ButtonCustom>
                </Row>
            </Container>
        </>
    )
}