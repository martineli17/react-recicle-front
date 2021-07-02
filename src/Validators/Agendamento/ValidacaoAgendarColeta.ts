import {Notificacao} from '../../Types/Notificacao';
import { AgendamentoPost } from '../../Types/Agendamento';
import { CreateObjectMensagem } from '../Base/ValidacoesFuncoes';

export function ValidacaoAgendarColeta(agendamento:AgendamentoPost):Notificacao{
    if(!agendamento.idDistribuidorItem){
        return CreateObjectMensagem("Item não identificado", "error");
    }
    else if(!agendamento.diaDaSemanaColeta){
        return CreateObjectMensagem("Necessário selecionar o dia da Semana.");
    }
    else if(!agendamento.horaColeta || agendamento.horaColeta < 0 || agendamento.horaColeta > 23){
        return CreateObjectMensagem("Hora da coleta não informada ou inválida.");
    }
    else if(!agendamento.minutoColeta || agendamento.minutoColeta < 0 || agendamento.minutoColeta > 59){
        return CreateObjectMensagem("Minuto da coleta não informado ou inválido.");
    }
    else if(!agendamento.idColetor){
        return CreateObjectMensagem("Coletor não identificado", "error");
    }
    return {containsNotificacao: false};
}