import axios from 'axios';
import { put } from 'redux-saga/effects';
import { UrlApiRecicle } from '../Variaveis/Urls';
import {ResponseMessage} from "../../Types/Axios";

const Api = axios.create({
    baseURL: UrlApiRecicle,
    responseType: "json",
    timeout: 60000,
    timeoutErrorMessage: "Erro de conexão com o servidor.",
});

export async function GetAsync<Data>(url: string, params?: any): Promise<ResponseMessage<Data>>{
    try{
        const response = await Api.get<Data>(url, { params });
        return {response: response, data: response.data, sucesso: true} ;
    }
    catch (error){
        return {error: SetMensagemError(error), sucesso: false} ;
    }
       
}

export async function PostAsync<Data>(url: string, dados: any): Promise<ResponseMessage<Data>> {
        try{
            const response = await Api.post<Data>(url, dados);
            return {response: response, data: response.data, sucesso: true} ;
        }
        catch (error){
            return {error: SetMensagemError(error), sucesso: false} ;
        }
}

export async function PutAsync<Data>(url: string, dados: any): Promise<ResponseMessage<Data>> {
        try{
            const response = await Api.put<Data>(url, dados);
            return {response: response, data: response.data, sucesso: true} ;
        }
        catch (error){
            return {error: SetMensagemError(error), sucesso: false} ;
        }
}

export async function DeleteAsync<Data>(url: string): Promise<ResponseMessage<Data>> {
        try{
            const response = await Api.delete<Data>(url);
            return {response: response, data: response.data, sucesso: true} ;
        }
        catch (error){
            return {error: SetMensagemError(error), sucesso: false} ;
        }
}

Api.interceptors.request.use(config => {
    const token = localStorage.getItem("TOKEN");
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    else if(window.location.pathname !== "/")
        alert("Sua sessão expirou! Por favor, faça login novamente.");
    return config;
});

Api.interceptors.response.use(response => {
    if(response.status === 401) response.data = {sucesso: false, response: "Sessão expirada!"};
    else if(response.status === 403) response.data = {sucesso: false, response: "Você não está autorizado para essa ação."};
    else if(response.status === 400) response.data = {sucesso: false, response: response?.data[0]?.texto};
    else if(response.status === 404) response.data = {sucesso: false, response: "Registro solicitado não existe."};
    return response;
});

function SetMensagemError(error:any):string {
    console.log(error)
    return error.response?.status === 400 ? (error.response.data[0].texto || "Ocorreu um erro!") : "Ocorreu um erro!";
}