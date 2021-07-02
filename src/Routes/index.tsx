import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Pages/Home/index';
import NotFound from '../Pages/RotasPrivadas/NotFound';
import Forbidden from '../Pages/RotasPrivadas/Forbidden';
import EmailPage from '../Pages/Notificacao/Email';
import PrivatesRoutesColetor from './Privates/PrivatesRoutesColetor';
import Coletor from '../Pages/Coletor/Index';
import PrivatesRoutes from './Privates/PrivatesRoutes';
import Distribuidor from '../Pages/Distribuidor/index';
import PrivatesRoutesDistribuidor from './Privates/PrivatesRoutesDistribuidor';
import { Claims } from '../Types/User';
import { Perfil as PerfilColetor } from '../Pages/Coletor/perfil';
import { Coletas as ColetasColetor }  from '../Pages/Coletor/coletas';
import Agendamento from '../Pages/Coletor/agendamento';
import{ Perfil as PerfilDistribuidor } from '../Pages/Distribuidor/perfil';
import { Coletas as ColetasDistribuidor } from '../Pages/Distribuidor/coletas';
import Itens from '../Pages/Distribuidor/itemDistribuidor';

export default function Roteamento(){
    const claimsColetor: Claims[] = [{ type: "USUARIO", value: "COLETOR" }];
    const claimsDistribuidor: Claims[] = [{ type: "USUARIO", value: "DISTRIBUIDOR" }];
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <PrivatesRoutes path="/coletor" exact component={Coletor} claims={claimsColetor} />
            <PrivatesRoutes path="/coletor/perfil" exact component={PerfilColetor} claims={claimsColetor}/>
            <PrivatesRoutesColetor path="/coletor/coletas" component={ColetasColetor} />
            <PrivatesRoutesColetor path="/coletor/agendamento" component={Agendamento} />
            <PrivatesRoutes path="/distribuidor/perfil" exact component={PerfilDistribuidor} claims={claimsDistribuidor}/>
            <PrivatesRoutesDistribuidor validarIdEspecifico={true} path="/distribuidor/coletas" component={ColetasDistribuidor} />
            <PrivatesRoutesDistribuidor validarIdEspecifico={true} path="/distribuidor/itens" component={Itens} />
            <PrivatesRoutes path="/distribuidor" exact component={Distribuidor} claims={claimsDistribuidor} />
            <Route path="/email/externo" exact component={EmailPage} />
            <Route path="/acesso-negado" exact component={Forbidden} />
            <Route path="*" exact component={NotFound} />
      </Switch>
    );
}