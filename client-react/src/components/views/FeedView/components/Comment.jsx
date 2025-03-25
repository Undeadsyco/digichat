// Dependencies
import PropTypes from "prop-types";
// Dependency Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Utils
import { formatTime } from "../../../../utils";
import { Image } from "../../../global";
import { useState } from "react";

/**
 * Component that displays a comment and its interactions
 * @param {CommentProps} props 
 * @returns {React.Component}
 * 
 * @version 1.0.0
 * @since 2.0.0
 * @see formatTime
 * 
 * @example
 * const Comment = (props) => (
 *  <div>
 *    /...author img /
 *    <div>
 *      /...comment data and interactions /
 *    </div>
 *  </div>
 * )
 * 
 */
const Comment = ({ user, comment, onDeleteComment }) => {
  const [isOwner] = useState(comment.author.userId === user.userId);
  
  return (
    <div key={comment?.commentId} className="w-[90%] h-fit flex rounded-2xl p-2 my-2">
      <Image src="/profile_pic.jpg" alt="profile" />
      <div className="w-[80%] h-fit p-2 flex flex-wrap items-center z-10 relative before:content-[''] before:w-full before:h-full before:bg-white before:block before:top-0 before:left-0 before:-z-10 before:absolute before:opacity-30 before:rounded-2xl before:border-2 before:border-black">
        <h2 className="text-xl w-full">{comment?.author.userName}</h2>
        <p className="w-full">{comment?.body}</p>
        <h4 className="text-xs w-1/2">{formatTime(comment?.createdAt)}</h4>
        {comment?.author.userId === user?.userId && (
          <div className="w-1/2 flex justify-end text-xl">
            <FontAwesomeIcon
              onClick={() => onDeleteComment(comment?.commentId, comment?.postId)}
              icon="trash-alt"
              className="text-white mx-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * @typedef CommentProps
 * @property {Object} user
 * @property {Object} comment
 * @property {Function} onDeleteComment
 */
Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default Comment;
