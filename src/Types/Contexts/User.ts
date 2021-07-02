import { User } from "../User";

export type UserContextType = {
    SetUser: (dados: UserContextData) => void;
    user?: UserContextData;
}

export type UserContextData = {
    type?: TypeUser;
    id?: string;
    idEspecifico?: string;
    token?: string;
    autenticado?:boolean;
    dados?: User
}

export enum TypeUser{
    Coletor = "COLETOR",
    Distribuidor = "DISTRIBUIDOR",
}