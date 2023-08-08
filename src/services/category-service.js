import { privateAxios, myAxios } from "./helper";

export const getAllCategory = () => {
    return privateAxios.get(`/category/`).then(response => { return response.data });
};

export const getCategory = (catId) => {
    return myAxios.get(`/category/${catId}`).then(response => response.data);
}