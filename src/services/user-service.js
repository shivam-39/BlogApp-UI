import { myAxios } from "./helper"

export const signupService = (userData) => {
    return myAxios.post('/auth/register', userData).then((response) => response.data);
}

export const loginService = (loginData) => {
    return myAxios.post('/auth/login', loginData).then((response) => response.data);
}