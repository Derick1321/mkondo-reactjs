import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Row from '$components/media/CommentRow';
import Tabs from '$components/common/Tabs';
import Player from '$components/media/IndividualPlayer';
import VideoPlayer from '$components/media/VideoPlayer';

import {
  addComment,
  getComment,
  getRecommended,
  getMedia,
  deleteComment,
} from '$redux/features/media';

import styles from './index.module.scss';
import { addMediaComment, removeCommentLike } from '../../../redux/features/media';
import { COLOR_PRIMARY, COLOR_ACCENT } from '$common/constants'
import { addHistory } from '../../../redux/features/user';

const options = [
  { name: 'comments', title: 'Comments' },
  { name: 'description', title: 'Description' },
];

const field = {
  name: 'comments',
  type: 'area',
  placeholder: 'Comments',
  title: '',
};

const ViewMedia = () => {
  // state
  const [selected, setSelected] = useState(options[0].name);
  const [value, setValue] = useState('');

  // store
  const dispatch = useDispatch();
  const { id: mediaId } = useParams();

  const userId = useSelector((store) => store.authentication.user.user_id);
  const addCommentPending = useSelector((store) => store.media.addCommentPending);
  const addCommentComplete = useSelector((store) => store.media.addCommentComplete);
  const addCommentLikeComplete = useSelector((store) => store.media.addCommentLikeComplete);
  const removeCommentLikeComplete = useSelector((store) => store.media.removeCommentLikeComplete);
  // const deleteCommentPending = useSelector((store) => store.media.deleteCommentPending);
  const deleteCommentComplete = useSelector((store) => store.media.deleteCommentComplete);
  const comments = useSelector((store) => store.media.comments);
  const currentMedia = useSelector((store) => store.media.currentMedia);

  useEffect(() => {
    if (!currentMedia) return;
    dispatch(addHistory({
      media_id: mediaId,
    }));
  }, []);

  // effects
  useEffect(() => {
    if (!mediaId) {
      return;
    }

    dispatch(getMedia(mediaId));
    dispatch(getComment(mediaId));
    dispatch(getRecommended(userId));
  }, [addCommentComplete, deleteCommentComplete, mediaId]);

  useEffect(() => {
    if (!mediaId) return;
    dispatch(getComment(mediaId));
  }, [addCommentLikeComplete, removeCommentLikeComplete])

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleChange = (name, value) => {
    setValue(value);
  }

  const handleAddComment = () => {
    if(value == "") return;
    dispatch(addMediaComment({
      media_id: mediaId,
      user_id: userId,
      value,
    }));
  }

  const handleDeleteComment = (commentId) => {
    if(!confirm("Are you going to delete this item?")) return;
    dispatch(deleteComment(commentId));
  }

  const commentPane = (
    <div className={selected === 'comments' ? '' : 'd-none'}>
        <InputField
            field={{
              ...field,
              value,
            }}
            onChange={handleChange}
          />
          <Button
          onClick={handleAddComment}
          isLoading={addCommentPending}
          isCustom
          hideDefault={false}
          className="btn btn-primary"
        >
          Add
        </Button>
     
        <div className="mt-3">
        {
          comments.map((comment, idx) => (
            <Row
              key={`comment-row-${idx}`}
              name={comment.commenter_name}
              date={comment.modified}
              value={comment.value}
              avatarUrl={comment.avatar_user_url}
              comment_id={comment.comment_id}
              deleteComment={handleDeleteComment}
              no_of_replies={comment.no_of_replies}
              replies={comment.comments ?? []}
              likes={comment.likes || undefined}
            />
          ))
        }
        </div>
    </div>
  );

  const descriptionPane = (
    <div className={selected === 'description' ? '' : 'd-none'}>
      <div className={`${styles.descriptionWrapper} text-light`}>
        {currentMedia.description}
      </div>
    </div>
  );

  // render
  return (
    <div className={styles.container}>
      {
        currentMedia.category === 'audio' ? (
          <Player
            mediaUrl={currentMedia.media_url}
            coverUrl={currentMedia.cover_url}
            avatarUrl={currentMedia.owner_avatar_url}
            title={currentMedia.name}
            artistName={currentMedia.owner_name}
            mediaId={currentMedia.media_id}
          />
        ) : (
          <div className="row">
            <div className="col-lg-9">
              <VideoPlayer
                url={currentMedia.media_url}
              />
            </div>
          </div>
        )
      }
      <div className="row">
        <div className="col-lg-9">
          <Tabs
            options={options}
            onSelect={handleSelect}
            selected={selected}
            name="viewMedia"
            activeColor={ COLOR_ACCENT }
          />
          { commentPane}
          { descriptionPane}
        </div>
        
      </div>
      
    </div>
  );
}

export default ViewMedia;