import {Notificacao} from '../../Types/Notificacao';
import { DistribuidorCadastro } from '../../Types/Distribuidor';
import { ValidarEmail, CreateObjectMensagem } from '../Base/ValidacoesFuncoes';

export function ValidacaoCadastroDistribuidor(distribuidor:DistribuidorCadastro):Notificacao{
    
    if(!ValidarEmail(distribuidor.email?.toString())){
        return CreateObjectMensagem("Necessário informar o e-mail e deve conter no máximo 50 caracteres.");
    }
    else if(!distribuidor.nome){
        return CreateObjectMensagem("Necessário informar o nome.");
    }
    else if(!distribuidor.cep){
        return CreateObjectMensagem("Necessário informar o CEP.");
    }
    else if(parseFloat(distribuidor.cep.toString()).toString() === "NaN"){
        return CreateObjectMensagem("CEP informado está inválido.");
    }
    else if(!distribuidor.numeroResidencia){
        return CreateObjectMensagem("Necessário informar a residência.");
    }
    else if(!distribuidor.telefone){
        return CreateObjectMensagem("Telefone informado está inválido. Informe apenas os números.");
    }
    else if(parseFloat(distribuidor.telefone.toString()).toString() === "NaN" ||
     distribuidor.telefone.length > 11 || distribuidor.telefone.length < 10){
        return CreateObjectMensagem("Telefone informado está inválido. Informe apenas os números.");
    }
    else if(!distribuidor.email){
        return CreateObjectMensagem("Necessário informar o e-mail.");
    }
  
    return {containsNotificacao: false};
}
