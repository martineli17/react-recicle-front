import { HubConnection } from '@microsoft/signalr';
import {Send} from '../Notificacao/NotificacaoBrowser';
import { EmailNotificacao } from '../../Types/SignaIR/EmailNotificacao';

export default function RegisterEmailHub(conexao: HubConnection) {
    conexao.on("EmailRecebidosColeta", (email: EmailNotificacao) => {
        Send(`${email.assunto}`, `${email.mensagem}`,
        () => window.open(`http://localhost:3000/email/externo?title=${email.assunto}&body=${email.mensagem}`));
    });
}