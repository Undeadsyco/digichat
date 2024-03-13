import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CommentView from '../../comments/commentView/comments'
import EditPostForm from '../../forms/editPostForm/editPostForm'
import './mainPost.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faUsers, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Post = (props) => {
  let { post, onUpdateVotes, isLoggedIn, loggedInUser, onDeletePost, onGetProfile, onAddFriend } = props
  let [commentList, setList] = useState([])
  let [commentView, setView] = useState(false)
  let [editModal, setEditModal] = useState(false)
  let [likes, setLikes] = useState(0)
  let [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    setLikes(post.likes)
    setDislikes(post.dislikes)
    setList(post.comments)
  }, [post])

  library.add(faUser,faUsers, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div className='main-post-wrapper'>
      <div className='post-detail'>
        <div className='userName'>
          <div className="user-profile">
            <h3>{post.author.userName}</h3>
          </div>
          <div className='control-group'>
            <div className="svg-icons">
              <Link onClick={() => onGetProfile(post.author.id)} to={`/profile`}>
                <FontAwesomeIcon className="user-icon" icon="user" />
              </Link>
            </div>
            <div className="svg-icons">
              <FontAwesomeIcon 
                onClick={() => isLoggedIn?onAddFriend({recieverId:post.author.id}):alert("Must Be Logged In To Add Friends")} 
                className="user-plus-icon" icon="user-plus" 
              />
            </div>
            <div className="svg-icons">
              {isLoggedIn && post.author.id === loggedInUser.id ? <FontAwesomeIcon icon="edit" onClick={() => setEditModal(true)} /> : null} 
            </div>
            <div className="svg-icons">
              {(isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.id === loggedInUser.id) ? <FontAwesomeIcon className="trash-icon" icon="trash-alt" onClick={() => onDeletePost(post.id)} /> : null}
            </div>
          </div>
        </div>

        <div className='post-body-wrapper'>
          <div className="post-body" >
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
          <div style={editModal ? {display: 'block'} : {display: 'none'}}>
            <EditPostForm {...props} setEditModal={setEditModal} post={post} />
          </div>
          {/* <div>
            {isLoggedIn && post.author.id === loggedInUser.id ? <p>Private: {post.isHidden === 0 ? 'false' : 'true'}</p> : null}
          </div> */}
        </div>

        <div className='post-vote'>
          <div className="votes">
            <div className="thumbs-up">
              <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateVotes('likes', likes, post.id)} /> <span>{likes}</span>
            </div>
            <div className="thumbs-down">
              <FontAwesomeIcon className="thumbs-down-icon" icon="thumbs-down" onClick={() => onUpdateVotes('dislikes', dislikes, post.id)} /> 
              <div className="vote-count">{dislikes}</div>
            </div>
          </div>
            
          <div>
            <FontAwesomeIcon className="main-post-comment-icon" icon="comment-dots" onClick={() => setView(!commentView)} /> {commentList.length}
          </div>
        </div>
        <CommentView {...props} commentView={commentView} postId={post.id} postAuthor={post.authorId} commentList={commentList} />
      </div>
    </div>
  )
}

export default Post