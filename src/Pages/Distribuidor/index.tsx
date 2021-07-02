import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router';
import * as UserService from '../../Services/Clients/UserService';

export default function Distribuidor() {
    const history = useHistory();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const HandleLogout = () => {
        UserService.Logout();
        history.push("/");
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/distribuidor/coletas")}>Coletas</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/distribuidor/itens")}>Itens cadastrados</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/distribuidor/perfil")}>Informações</Nav.Link>
                    </Nav>
                    <Nav className="mr-right">
                        <Nav.Link onClick={() => HandleLogout()}>Sair</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        </>
    );
}