import React from 'react'
import styles from './index.module.scss';

export const SocialMediaCreatePost = () => {
    return (
        <div className={`${styles.wrapper} p-5`}>
            <h3 className="mb-4">Create New Post</h3>
            <div className={`${styles.input}`}>
                <img src={require('$assets/images/icons/pen.svg')} alt="" height="20px" />
                <input type="text" className="ml-3" placeholder="Create Post" />
            </div>
        </div>
    )
}
