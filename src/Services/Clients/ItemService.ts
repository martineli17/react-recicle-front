import { GetAsync } from "../Axios/Api";
import { ResponseMessage } from "../../Types/Axios";
import { Item } from "../../Types/Item";

export async function Get(filter: Item): Promise<ResponseMessage<Item[]>> {
    const response = await GetAsync<Item[]>('/item', filter);
    return response;
}