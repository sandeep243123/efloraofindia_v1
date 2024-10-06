import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import CommentsSection from "./CommentsSection";
import style from './Comment.module.css';
import { AuthContext } from '../../services/AuthContext.js';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Comments(props) {
  const postID = props.postID;
  console.log("postID", postID);

  const [input, setInput] = useState("");

  const { logout } = useContext(AuthContext);

  const [commentList, setCommentList] = useState(null);

  const notifyError = (msg) => {
    toast.error( `${msg}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      containerId: 'Error'
    });
  };

  const { data } = useQuery(gql`
    query GetComments($details: getComment!) {
      getComments(details: $details) {
        commentID
        commentText
        postedBy
        repliedTo
        upvotes
        downvotes
        userAction
      }
    }
  `, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("Comment", data);
      setCommentList(data["getComments"]);
    },
    variables: { details: { "postID": props.postID } },
    onError: (error) => {
      console.error('Error:', error.message);
      if (error.graphQLErrors[0].code === 601) {
        notifyError(error.message);
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  });

  const addCommentMutation = gql`
    mutation PostComment($details: PostCommentRequest!) {
      postComment(details: $details)
    }
  `;
  const [addComments] = useMutation(addCommentMutation, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setInput("");
      getComments({
        variables: {
          details: {
            "postID": props.postID
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error:', error.message);
      if (error.graphQLErrors[0].code === 601) {
        notifyError(error.message);
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  });

  const deleteCommentMutation = gql`
    mutation DeleteComment($commentId: MongoID!) {
      deleteComment(commentID: $commentId)
    }
  `;
  const [deleteComments] = useMutation(deleteCommentMutation, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log(data, "Success");
      getComments({
        variables: {
          details: {
            "postID": props.postID
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error:', error.message);
      if (error.graphQLErrors[0].code === 601) {
        notifyError(error.message);
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  });

  const updateVotemutation = gql`
    mutation UpdateVote($details: updateVoteDetail!) {
      updateVote(details: $details)
    }
  `;
  const [updatevotes] = useMutation(updateVotemutation, {
    errorPolicy: "all",
    onCompleted: (data) => {
      getComments({
        variables: {
          details: {
            "postID": props.postID
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error:', error.message);
      if (error.graphQLErrors[0].code === 601) {
        notifyError(error.message);
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  });
  const [getComments] = useLazyQuery(gql`
    query GetComments($details: getComment!) {
      getComments(details: $details) {
        commentID
        commentText
        postedBy
        repliedTo
        upvotes
        downvotes
        userAction
      }
    }
  `, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("commentlist", data);
      setCommentList(data["getComments"]);
    },
    onError: (error) => {
      console.error('Error:', error.message);
      if (error.graphQLErrors[0].code === 601) {
        notifyError(error.message);
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  });

  useEffect(() => {
    if (data) {
      getComments({
        variables: {
          details: {
            "postID": props.postID
          }
        }
      });
    }
  }, [data]);

  const handleInsertNode = (folderId, item) => {
    if (folderId === "") {
      addComments({ variables: { details: { "postID": postID, "commentText": item } } });
    } else {
      addComments({ variables: { details: { "postID": postID, "commentText": item, "repliedTo": folderId } } });
    }
  };

  const handleDeleteNode = (folderId) => {
    console.log("delete the node", folderId);
    deleteComments({ variables: { "commentId": folderId } });
  };

  const handlevote = (commentid, action) => {
    console.log("handle vote: ", action, " ", commentid);
    updatevotes({
      variables: {
        details: {
          "action": action,
          "commentID": commentid
        }
      }
    });
  };

  return (
    <div>
      <div className={style.commBox}>
        <CommentsSection
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handlevote={handlevote}
          commentList={commentList}
        />
      </div>
      <div className={style.inputContainer} style={{ display: 'flex', marginTop: '5px' }}>
        <input
          type="text"
          className={`${style.inputContainer__input} ${style.first_input}`}
          style={{ marginLeft: "1rem" }}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply message here..."
        />
        <div
          className={`${style.reply} ${style.comment} ${input ? style.activeButton : style.inactiveButton}`}
          onClick={() => handleInsertNode("", input)}
          style={{ marginLeft: "2rem", pointerEvents: input ? 'auto' : 'none' }}
        >
          COMMENT
        </div>
      </div>

      <ToastContainer containerId="Error" />
    </div>
  );
}

export default Comments;