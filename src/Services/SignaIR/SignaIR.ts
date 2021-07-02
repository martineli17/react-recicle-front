import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { UrlApiHub } from '../Variaveis/Urls';
import RegisterEmailHub from './RegisterEmailHub';

export function StartConnectionSignaIR(id: string, token: string) {
    // Crio a instância do Hub de conexão do SignalR
    const conexao = new HubConnectionBuilder()
                    .withUrl(`${UrlApiHub}hubs/email/enviados/coleta?IdUsuario=${id}&access_token=${token}`)
                    .configureLogging(LogLevel.Debug)
                    .withAutomaticReconnect().build();

    // Inicio a conexão.
    conexao.start();
    RegisterEmailHub(conexao);
}