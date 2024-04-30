import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import style from './Comment.module.css'
import like from '../assets/like.png';
import dislike from '../assets/dont-like.png';
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import Action from "./Action"

const Comment1 = ({
  comment,
  commentList,
  handleInsertNode,
  handleDeleteNode,
  handlevote
}) => {

  const nestedComments = commentList.filter(c => c.repliedTo === comment.commentID);


  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = (commentid) => {

    setExpand(true);
    handleInsertNode(commentid, input);
    setShowInput(false);
    setInput("");

  };


  const handleDelete = (commentid) => {
    console.log("delete id", commentid)
    handleDeleteNode(commentid);
  };

  const vote = (commentid, action) => {
    handlevote(commentid, action);
  }

  return (
    <div>
      <div className={`${style.commentContainer}`}>
        <div className={style.commentBox}>
          <div className={style.userInfo}>
            <img src="" alt="profileImage" className={style.profileImage}></img>
            <p className={style.userName}>{comment.postedBy}</p>
          </div>
          <span
            className={style.text}
            contentEditable={editMode}
            suppressContentEditableWarning={editMode}
            ref={inputRef}
            style={{ wordWrap: "break-word" }}
          >
            {comment.commentText}
          </span>
        </div>
        <div className={style.footer}>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <Action

              className={style.reply}
              type={
                <>
                  {expand ? (
                    <UpArrow width="10px" height="10px" />
                  ) : (
                    <DownArrow width="10px" height="10px" />
                  )}{"  "}
                  REPLY
                </>
              }
              handleClick={handleNewComment}
            />
            <div
              className={style.reply}
              onClick={() => handleDelete(comment.commentID)} style={{ color: 'orange' }}>DELETE</div>

          </div>
          {/* like and dislike button */}

          <div className={style.vote}>
            <div className={comment.userAction === 'likes' ? style.active_upvote : style.upvote}>
              <img src={like} alt="like" name="vote" onClick={() => vote(comment.commentID, "upvote")} />
              <p>{comment.upvotes}</p>
            </div>
            <div className={comment.userAction === 'likes' ? style.active_upvote : style.downvote}>
              <img src={dislike} alt="dislike" name="vote" onClick={() => vote(comment.commentID, "downvote")} />
              <p>{comment.downvotes}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className={style.inputContainer}>
            <input
              type="text"
              className={style.inputContainer__input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <div className={style.reply} onClick={() => onAddComment(comment.commentID, input)}>REPLY</div>
            <div
              className={style.reply}
              onClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}>
              CANCEL
            </div>
          </div>
        )}

        {nestedComments.map(nestedComment => (
          <Comment1
            key={nestedComment.commentID}
            comment={nestedComment}
            commentList={commentList}
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode} />
        ))}
      </div>
    </div>
  );
};

export default Comment1;