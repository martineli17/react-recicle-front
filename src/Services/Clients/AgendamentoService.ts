import { DeleteAsync, GetAsync, PostAsync } from "../Axios/Api";
import { AgendamentoGet, AgendamentoPost, AgendamentoFiltro } from "../../Types/Agendamento";
import { ResponseMessage } from "../../Types/Axios";

export async function Post(agendamento: AgendamentoPost): Promise<ResponseMessage<AgendamentoPost>> {
    const response = await PostAsync<AgendamentoPost>('/agendamento', agendamento);
    return response;
}

export async function Get(filter: AgendamentoFiltro): Promise<ResponseMessage<AgendamentoGet[]>> {
    const response = await GetAsync<AgendamentoGet[]>('/agendamento',filter);
    return response;
}

export async function Delete(id: string): Promise<ResponseMessage<boolean>> {
    const response = await DeleteAsync<boolean>('/agendamento/' + id);
    return response;
}