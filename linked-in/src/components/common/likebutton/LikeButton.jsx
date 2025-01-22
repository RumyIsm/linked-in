import React, { useMemo, useState, useEffect } from "react";
import { likePost, getLikesByUser, postComment, getComments,updateCommentsWithNewName } from "../../../api/FirestoreAPI";
import {getCurrentTimeStamp} from "../../../helpers/useMoment"
import "./LikeButton.css";
import { LikeOutlined, LikeFilled, CommentOutlined  } from "@ant-design/icons";

export default function LikeButton({ userId, postId,currentUser}) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState (false);
  const [comment, setComment] = useState ("");
  const [comments, setComments] = useState ([]);


  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name,  currentUser?.id);
      setComment("");
}

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  const getComment = (event) => {
    setComment(event.target.value)
  }

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  useEffect(() => {
    getComments(postId, setComments);
  }, [currentUser?.name, postId]);

  useEffect(() => {
    if (currentUser?.name !== currentUser?.previousName) {
      updateCommentsWithNewName(currentUser?.id, currentUser?.name);
    }
  }, [currentUser?.name]);

  return (
    <div className="like-container" >
     <p>{likesCount} Many people likes this post</p>
     <div className="hr-line">
     <hr />
      </div> 
     
<div className="like-comment">
      <div className="likes-comment-inner" onClick={handleLike}>
       {liked ?  (
        <LikeFilled style={{color:" #0a66c2"}}/>
       ) : (
        <LikeOutlined />
       )
         }

       <p className={liked ? "blue" : "black"}>Like</p> 
       </div>


       <div className="likes-comment-inner" onClick={() => setShowCommentBox(!showCommentBox)}>
       <CommentOutlined color = {showCommentBox ?  "#0a66c2" : "#212121"}/> 

       <p className={showCommentBox ? "blue" : "black"}>Comment</p> 
       
       </div>
       </div>

       {showCommentBox ? (
        <>
       <input className="comment-input" 
        placeholder="Add a comment"
        onChange={getComment}
        name="comment"
        value={comment}
       />
       <button onClick={addComment} className="add-comment-btn">Add comment</button>
       {comments.length > 0 ? comments.map((comment)=> {
        return (
          <div className="all-comments" key={comment.id}>
            <div>
            <p className="name">{comment.name}</p>
          <p className="comment">{comment.comment}</p>
          </div>

          <div>
          <p className="timestamp">{comment.timeStamp}</p>
          </div>
         
          
          </div>
        )
       }) : <></>}


       </>
       ):(
        <></>
       )}

    
    </div>
  );
}
