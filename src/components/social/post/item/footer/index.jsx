import React from 'react'
import { PropTypes } from 'prop-types';
import styles from './index.module.scss';

const PostItemFooter = (props) => {
    //props
    const { post } = props;

    return (
        <div className={styles.wrapper}>
            <div className="d-flex mt-3">
                <div className="mr-3 d-flex align-items-center">
                    <img src={require("$assets/images/icons/like-solid.svg")} alt="" height="20px" />
                    <span className="ml-2">106 likes</span>
                </div>
                <div className="d-flex align-items-center">
                    <img src={require("$assets/images/icons/comment.svg")} alt="" height="20px" />
                    <span className="ml-2">44 comments</span>
                </div>
            </div>
        </div>
    )
}

PostItemFooter.defaultProps = {
    post: {}
}

PostItemFooter.propTypes = {
    post: PropTypes.shape({
        post_id: PropTypes.string.required,
        caption: PropTypes.string,
        content: PropTypes.string,
        description: PropTypes.string,
        featured_image_url: PropTypes.string,
        featured_video_url: PropTypes.string,
        featured_audio_url: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string,
            caption: PropTypes.string,
        })),
        videos: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string,
            caption: PropTypes.string,
        })),
        user: PropTypes.shape({
            full_name: PropTypes.string,
            avatar_url: PropTypes.string,
        }),
        created_at: PropTypes.string,
    }),
}

export default PostItemFooter;