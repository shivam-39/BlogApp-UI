import { myAxios } from "./helper";

export const getAllCategory = () => {
    return myAxios.get(`/category/`).then(response => { return response.data });
};