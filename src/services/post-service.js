import { myAxios, privateAxios } from "./helper"

export const createPost = (postData) => {
    // console.log(postData);
    return privateAxios.post(`/post/user/${postData.userId}/category/${postData.categoryId}`, postData).then(response => response.data);
}

export const getAllPost = (pageNumber, pageSize) => {
    return myAxios.get(`/post?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data);
}

export const getPostById = (postId) => {
    return myAxios.get(`/post/${postId}`).then(response => response.data);
}

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/post/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data);
}

export const getAllPostByCategory = (catId) => {
    return myAxios.get(`/post/category/${catId}`).then(response => response.data);
}

export const getAllPostByUser = (userId) => {
    return myAxios.get(`/post/user/${userId}`).then(response => response.data);
}

export const deletePost = (postId) => {
    return privateAxios.delete(`/post/${postId}`).then(response => response.data);
}

export const updatePost = (postData) => {
    return privateAxios.put(`/post/${postData.postId}`, postData).then(res => res.data);
}