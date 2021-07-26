import React from 'react'
import Player from '../../../common/Player';
import { SocialMediaAudioPlayer } from '../../audioPlayer';
import styles from './index.module.scss';

export const FeaturedAudioPost = () => {
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatibus ducimus, ratione facere dolores cum velit vel soluta voluptatum voluptate. Eligendi, atque velit incidunt rerum soluta ducimus doloremque odit iste.
            </div>
            {/* <SocialMediaAudioPlayer /> */}
            <Player />
        </div>
    )
}
