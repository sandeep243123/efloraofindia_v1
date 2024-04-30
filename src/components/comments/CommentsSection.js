import React from 'react'
import Comment1 from "./Comment1"


const CommentsSection = ({
  commentList,
  handleInsertNode,
  handleDeleteNode,
  handlevote
}) => {
  if (!commentList) {
    return null;
  }
  const rootComments = commentList.filter(comment => !comment.repliedTo);

  return (
    <div>
      {rootComments.map(comment => (
        <Comment1
          key={comment.commentID}
          comment={comment}
          commentList={commentList}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handlevote={handlevote}
        />
      ))}
    </div>
  );
};

export default CommentsSection;