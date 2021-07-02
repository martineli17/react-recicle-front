export type Item = {
    id?: string;
    nome?: string;
    tipoMaterial?: EnumTipoMaterial;
}

export enum EnumTipoMaterial {
    liquido = 1,
    solido = 2
}

export type ItemReducer = {
    dados?: Item[];
    quantidade?: number;
}