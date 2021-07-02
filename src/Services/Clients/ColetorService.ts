import { GetAsync, PostAsync, PutAsync } from "../Axios/Api";
import { ResponseMessage } from "../../Types/Axios";
import { Coletor, ColetorCadastro, ColetorFiltro } from "../../Types/Coletor";

export async function Post(coletor: ColetorCadastro): Promise<ResponseMessage<ColetorCadastro>> {
    const response = await PostAsync<ColetorCadastro>('/coletor', coletor);
    return response;
}

export async function Put(coletor: ColetorCadastro): Promise<ResponseMessage<ColetorCadastro>> {
    const response = await PutAsync<ColetorCadastro>('/coletor', coletor);
    return response;
}

export async function Get(filter: ColetorFiltro): Promise<ResponseMessage<Coletor[]>> {
    const response = await GetAsync<Coletor[]>('/coletor',filter);
    return response;
}