export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
}

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
}

export const doLogout = (next) => {
    localStorage.removeItem("data");
    localStorage.clear();
    next();
}

export const getCurrentUserData = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).userDto;
    } else return undefined;
}

export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token;
    } else return null;
}