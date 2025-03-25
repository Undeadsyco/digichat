// Dependencies
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
// Dependency Components
import { Formik } from "formik";
// Components
import { Post, PostForm } from "./components";
import { ViewLayout } from "../../layouts";
// Hooks
import { useFeedViewReducer } from '../../../hooks';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, Posts } from "../../../state/atoms";
import { postActions } from "../../../actions";

/**
 * Desc: FeedView component that displays the feed of posts
 * @version 1.0.0
 * @since 2.0.0
 * @requires {@see PostForm}
 * @requires {@see Post}
 * @requires {@see ViewLayout}
 * 
 * @param {Object} props
 * @returns {React.Component}
 */
const FeedView = ({ user }) => {
  const [posts, setPosts] = useRecoilState(Posts);
  const setModal = useSetRecoilState(Modal);
  const resetModal = useSetRecoilState(Modal);

  const onCreatePost = (values, actions) => {
    postActions.createPost(values).then(res => {
      if (!res) return;
      setPosts([...posts, res]);
      actions.resetForm();
      resetModal();
    });
  }

  const onEditPost = (post) => setModal({
    display: true,
    Children: (<Formik
      component={PostForm}
      initialValues={post}
      onSubmit={(values, actions) => {
        postActions.editPost(values).then(res => {
          if (!res) return;
          setPosts(posts.map(p => p.postId === res.postId ? res : p));
          actions.resetForm();
          resetModal();
        });
      }}
    />)
  });

  const onDeletePost = (postId) => postActions.deletePost(postId).then(res => {
    if (!res) return;
    setPosts(posts.filter(p => p.postId !== postId));
  });

  const onOpenPostModal = (post) => {
    setModal(prev => ({
      ...prev,
      display: true,
      Children: <Formik
        component={PostForm}
        initialValues={{ title: "", body: "", privacy: 0 }}
        onSubmit={onCreatePost}
      />
    }));
  }

  return (
    <ViewLayout handleClick={onOpenPostModal} label="Tell us what's on your mind...">
      {posts?.length > 0 && posts.map((post) => (
        <Post key={post.postId} {...{
          user,
          post,
          onEditPost,
          onDeletePost,
        }} />
      ))}
    </ViewLayout>
  );
}

export default FeedView;
