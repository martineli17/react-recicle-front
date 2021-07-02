import {TypeMensagemSnack} from '../Notificacao';

export type GlobalContextType = {
    SetLoading: (status: boolean) => void;
    SetMensagemSnack: (mensagem: string, type:TypeMensagemSnack) => void;
};

