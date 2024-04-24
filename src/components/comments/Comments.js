import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import Comment from "./Comment"
import useNode from '../hooks/useNode';

const commentList = {
    id: 1,
    items: [

    ]
}
function Comments(props) {

    const postID = props.postID;
    console.log("postID", postID)
    const [commData, setCommData] = useState([]);
    const [commentsData, setCommentsData] = useState(commentList);



    const { data } = useQuery(gql`
  query GetComments($details: getComment!) {
    getComments(details: $details) {
      commentID
      commentText
      postedBy
      repliedTo
    }
  }
`, {



        onCompleted: (data) => {
            console.log("hii data", data.getComments)
            data.getComments.forEach(element => {

                setCommData(prevCommData => [...prevCommData, element])
                console.log(element)

            });

        },
        variables: { details: { "postID": props.postID } }
        ,
        onError: (error) => {
            console.error('Error signing up:', error.message);

        }
    });
    useEffect(() => {
        console.log("Hii comment", commData)
    }, [commData])



    const addCommentMutation = gql`
  mutation PostComment($details: PostCommentRequest!) {
    postComment(details: $details)
  }
  `
    const [addComments] =
        useMutation(addCommentMutation, {
            onCompleted: (data) => {
                console.log(data, "Success")

            },
            onError: (error) => {
                console.error('Error signing up:', error.message);
            }
        })

    const deleteCommentMutation = gql`
      mutation DeleteComment($commentId: ID!) {
        deleteComment(commentID: $commentId)
      }
      `
    const [deleteComments] =
        useMutation(deleteCommentMutation, {
            onCompleted: (data) => {
                console.log(data, "Success")

            },
            onError: (error) => {
                console.error('Error signing up:', error.message);

            }
        })

    const [getComments] = useLazyQuery(gql`
  query GetComments($details: getComment!) {
    getComments(details: $details) {
      commentID
      commentText
      postedBy
      repliedTo
    }
  }
`, {
        onCompleted: (data) => {
            console.log(data)
            //setCommentList(data)
        },
        //variables: {"postID":props.postID}

        onError: (error) => {
            console.error('Error signing up:', error.message);
        }
    });

    useEffect(() => {
        if (data)
            getComments({
                variables: {
                    details: {
                        "postID": props.postID
                    }
                }
            })
    }, [data]);

    const { insertNode, editNode, deleteNode } = useNode();
    const handleInsertNode = (folderId, item) => {
        const finalStructure = insertNode(commentsData, folderId, item);
        console.log("helllo comm list", item)
        setCommentsData(finalStructure);
    };
    useEffect(() => {
        console.log("kakka", commentsData)
    }, [insertNode])

    const handleEditNode = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
    };

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure };
        setCommentsData(temp);
    };

    return (
        <div className="App">
            {commData.map((comment) => {
                return (
                    <Comment
                        key={comment.commentID}
                        handleInsertNode={handleInsertNode}
                        handleEditNode={handleEditNode}
                        handleDeleteNode={handleDeleteNode}
                        comment={comment}
                    />
                );
            })}
        </div>
    )
}
export default Comments;