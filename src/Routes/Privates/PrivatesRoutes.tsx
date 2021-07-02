import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from '../../Contexts/UserContext';
import { Claims } from '../../Types/User';

export default function PrivatesRoutes({ component: Component, claims, ...rest }: any) {
        const userContext = useUserContext();
        const claimsCast = claims as Claims[];
        const autorizado = claims ?
                !(userContext.user?.dados?.userToken?.claims?.
                        some(x => claimsCast.some
                                (c => x.type?.toUpperCase() !== c.type?.toUpperCase()
                                        && x.value?.toUpperCase() !== c.value?.toUpperCase())))
                : true;
        return (
                <Route {...rest} render={props => (
                        autorizado === true && userContext.user?.autenticado === true ?
                                <Component {...props} />
                                : <Redirect to={{
                                        pathname: userContext.user?.autenticado === true
                                                ? "/acesso-negado" : "/",
                                        state: { from: props.location }
                                }}
                        />
                )} />
        );
}