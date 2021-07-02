import { AgendamentoGet } from "./Agendamento";
import { Distribuidor } from "./Distribuidor";
import { Item } from "./Item";

type DistribuidorItemBase = {
    id?:string;
};

export type DistribuidorItem = DistribuidorItemBase&{
    idDistribuidor?:string;
    idItem?:string;
};

export type DistribuidorItemGet = DistribuidorItemBase &{
    distribuidor?:Distribuidor;
    item?:Item;
    agendamento?: AgendamentoGet[];
};

export type DistribuidorItemReducer = {
    dados?: DistribuidorItemGet[];
    quantidade: Number;
};

export type ItensSelecionados = {
    nome?:string;
    id?:string;
    idDistribuidorItem?:string;
}