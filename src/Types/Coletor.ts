export type Coletor = ColetorBase & {
    id?:string;
    idUser?:string;
};

export type ColetorCadastro = ColetorBase & {
    id?:string;
};

export type ColetorFiltro = ColetorBase &{
    idUser?:string;
};

export type ColetorReducer = {
    dados: Coletor[];
    exists: boolean;
    quantidade: number;
};

type ColetorBase = {
    nome?: string;
    telefone?:string;
    email?:string;
};
