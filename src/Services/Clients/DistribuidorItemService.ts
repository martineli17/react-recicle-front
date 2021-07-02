import { DeleteAsync, GetAsync, PostAsync } from "../Axios/Api";
import { ResponseMessage } from "../../Types/Axios";
import { DistribuidorItem, DistribuidorItemGet, ItensSelecionados } from "../../Types/DistribuidorItem";

export async function Post(itens: ItensSelecionados[], itensCadastrados: DistribuidorItemGet[], idDistribuidor: string): Promise<ResponseMessage<DistribuidorItem>[]> {
    const itensRetirados: (String | undefined)[] | undefined = itensCadastrados?.map(item => {
        if (!itens.some(x => x.idDistribuidorItem === item.id)) return item.id;
    });
    const itensInseridos: (ItensSelecionados | undefined)[] = itens.map(item => {
        if (!itensCadastrados?.some(x => x.id === item.idDistribuidorItem)) return item;
    });
    await DeleteAll(itensRetirados?.filter(x => x !== undefined) || []);
    return await PostItens(idDistribuidor, itensInseridos);
}

export async function Get(filter: DistribuidorItem): Promise<ResponseMessage<DistribuidorItemGet[]>> {
    const response = await GetAsync<DistribuidorItemGet[]>('/distribuidor-item', filter);
    return response;
}

async function DeleteAll(dados: (String | undefined)[]) {
    if (dados) {
        for (let item in dados) {
            if (dados[item] === undefined) continue;
            await DeleteAsync<any>(`/distribuidor-item/${dados[item]}`);
        }
    }
}

async function PostItens(idDistribuidor: string, itens: (ItensSelecionados | undefined)[]): Promise<ResponseMessage<DistribuidorItem>[]> {
    let results: ResponseMessage<DistribuidorItem>[] = [];
    await itens.filter(item => item !== undefined).map(async item => {
        if (!results.some(x => !x.sucesso)) {
            const response = await PostAsync<DistribuidorItem>('/distribuidor-item',
                { idDistribuidor, idItem: item?.id });
            results.push(response);
        }
    })
    return results;
}