export type Notificacao = {
    mensagem?: string,
    containsNotificacao: boolean,
    type?: string;
}

export type MensagemSnack = {
    status: boolean;
    mensagem: string;
    type: TypeMensagemSnack;
}

export enum TypeMensagemSnack{
    error = "error",
    success = "success",
    warning = "warning",
    info = "info"
}
