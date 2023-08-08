import { myAxios } from "./helper";

export const getAllCategory = () => {
    return myAxios.get(`/category/`).then(response => { return response.data });
};

export const getCategory = (catId) => {
    return myAxios.get(`/category/${catId}`).then(response => response.data);
}