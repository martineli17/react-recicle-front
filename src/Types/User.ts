export type User = {
    accessToken?: string;
    expiresIn?: Float64Array;
    userToken?: UserToken;
    isAuthenticated?: Boolean;
    dateLogin: Date;
}



export type UserToken = {
    id: string;
    email?: string;
    claims?: Array<Claims>
}

export type Claims = {
    value?: string,
    type?: string,
}

export type UserCadastro = {
    tipo?: string,
    email?: string,
    password?: string,
    confirmacaoPassword?: string
}

export type UserLogin = {
    email: string;
    password: string;
}