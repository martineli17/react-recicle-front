import { Coletor } from "./Coletor";
import {DistribuidorItemGet} from "./DistribuidorItem";

export type AgendamentoGet  = AgendamentoPost &{
    distribuidorItem:DistribuidorItemGet,
    coletor:Coletor,
    id:string,
}

export type AgendamentoPost = {
    idDistribuidorItem?:string,
    idColetor?:string,
    horaColeta?:number,
    minutoColeta?:number,
    diaDaSemanaColeta?:EnumDiasDaSemana,
}

export type AgendamentoFiltro = AgendamentoPost &{
    idDistribuidor?:string;
}

export type AgendamentoDelete = {
    idAgendamento: string;
    idColetor?: string;
    idDistribuidor?: string;
}

export type AgendamentoReducer = {
    dados?: AgendamentoGet[];
    quantidade: Number;
};

export enum EnumDiasDaSemana {
    Domingo = 0,
    Segunda = 1,
    Terca = 2,
    Quarta = 3,
    Quinta = 4,
    Sexta = 5,
    Sabado = 6,
}