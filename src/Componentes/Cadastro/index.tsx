import React,{useState}from 'react';
import Row from 'react-bootstrap/Row';
import {SelectCustom, Container} from './style';
import MenuItem from '@material-ui/core/MenuItem';
import {UserCadastro} from '../../Types/User';

type User = {
    User:UserCadastro,
}

let _userCadastroReturn:UserCadastro = {};

export default function Cadastro() {
    const [userCadastro, setUserCadastro] = useState<UserCadastro>({} as UserCadastro);
    _userCadastroReturn = userCadastro;
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <b>
                        Preencha o formulário abaixo para concluir o cadastro.
                        Escolha entre ser um Distribuidor ou um Coletor de materiais.
                    </b>
                </Row>
                <Row className="justify-content-md-center">
                    <div className="input-field">
                        <input onChange={e => setUserCadastro({...userCadastro,email: e.target.value})}
                            id="emailModal" type="text" className="validate" />
                        <label htmlFor="emailModal">E-mail</label>
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    <SelectCustom onChange={e => setUserCadastro({...userCadastro,tipo: String(e.target.value)})}
                     id="tipo">
                        <MenuItem value="Distribuidor">Distribuidor</MenuItem>
                        <MenuItem value="Coletor">Coletor</MenuItem>
                    </SelectCustom>
                </Row>
                <Row className="justify-content-md-center">
                    <div className="input-field">
                        <input onChange={e => setUserCadastro({...userCadastro,password: e.target.value })}
                            id="senhaModal" type="password" className="validate" />
                        <label htmlFor="senhaModal">Senha</label>
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    <div className="input-field">
                        <input onChange={e =>  setUserCadastro({...userCadastro,confirmacaoPassword: e.target.value})}
                            id="confirmacaoSenha" type="password" className="validate" />
                        <label htmlFor="confirmacaoSenha">Confirmação de senha</label>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export function DadosCadastro():UserCadastro{
    return _userCadastroReturn;
}