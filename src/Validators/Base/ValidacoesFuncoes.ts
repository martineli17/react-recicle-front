import {Notificacao} from '../../Types/Notificacao';

export function ValidarEmail(email?: string): boolean {
    if(!email || email?.length > 50) return false;
    let usuario = email?.substring(0, email?.indexOf("@"));
    let dominio = email?.substring(email?.indexOf("@") + 1, email?.length);
    return ((usuario?.search("@") == -1) &&
        (dominio?.search("@") == -1) &&
        (usuario?.search(" ") == -1) &&
        (dominio?.search(" ") == -1) &&
        (dominio?.search(".") != -1) &&
        (dominio?.indexOf(".") >= 1) &&
        (dominio?.lastIndexOf(".") < dominio.length - 1));
}

export function CreateObjectMensagem(mensagem:string, tipo:string = "warning"):Notificacao{
    return {mensagem, type:tipo, containsNotificacao: true};
}