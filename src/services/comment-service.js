import { privateAxios } from "./helper"

export const createComment = (commentData, postId) => {
    return privateAxios.post(`/post/${postId}/comment`, commentData).then(response => response.data);
}