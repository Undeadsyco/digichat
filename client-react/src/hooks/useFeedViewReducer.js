import { useReducer } from "react";

import { postActions } from '../actions';

const initialState = {
  loading: true,
  posts: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSTS_SUCCESS': return {
      ...state,
      loading: false,
      posts: action.payload,
    };
    case 'CREATE_POST_SUCCESS': return {
      ...state,
      posts: [action.payload, ...state.posts]
    };
    case 'DELETE_POST_SUCCESS': return {
      ...state,
      posts: state.posts.filter(post => post.postId !== action.payload)
    };
    case 'EDIT_POST_SUCCESS': return {
      ...state,
      posts: state.posts.map(post => post.postId === action.payload.postId ? { ...post, body: action.payload.body } : post),
    };

    case 'GET_COMMENTS_SUCCESS': return {
      ...state,
      posts: state.posts.map(post => (
        post.postId === action.payload.postId ? {
          ...post,
          comments: action.payload.comments
        } : post
      )),
    };
    case 'CREATE_COMMENT_SUCCESS': return {
      ...state,
      posts: state.posts.map(post => (
        post.postId === action.payload.postId ? { ...post, comments: [action.payload, ...post.comments] } : post
      )),
    };
    case "DELETE_COMMENT_SUCCESS": return {
      ...state,
      posts: state.posts.map(post => (
        post.postId === action.payload.postId ? {
          ...post,
          comments: post.comments.filter(comment => (
            comment.commentId !== action.payload.commentId
          ))
        } : post
      )),
    };

    default: return { ...state };
  }
}

const useFeedReducer = ({ user, getPosts, actions: appActions }) => {
  const { onSetError, onCloseModal } = appActions;
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    onGetPosts: async () => {
      try {
        const posts = await getPosts();
        if (!posts) throw new Error('No posts found');
        dispatch({ type: "GET_POSTS_SUCCESS", payload: posts });
      } catch (error) {
        onSetError(error);
      }
    },
    onCreatePost: (values, actions) => {
      actions.setSubmitting(true);
      try {
        postActions.createPost(values).then(res => {
          if (!res) throw new Error('Failed to create post');
          actions.resetForm();
          dispatch({ type: "CREATE_POST_SUCCESS", payload: res });
        })
      } catch (error) {
        onSetError(error);
      } finally {
        actions.setSubmitting(false);
        onCloseModal();
      }
    },
    onEditPost: (postEdit) => {
      try {
        postActions.editPost(postEdit).then(res => {
          if (!res) throw new Error('Failed to edit post');
          dispatch({ type: "EDIT_POST_SUCCESS", payload: res });
        })
      } catch (error) {
        onSetError(error);
      } finally {
        onCloseModal();
      }
    },
    onDeletePost: (postId) => {
      try {
        postActions.deletePost(postId).then(res => {
          if (!res) throw new Error('Failed to delete post');
          dispatch({ type: "DELETE_POST_SUCCESS", payload: postId });
        })
      } catch (error) {
        onSetError(error);
      }
    },

    onGetComments: (postId) => {
      try {
        postActions.getComments(postId).then(res => {
          if (!res) throw new Error('Failed to get comments');
          dispatch({ type: "GET_COMMENTS_SUCCESS", payload: { postId, comments: res } });
        })
      } catch (error) {
        onSetError(error);
      }
    },
    onCreateComment: (values, actions) => {
      actions.setSubmitting(true);
      try {
        postActions.createComment(values).then(res => {
          if (!res) throw new Error('Failed to create comment');
          actions.resetForm();
          dispatch({ type: 'CREATE_COMMENT_SUCCESS', payload: res });
        })
      } catch (error) {
        onSetError(error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    onDeleteComment: (commentId, postId) => {
      try {
        postActions.deleteComment(commentId).then(res => {
          if (!res) throw new Error('Failed to delete comment');
          dispatch({ type: 'DELETE_COMMENT_SUCCESS', payload: { commentId, postId } });
        })
      } catch (error) {
        onSetError(error);
      }
    }
  }

  return { state, actions };
}

export default useFeedReducer;
