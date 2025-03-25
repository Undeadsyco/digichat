import authAxios from "./authAxios";

const basePostUrl = "/api/posts",
  baseCommentUrl = `${basePostUrl}/comments`;

/**
 * @typedef {Object} actionObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionObj>} postActions
 *
 * @type {postActions}
 */
const postActions = {
  getPosts: async () => {
    const req = await authAxios.get(`${basePostUrl}`);
    const res = await req.data;
    return res.posts.reverse();
  },
  createPost: async (postData) => {
    const req = await authAxios.post(`${basePostUrl}`, { ...postData });
    const res = await req.data;
    return res.post;
  },
  editPost: async (post) => {
    if ((await authAxios.put(`${basePostUrl}/${post.postId}`, post)).status !== 200) {
      setTimeout(() => { alert('Edit Failed') }, 100);
      return;
    }
    return post;
  },
  deletePost: async (postId) => {
    if ((await authAxios.delete(`${basePostUrl}/${postId}`)).status !== 200) {
      setTimeout(() => { alert('Delete Failed') }, 100);
      return;
    }
    return true;
  },
  createComment: async (comment) => {
    const req = await authAxios.post(`${baseCommentUrl}`, comment);
    const res = await req.data;
    return res.comment;
  },
  deleteComment: async (commentId) => {
    if ((await authAxios.delete(`${baseCommentUrl}/${commentId}`)).status !== 200) {
      setTimeout(() => { alert('Delete Failed') }, 100);
      return;
    }
    return true;
  }
}

export default postActions;