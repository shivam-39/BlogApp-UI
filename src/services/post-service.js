import { myAxios, privateAxios } from "./helper"

export const createPost = (postData) => {
    // console.log(postData);
    return privateAxios.post(`/post/user/${postData.userId}/category/${postData.categoryId}`, postData).then(response => response.data);
}

export const getAllPost = (pageNumber, pageSize) => {
    return myAxios.get(`/post?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response => response.data);
}