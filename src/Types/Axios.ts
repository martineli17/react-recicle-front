import { AxiosResponse } from "axios";

export type ResponseMessage<Data> = {
    sucesso: boolean;
    response?: AxiosResponse<Data>;
    error?: string;
    data?: Data;
}