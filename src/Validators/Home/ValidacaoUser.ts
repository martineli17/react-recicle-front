import { UserCadastro } from '../../Types/User';
import { Notificacao } from '../../Types/Notificacao';

export function ValidacaoLogin(password:String, email:String):Notificacao{
    if(!email){
        return {mensagem: "Necessário informar o e-mail.", type:"warning", containsNotificacao: true};
    }
    else if(!password){
        return {mensagem: "Necessário informar a senha.", type:"warning", containsNotificacao: true};
    }
    return {containsNotificacao: false};
}

export function ValidacaoCadastro(user:UserCadastro):Notificacao{
    if(!user){
        return {mensagem: "Informe os dados.", type:"warning", containsNotificacao: true};
    }
    if(!user.password){
        return {mensagem: "Necessário informar a senha.", type:"warning", containsNotificacao: true};
    }
    if(!user.email){
        return {mensagem: "Necessário informar o e-mail.", type:"warning", containsNotificacao: true};
    }
    if(user.tipo !== "Coletor" && user.tipo !== "Distribuidor"){
        return {mensagem: "Tipo de usuário informado está inválido.", type:"warning", containsNotificacao: true};
    }
    if(user.confirmacaoPassword !== user.password){
        return {mensagem: "Senhas informados não coincidem.", type:"warning", containsNotificacao: true};
    }
    return {containsNotificacao: false};
}
