import { Endereco } from "./Endereco";

export type Distribuidor = {
    id?:string;
    idUser?:string;
    nome?: string;
    numeroResidencia?:string;
    telefone?:string;
    email?:string;
    endereco?:Endereco;
};

export type DistribuidorCadastro = {
    id?: string;
    nome?: string;
    numeroResidencia?:string;
    telefone?:string;
    email?:string;
    cep?:string;
};

export type DistribuidorFiltro = {
    nome?: string;
    bairro?:string;
    cidade?:string;
    uf?:string;
    email?:string;
    idUser?:string;
};

export type DistribuidorReducer = {
    dados: Distribuidor[];
    exists: boolean;
    quantidade: number;
};