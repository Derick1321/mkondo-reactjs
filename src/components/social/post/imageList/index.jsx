import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMediaUrl } from '../../../../common/utils';
import styles from './index.module.scss';
import { PropTypes } from 'prop-types';
import { ImageListImage } from './image';

const ImageListPost = (props) => {
    //props
    const { post } = props;
    const { content, images } = post;
    useEffect(() => {
        console.log(images);
    }, [])
    return (
        <div className={`${styles.wrapper}`}>
            <div className={`d-flex align-items-center`}>
                <img className={`${styles.userAvatar}`} src={require("$assets/images/album-sample.png")} alt="" />
                <div className={`ml-3`}>
                    <div className="d-flex align-content-center">
                        <h4 className={`m-0 text-light`}>Jack Carter</h4>
                        <span className="m-0 ml-2">Shared Post</span>
                    </div>
                    <span>Published: Sep, 15 2020</span>
                </div>
            </div>
            <div className="my-3">
                {content}
            </div>
            {images && images.map((item, key) => <ImageListImage key={key} item={item} url={item.url} caption={item.caption} />)}
        </div>
    )
}

ImageListPost.defaultProps = {
    post: null,
};
  
ImageListPost.propTypes = {
    post: PropTypes.string.required,
};

export default ImageListPost;