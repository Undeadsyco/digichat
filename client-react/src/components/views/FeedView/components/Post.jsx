// Dependencies
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
// Custom Components
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { ReactionDisplay } from "./ReactionDisplay";
import IconBtn from "../../../global/IconBtn";
// Utils
import { formatTime } from "../../../../utils";
import { Image } from "../../../global";
import { postActions } from "../../../../actions";
import { Posts } from "../../../../state/atoms";
import { useSetRecoilState } from "recoil";

/**
 * Component that displays a post and its interactions including comments and reactions
 * @param {PostProps} props 
 * @returns {React.Component}
 * 
 * @version 1.0.0
 * @since 2.0.0
 * @see Comment
 * @see CommentForm
 * @see IconBtn
 * @see formatTime
 * 
 * @example
 * const Post = (props) => (
 *  <div>
 *    <div>
 *      /...post data and interactions /
 *    </div>
 *    <div>
 *      /...comments display and form /
 *    </div>
 *  </div>
 * )
 */
const Post = ({ user, post, onDeletePost, onEditPost }) => {
  const [commentDisplay, setCommentDisplay] = useState(false);
  const [reactionDisplay, setReactionDisplay] = useState(false);
  const [isOwner] = useState(post.author.userId === user.userId);

  const setPosts = useSetRecoilState(Posts);

  const onCreateComment = (values, actions) => {
    postActions.createComment(values).then(comment => {
      if (!comment) return;
      setPosts(posts => (
        posts.map(p => (
          p.postId === post.postId ? { ...p, comments: [comment, ...p.comments] } : p
        ))
      ));
      actions.resetForm();
    })
  };

  const onDeleteComment = (commentId) => {
    postActions.deleteComment(commentId).then(res => {
      if (!res) return;
      setPosts(posts => (
        posts.map(p => (
          p.postId === post.postId ? { ...p, comments: p.comments.filter(comment => comment.commentId !== commentId) } : post
        ))
      ));
    });
  };

  return (
    <div key={post.postId} className="w-full flex flex-col items-center mb-2">
      {/* Post Display */}
      <div className="rounded-4xl p-4 flex flex-wrap text-lg border-b-2 border-black gradient-45">

        {/* Author Content */}
        <div className="w-full h-12 grid grid-cols-5 mb-4">

          {/* Author Info */}
          <Image src="/profile_pic.jpg" alt="profile" />
          <h2
            className="col-span-2 col-start-2 row-start-1 text-2xl font-bold"
          // onClick={() => onSetRedirect(`/profile/${post?.author.userId}`)}
          >{post?.author.userName}</h2>
          <h4 className="col-span-2 col-start-2 row-start-1 mt-6 text-sm flex items-center">
            <span>{formatTime(post?.createdAt)}</span>
            <IconBtn size="lg" icon={parseInt(post.privacy) ? 'lock' : 'globe'} />
          </h4>

          {/* Author Controlls */}
          {(isOwner || user.admin === 1) && (
            <div className="col-start-4 col-span-2 flex justify-end items-center">
              {isOwner && <IconBtn icon="pen-to-square" onClick={() => onEditPost(post)} />}
              {(isOwner || user.admin) && <IconBtn icon="trash-alt" onClick={() => onDeletePost(post.postId)} />}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="w-full p-2 z-10 relative before:content-[''] before:w-full before:h-full before:bg-white before:block before:top-0 before:left-0 before:-z-10 before:absolute before:opacity-30 before:rounded-2xl ">
          <h2>{post?.title}</h2>
          <p>{post?.body}</p>
          <hr className="mb-2 w-full" />
        </div>

        {/* Interactive Actions */}
        <div className="w-full flex flex-nowrap items-center justify-between mt-2 relative">

          {/* Reaction display Container */}
          <div className="group/reactions relative h-12">

            {/* Reaction Display Modal */}
            <div className={`h-full relative z-10 flex items-center top-left before:absolute before:content-[''] before:size-full before:bg-black before:-z-10 before:opacity-20 ${reactionDisplay ? "before:rounded-s-full" : "before:rounded-full"}`}>

              {/* Reaction Display Controller */}
              <IconBtn
                onClick={() => setReactionDisplay((prev) => !prev)}
                icon={reactionDisplay ? "times-circle" : "thumbs-up"}
                label={reactionDisplay ? '' : parseInt(post?.likes)}
                size="2xl"
              />

              {reactionDisplay && <ReactionDisplay />}
            </div>
          </div>

          {/* Comment Display Controller */}
          <IconBtn icon="comment-dots" label={post?.comments?.length || 0} onClick={() => setCommentDisplay((prev) => !prev)} />
        </div>
      </div>

      {/* Comments Display */}
      {commentDisplay && (
        <div className="w-[85%] h-fit flex flex-col items-center -gradient-45 border-2 border-t-0 border-black rounded-b-4xl relative">

          {post?.comments?.length > 0 && post.comments?.map(comment => (
            // Comment Component
            <Comment key={comment.commentId} {...{ user, comment, onDeleteComment }} />
          ))}


          <Formik
            component={CommentForm}
            initialValues={{ body: '', postId: post.postId }}
            onSubmit={onCreateComment}
          />
        </div>
      )}
    </div>
  );
}

export default Post;
