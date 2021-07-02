import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../../Contexts/UserContext';
import { Claims } from '../../Types/User';
import PrivatesRoutes from './PrivatesRoutes';

type PrivatesRoutesColetorProps = {
    component: ReactNode;
    path: string;
}

export default function PrivatesRoutesColetor({ component: Component, path }: PrivatesRoutesColetorProps) {
    const userContext = useUserContext();
    const claims: Claims[] = [{type: "USUARIO", value: "COLETOR"}];
    return ( userContext.user?.idEspecifico ? 
        <PrivatesRoutes exact component={Component} path={path} claims={claims} />
        :
        <Redirect to={userContext.user?.autenticado ? "/coletor/perfil" : "/" } />
    )
}