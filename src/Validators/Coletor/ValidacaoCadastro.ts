import {Notificacao} from '../../Types/Notificacao';
import { ColetorCadastro } from '../../Types/Coletor';
import { ValidarEmail, CreateObjectMensagem } from '../Base/ValidacoesFuncoes';

export function ValidacaoCadastroColetor(coletor:ColetorCadastro):Notificacao{
    
    if(!(ValidarEmail(coletor?.email?.toString()))){
        return CreateObjectMensagem("Necessário informar o e-mail e deve conter no máximo 50 caracteres.");
    }
    else if(!coletor.nome){
        return CreateObjectMensagem("Necessário informar o nome.");
    }
    else if(!coletor.telefone){
        return CreateObjectMensagem("Telefone informado está inválido. Informe apenas os números.");
    }
    else if(parseFloat(coletor.telefone.toString()).toString() === "NaN" ||
            coletor.telefone.length > 11 || coletor.telefone.length < 10){
        return CreateObjectMensagem("Telefone informado está inválido. Informe apenas os números.");
    }
    return {containsNotificacao: false};
}
