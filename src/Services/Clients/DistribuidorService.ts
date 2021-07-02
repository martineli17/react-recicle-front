import { PutAsync, GetAsync, PostAsync } from "../Axios/Api";
import { ResponseMessage } from "../../Types/Axios";
import { Distribuidor, DistribuidorCadastro, DistribuidorFiltro } from "../../Types/Distribuidor";

export async function Post(distribuidor: DistribuidorCadastro): Promise<ResponseMessage<DistribuidorCadastro>> {
    const response = await PostAsync<DistribuidorCadastro>('/distribuidor', distribuidor);
    return response;
}

export async function Put(distribuidor: DistribuidorCadastro): Promise<ResponseMessage<DistribuidorCadastro>> {
    const response = await PutAsync<DistribuidorCadastro>('/distribuidor', distribuidor);
    return response;
}

export async function Get(filter: DistribuidorFiltro): Promise<ResponseMessage<Distribuidor[]>> {
    const response = await GetAsync<Distribuidor[]>('/distribuidor',filter);
    return response;
}