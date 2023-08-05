import { privateAxios } from "./helper";

export const getAllCategory = () => {
    return privateAxios.get(`/category/`).then(response => { return response.data });
};