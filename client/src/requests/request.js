import axios from 'axios';

export const getCommentData = async () => {
  let incomingCommentData = (
    await axios.get('http://localhost:4001/posts/comments/all')
  ).data;
  return incomingCommentData;
};

export const createComment = async (id, data) =>
  (
    await axios.post(`http://localhost:4001/posts/${id}/comments`, {
      content: data,
    })
  ).data;

export const getPostData = async () => {
  let incomingPostData = (await axios.get('http://localhost:4000/posts')).data;
  return incomingPostData;
};

export const createPost = async (data) =>
  (await axios.post(`http://posts.com/posts/create`, { title: data })).data;

export default { getCommentData, createComment, getPostData, createPost };
