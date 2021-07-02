import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import * as UserService from '../../Services/Clients/UserService';
import { useHistory } from 'react-router';
import { useUserContext } from '../../Contexts/UserContext';

export default function Coletor() {
    const userContext = useUserContext();
    const history = useHistory();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const HandleLogout = () => {
        userContext.SetUser({});
        UserService.Logout();
        history.push("/");
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/coletor/coletas")}>Coletas</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/coletor/agendamento")}>Agendamento</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/coletor/perfil")}>Perfil</Nav.Link>
                    </Nav>
                    <Nav className="mr-right">
                        <Nav.Link onClick={() => HandleLogout()}>Sair</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        </>
    );
}