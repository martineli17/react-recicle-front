import React, {ReactNode} from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../../Contexts/UserContext';
import { Claims } from '../../Types/User';
import PrivatesRoutes from './PrivatesRoutes';

type PrivatesRoutesDistribuidorProps = {
    component: ReactNode;
    path: string;
    validarIdEspecifico: boolean;
}

export default function PrivatesRoutesDistribuidor({ validarIdEspecifico, component: Component, path }: PrivatesRoutesDistribuidorProps) {
    const userContext = useUserContext();
    const claims: Claims[] = [{type: "USUARIO", value: "DISTRIBUIDOR"}];
    return ( !validarIdEspecifico || userContext.user?.idEspecifico ? 
        <PrivatesRoutes exact path={path} component={Component} claims={claims} />
        :
        <Redirect to={userContext.user?.autenticado ? "/distribuidor/perfil" : "/" } />
    )
}