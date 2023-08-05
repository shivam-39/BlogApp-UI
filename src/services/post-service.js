import { privateAxios } from "./helper"

export const createPost = (postData) => {
    // console.log(postData);
    return privateAxios.post(`/post/user/${postData.userId}/category/${postData.categoryId}`, postData).then(response => response.data);
}