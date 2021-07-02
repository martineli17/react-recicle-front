import { PostAsync } from "../Axios/Api";
import { ResponseMessage } from "../../Types/Axios";
import { User, UserCadastro, UserLogin } from "../../Types/User";
import { StartConnectionSignaIR } from "../SignaIR/SignaIR";
import * as CryptoJS from 'crypto-js';
import { ValidacaoCadastro, ValidacaoLogin } from "../../Validators/Home/ValidacaoUser";
import { TypeUser } from "../../Types/Contexts/User";

export async function Post(user: UserCadastro): Promise<ResponseMessage<User>> {
    const validacao = ValidacaoCadastro(user);
    if(validacao.containsNotificacao)
        return {sucesso: false, error: validacao.mensagem};
    const response = await PostAsync<User>('/autenticacao/register', user);
    if (response.sucesso) StartServices(response.data);
    return response;
}

export async function Login(login: UserLogin): Promise<ResponseMessage<User>> {
    const validacao = ValidacaoLogin(login.password, login.email);
    if(validacao.containsNotificacao)
        return {sucesso: false, error: validacao.mensagem};
    const response = await PostAsync<User>('/autenticacao/login', login);
    if (response.sucesso) StartServices(response.data);
    return response;
}

export function Logout(): void {
    window.localStorage.clear();
}

export function GetRouteUser(user:User): string{
    const typeUser = GetTypeUser(user);
    return typeUser === TypeUser.Coletor ? "/coletor/perfil" : "/distribuidor/perfil";
}

export function GetTypeUser(user:User): TypeUser{
    return user?.userToken?.claims?.some(x =>
        x.value?.toUpperCase() === TypeUser.Coletor.toUpperCase())
        ? TypeUser.Coletor : TypeUser.Distribuidor;
}

function StartServices(data: (User | undefined)) {
    SetUserCredenciais(data);
    StartConnectionSignaIR(data?.userToken?.id?.toString() || "", data?.accessToken?.toString() || "")
}

export const GetToken = (): string => localStorage.getItem("TOKEN") || "";


//analisar posteriormente
function SetUserCredenciais(data: (User | undefined)) {
    if (data) data.dateLogin = new Date;
    const dataUser = CryptoJS.AES.encrypt(JSON.stringify(data), "MinhaKey").toString();
    localStorage.setItem("TOKEN", String(data?.accessToken));
    localStorage.setItem("USER", JSON.stringify(data));
}

// export function GetUserCredenciais(): (User) {
//     // const decrypt = CryptoJS.AES.decrypt(localStorage.getItem("USER") || "", "MinhaKey");
//     // const byteArray = wordToByteArray(decrypt.words);
//     // const dataUser = byteArrayToString(byteArray);
//     // return JSON.parse(String.fromCharCode(...decrypt.words));
//     return JSON.parse(localStorage.getItem("USER") || "{}");
// }

// export function ValidarAutenticacao(): boolean {
//     const user = GetUserCredenciais();
//     const horasExpiracao = user?.expiresIn || 1;
//     let dateLogin: Date = new Date(user ? user.dateLogin : new Date());
//     dateLogin.setHours(+horasExpiracao);
//     if (user?.accessToken && dateLogin >= new Date()) return true;
//     return false;
// }

// export function ValidarClaim(claim: string): boolean {
//     const user = GetUserCredenciais();
//     return user?.userToken?.claims?.some(x => x.value === claim) || false;
// }