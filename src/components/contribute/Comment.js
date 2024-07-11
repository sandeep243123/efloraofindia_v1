import React, { useState } from 'react';
import style from './comment.module.css'
function Comment({ comments, handleAddComments, handleCommentDelete }) {
    const [showInput, setShowInput] = useState(false);
    const [commentBody, setCommentBody] = useState('');
    const handleAdd = () => {
        let newComments = {
            id: Date.now(),
            text: commentBody,
            replies: [],
        }
        handleAddComments(comments.id, newComments)
        setShowInput(false);
    }
    return (
        <>
            <div className={style.comments}>
                <p className={style.userName}>by harry</p>
                <h3>{comments.text}</h3>
                {showInput && <input type="text" autoFocus onChange={(e) => setCommentBody(e.target.value)} />}
                {showInput ? (
                    <div className={style.commentFooter}>
                        <p onClick={handleAdd}>Add</p>
                        <p onClick={() => setShowInput(false)}>Cancel</p>
                        <p>Like</p>
                        <p style={{ borderRight: 'none' }}>Dislike</p>
                    </div>
                ) : (
                    comments.text ? (
                        <div className={style.commentFooter}>
                            <p onClick={() => setShowInput(true)}>reply</p>
                            <p onClick={() => handleCommentDelete(comments.id)}>delete</p>
                            <p>Like</p>
                            <p style={{ borderRight: 'none' }}>Dislike</p>
                        </div>
                    ) : (null)
                )}

            </div>
            <div className={style.nestedComment}>
                {comments?.replies?.map((ele) => {
                    return <Comment key={ele.id} comments={ele} handleAddComments={handleAddComments} handleCommentDelete={handleCommentDelete}></Comment>
                })}
            </div >
        </>
    )
}

export default Comment
