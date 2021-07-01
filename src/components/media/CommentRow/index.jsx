import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { handleFetch } from '$common/requestUtils';
import { formatDate } from '$common/utils';

import styles from './index.module.scss';
import { addCommentComment, getCommentReplies, updateCurrentComment } from '../../../redux/features/media';
const icon_delete = require('$assets/images/icons/cancel.svg');

const Avatar = styled.div`
  background-image: url(${props => props.source});
  height: ${props => props.size ?? 60}px;
  width: ${props => props.size ?? 60}px;
  min-width: ${props => props.size ?? 60}px;
  background-size: cover;
  border-radius: 50%;
  background-color: #727C7C;
`;

const CommentRow = (props) => {
  // props
  const {
    name,
    date,
    value,
    avatarUrl,
    deleteComment,
    comment_id,
    no_of_replies,
    replies,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);
  const user_id = useSelector((store) => store.authentication.user.user_id);
  const loading = useSelector((store) => store.media.replyCommentPending);
  const currentComment = useSelector((store) => store.media.currentComment);
  const isFetchingReplies = useSelector((store) => store.media.getCommentRepliesPending);
  const replyCommentComplete = useSelector((store) => store.media.replyCommentComplete);
  
  const dispatch = useDispatch();

  // state
  const [url, setUrl] = useState(null);
  const [isOnReplyView, setisOnReplyView] = useState(false);
  const [comment, setComment] = useState("");


  // effects
  useEffect(async () => {
    if (!avatarUrl) {
      return;
    }
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatarUrl}`, null, token);
    setUrl(res.response);
  }, [avatarUrl]);

  useEffect(() => {
    getCommentReplies(currentComment);
  }, [replyCommentComplete, currentComment])

  const handleSubmitReply = async () => {
    if (!comment) return;
    await dispatch(addCommentComment({
      user_id: user_id,
      comment_id: comment_id,
      value: comment,
    }))
    setComment("");
    //refresh comments
  }

  // render
  return (
    <>
      <div className={styles.row}>
        <div className={`d-flex`}>
          <Avatar
            source={url}
          />
          <div className="d-flex flex-column ml-4">
            <p className={styles.text}>{name} <span className={styles.date}>{formatDate(date)}</span></p>
            <p className={styles.text}>{value}</p>
          </div>
          <div onClick={e => deleteComment(comment_id)} className={styles.deleteStyle}>Delete</div>
        </div>
        <div className="d-flex">
          <div className="">0 Likes</div>
          <div className="ml-3">{no_of_replies ?? 0} Replies</div>
          <div className={`ml-3 ${styles.replyButton}`} onClick={() => {
            if (!isOnReplyView) {
              dispatch(updateCurrentComment(comment_id))
            } else {
              dispatch(updateCurrentComment(null))
            }
            setisOnReplyView(!isOnReplyView)
          }}>Reply</div>
        </div>
      </div>
      {isOnReplyView 
      ? (
        <div className={`ml-5`}>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Reply Comment"
            className={styles.textArea} value={comment}></textarea>
          <button disabled={loading} className={`${styles.buttonAccent} btn`} onClick={handleSubmitReply}>Reply</button>
          {loading ? <small className="text-light ml-2">Submitting Reply</small> : ""}
          <div>
            {replies ? replies.map((comment) => {
              return (
                      <div className={styles.row} key={comment.comment_id}>
                        <div className={`d-flex`}>
                          <div className="d-flex flex-column ml-4">
                            <p className={styles.text}>{comment.commenter_name} <span className={styles.date}>{formatDate(comment.posted)}</span></p>
                            <p className={styles.text}>{comment.value}</p>
                          </div>
                          <div onClick={e => deleteComment(comment.comment_id)} className={styles.deleteStyle}>Delete</div>
                        </div>
                        <div className="d-flex">
                          
                        </div>
                      </div>
                    )
            }) : console.log(replies)}
          </div>
        </div>
      ) : null}
    </>
  );
} 

export default CommentRow;
