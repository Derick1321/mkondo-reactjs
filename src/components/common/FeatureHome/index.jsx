import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, generatePath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ActionHeader from '$components/media/ActionHeader';
import PlayBtn from '$components/media/PlayBtn';
import { addLikes, removeLikes } from '$redux/features/user';

import { handleFetch } from '$common/requestUtils';
import { routePaths } from '$common/routeConfig';

import { loadMedia } from '$redux/features/player';

import styles from './index.module.scss';
import { updatePlaylist } from '../../../redux/features/player';
import { checkSubscriptionStatus, getRecommended, getSimilar, getSimilarRecommended, checkSubscriptionStatusApiRequest } from '../../../redux/features/media';
import { routePaths } from '../../../common/routeConfig';
import { showModal } from '$redux/features/modal';
import Row from '../../media/PlaylistRow/index';
import RowPro from '../../media/PlaylistRowPro';
import ArtistAvatarComponent from '../artist/avatar';

const defaultAvatar = require('$assets/images/profile-user.svg');
const icon_like = require('$assets/images/icons/like.svg');
const icon_like_full = require('$assets/images/icons/like-full.svg');
const icon_comment = require('$assets/images/icons/comment.svg');
const icon_premium = require('$assets/images/icons/premium.svg');
const icon_theatre = require('$assets/images/icons/theatre.svg');

const commonStyle = `
  background-repeat: no-repeat;
  background-position: center;
`;

const FeatureBkg = styled.div`
  ${commonStyle}
  flex-grow: 6;
  position: relative;
  min-height: 100px;
  width: 100%;
  margin: auto;
  background-size: cover;
  background-image: url(${props => props.source}); 
  background-repeat-y: repeat;
  // mix-blend-mode: multiply;
`;

const PlayButton = styled.div`
  background-color: transparent;
  border: none;
  &:focus {
      outline: 0;
  }
  position: absolute;
  ${props => props.category == 'audio' && `
    right: 5px;
    bottom: 5px;
  `}
  ${props => ['video', 'movie', 'episode'].includes(props.category) && `
    left: 50%;
    margin-left: -20px;
    top: 50%;
    margin-top: -20px;
  `}
`;

const FeatureAvatar = styled.div`
  ${commonStyle}
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-right: 10px;
  background-size: cover;
  background-image: url(${props => props.avatar}); 
`;

const FeatureHome = (props) => {
  // props
  const {
    showHeader,
    notifyPlayed,
    media,
    disablePlayBtn,
    type,
  } = props;

  //hooks
  const { push } = useHistory();

  //state
  const [hovered, setHovered] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);

  // store
  const userToken = useSelector((store) => store.authentication.token);
  const user = useSelector((store) => store.authentication.user);
  const visitorToken = useSelector((store) => store.authentication.visitorToken);
  const currentMediaId = useSelector((store) => store.player.currentMediaId);
  const isLoading = useSelector((store) => store.player.isLoading);
  const isPlaying = useSelector((store) => store.player.isPlaying);
  const state = useSelector(state => state);
  const likes_s = useSelector((store) => store.authentication.user.likes);
  const recommended = useSelector((store) => store.media.similarRecommendedMedia.media);

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  // const source = useSelector((store) => store.authentication.user.avatar_url);

  const dispatch = useDispatch();
  const history = useHistory();

  const token = userToken || visitorToken;

  // state
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // ref
  const isMounted = useRef(false);

  // effects
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    handleFetch('GET', `media/presigned-get-url?file_name=${media.cover_url_compressed ?? media.cover_url}`, null, token)
      .then((res) => {
        // if (!isMounted.current) {
        //   return;
        // }
        setAvatarUrl(res.response);
      });
  }, [token, media]);

  // effects
  useEffect(() => {
    if (media && media.likes && typeof media.likes.some == 'function' && media.likes.some((like) => like.user_id == user.user_id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [media]);

  // useEffect(() => {
  //   if (!media) return;
  //   setIsCheckingSubscription(true);
  //   checkSubscriptionStatusApiRequest(media.media_id, state)
  //     .then(res => {
  //       // console.log("Success Response", res);
  //       setSubscriptionStatus(res);
  //       setIsCheckingSubscription(false);
  //     })
  //     .catch(error => {
  //       // console.log("Error Response", error);
  //       setSubscriptionStatus(JSON.parse(error))
  //       setIsCheckingSubscription(false);
  //     });
  // }, [media]);

  // useEffect(() => {
  //   // debuging
  //   let flag = isLoading && currentMediaId === media.media_id || isCheckingSubscription;
  //   console.log("IS LOADING", flag);
  //   console.debug({
  //     "isLoading": isLoading,
  //     "currentMediaId": currentMediaId,
  //     "media.media_id": media.media_id,
  //     "isCheckingSubscription": isCheckingSubscription,
  //     "condition": "isLoading && currentMediaId === media.media_id || isCheckingSubscription",
  //   });
  // }, [isLoading, currentMediaId, media, isCheckingSubscription]);

  // handlers
  const handlePlay = async (open=false) => {
    if (!userToken) {
      dispatch(showModal('ALERT_MODAL', {
        media: media,
      }));
      return;
    }
    
    // if (!subscriptionStatus) {
    //   setIsCheckingSubscription(true);
    //   try {
    //     const res = await checkSubscriptionStatusApiRequest(media.media_id, state);
    //     // console.log("Checking Subscription", res);
    //     setSubscriptionStatus(res);
    //   } catch (e) {
    //     const jsonRes = JSON.parse(e);
    //     setSubscriptionStatus(jsonRes);
    //   }
    //   setIsCheckingSubscription(false);
    // }

    // if (!subscriptionStatus.subscribed) {
    //   dispatch(showModal('ALERT_MODAL', {
    //     media: media,
    //     message: subscriptionStatus.message
    //   }));
    //   return;
    // }

    if (notifyPlayed != null) {
      notifyPlayed(key);
    }

    console.log(media);
    let condition = media.category !== 'audio' || open
    if (condition) {
      console.log("passed", condition)
      handleView();
      return;
    }
    
    dispatch(loadMedia({
      mediaId: media.media_id,
      url: media.media_url_compressed ?? media.media_url,
      howl: null,
      avatar: avatarUrl,
      name: media.name,
      artistName: media.owner_name,
      artistId: media.owner_id
    }));
  }

  const handleView = () => {
    console.log("handle view triggered", media)
    if (media.category == 'movie' || media.category == 'episode') {
      let url = generatePath(routePaths.describeMedia, { id: media.media_id });
      console.log("path", url);
      history.push(url);
      return;
    }
    history.push(generatePath(routePaths.viewMedia, { id: media.media_id }));
  }

  const handleArtistView = () => {
    history.push(generatePath(routePaths.viewArtist, { id: media.owner_id }));
  }

  // Likes
  const handleLikes = () => {
    const data = {
      media_id: media.media_id,
    };

    if (!isLiked) {
      dispatch(addLikes(data));
    } else {
      dispatch(removeLikes(data));
    }
    setIsLiked(!isLiked);
  }


  // render
  if (type == "row") {
    return (
      <div className={styles.rowBg}>
        <RowPro
          name={media.title}
          avatarUrl={media.cover_url}
          artistName={media.owner_name}
          mediaId={media.media_id}
          mediaUrl={media.media_url}

          onPlay={() => handlePlay()}
        />
      </div>
    );
  }

  if (media && media.category == "audio") {
    return (
    <>
      <div className={styles.f_featureWrapper} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <FeatureBkg source={avatarUrl}>
        {
          showHeader && (
            <div className={`${styles.content} ${(hovered || ((media.media_id == currentMediaId) && isPlaying)) && styles.active}`}>
              <div className={`d-flex align-items-center justify-content-between text-light ${styles.f_featureHeaderWrapper}`}>
                <div className={`ml-3 ${styles.views}`}>{media.plays} views</div>
                <div className={`ml-2 ${styles.no_of_likes}`}>{media.likes ? media.likes.length : 0} Likes</div>
                <ActionHeader
                  mediaId={media.media_id}
                  country={media.country}
                  title={media.name}
                  avatarUrl={avatarUrl}
                  showPlaylist
                />
              </div>

              <div className='d-flex mx-2 mt-4'>
                {media.premium && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_premium} height="10px" width="10px" /> PREMIUM</div>}
                {media.theatre && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_theatre} height="10px" width="10px" /> THEATRE</div>}
              </div>
              <div className={`${styles.likeandcomment}`}>
                <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
              </div>
              <PlayButton
                category={media.category}
                onClick={() => handlePlay()} >
                <PlayBtn
                  size={"30"}
                  isLoading={(isLoading && currentMediaId === media.media_id) || isCheckingSubscription}
                  isPlaying={isPlaying && currentMediaId === media.media_id}
                />
              </PlayButton>
            </div>
          )
        }
        </FeatureBkg>
      </div>

      {/* <div className={`d-flex w-100 px-3`}>
          <div className={styles.f_hoverCursor} onClick={handleArtistView}>
            {owner_name}
          </div>
        </div> */}

      
          
          <div className="d-flex mt-2">
            <div className={`d-flex flex-column ${styles.f_featureSummary}`}>
              <div className={`flex-grow-1`}>
                <div onClick={() => handlePlay(true)} className={styles.title}><b>{media.name}</b></div>
                <div onClick={() => push(generatePath(routePaths.viewArtist, {id: media.owner_id}))} className={styles.f_description}>by {media.owner_name}</div>
              </div>

              {/* <div onClick={handleView} className={`${styles.viewallcomments}`}>View all {comment_num} {t('comments')} </div> */}
            </div>

          </div>
          <div className="d-flex flex-row">
            <span className="ml-auto">
              {/* <div className={`text-white-50 ${styles.f_fontSize10}`}> {plays} {t('plays')} </div> */}
            </span>
            {/* <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
            {/* <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
          </div>
    </>
  )
  }

  if (media && media.category == "video") {
    return (
      <div>
        <div className={styles.f_featureWrapperVideo} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <FeatureBkg source={avatarUrl}>
          {
            showHeader && (
              <div className={`${styles.content} ${hovered && styles.active}`}>
                <div className={`d-flex align-items-center justify-content-between ${styles.f_featureHeaderWrapper}`}>
                  <div className={`ml-3 ${styles.views}`}>{media.plays} views</div>
                  <div className={`ml-2 ${styles.no_of_likes}`}>{media.likes ? media.likes.length : 0} Likes</div>
                  <ActionHeader
                    mediaId={media.media_id}
                    country={media.country}
                    title={media.name}
                    avatarUrl={avatarUrl}
                    showPlaylist
                  />
                </div>
  
                <div className='d-flex mx-2 mt-4'>
                  {media.premium && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_premium} height="10px" width="10px" /> PREMIUM</div>}
                  {media.theatre && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_theatre} height="10px" width="10px" /> THEATRE</div>}
                </div>

                <div className={`${styles.likeandcomment}`}>
                  <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                  <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                </div>
                <PlayButton
                  category={media.category}
                  onClick={() => handlePlay()} >
                  <PlayBtn
                    size={media.category == "audio" ? "30" : "40"}
                    isLoading={(isLoading && currentMediaId === media.media_id) || isCheckingSubscription}
                    isPlaying={isPlaying && currentMediaId === media.media_id}
                  />
                </PlayButton>
              </div>
            )
          }
          </FeatureBkg>
        </div>
  
        {/* <div className={`d-flex w-100 px-3`}>
            <div className={styles.f_hoverCursor} onClick={handleArtistView}>
              {owner_name}
            </div>
          </div> */}
  
        
            
            <div className="d-flex mt-2">
              <div className={`d-flex flex-column ${styles.f_featureSummary}`}>
                <div style={{flex: 1}}>
                  
                  <div className={styles.title}><b>{media.name}</b></div>
                  {/* <div className={styles.f_description}>{description}</div> */}
                </div>
  
                {/* <div onClick={handleView} className={`${styles.viewallcomments}`}>View all {comment_num} {t('comments')} </div> */}
              </div>
  
            </div>
            <div className="d-flex flex-row">
              <span className="ml-auto">
                {/* <div className={`text-white-50 ${styles.f_fontSize10}`}> {plays} {t('plays')} </div> */}
              </span>
              {/* <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
              {/* <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
            </div>
      </div>
    )
  }

  if (media && (media.category == "movie" || media.category == "episode")) {
    return (
      <>
        <div className={styles.f_featureWrapperMovie} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <FeatureBkg source={avatarUrl}>
          {
            showHeader && (
              <div className={`${styles.content} ${hovered && styles.active}`}>
                <div className={`d-flex align-items-center justify-content-between ${styles.f_featureHeaderWrapper}`}>
                  <div className={`ml-3 ${styles.views}`}>{media.plays} views</div>
                  <div className={`ml-2 ${styles.no_of_likes}`}>{media.likes ? media.likes.length : 0} Likes</div>
                  <ActionHeader
                    mediaId={media.media_id}
                    country={media.country}
                    title={media.name}
                    avatarUrl={avatarUrl}
                    showPlaylist
                  />
                </div>

                <div className='d-flex mx-2 mt-4'>
                  {media.premium && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_premium} height="10px" width="10px" /> PREMIUM</div>}
                  {media.theatre && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_theatre} height="10px" width="10px" /> THEATRE</div>}
                </div>

                <div className={`${styles.likeandcomment}`}>
                  <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                  <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                </div>
                {!disablePlayBtn && (
                  <PlayButton
                    category={media.category}
                    onClick={() => handlePlay()} >
                    <PlayBtn
                      size={media.category == "audio" ? "30" : "40"}
                      isLoading={(isLoading && currentMediaId === media.media_id) || isCheckingSubscription}
                      isPlaying={isPlaying && currentMediaId === media.media_id}
                    />
                  </PlayButton>
                )}
              </div>
            )
          }
          </FeatureBkg>
        </div>
  
        {/* <div className={`d-flex w-100 px-3`}>
            <div className={styles.f_hoverCursor} onClick={handleArtistView}>
              {owner_name}
            </div>
          </div> */}
  
        
            
            <div className="d-flex mt-2">
              <div className={`d-flex flex-column ${styles.f_featureSummary}`}>
                <div style={{flex: 1}}>
                  
                  <div className={styles.title}><b>{media.title}</b></div>
                  {/* <div className={styles.f_description}>{description}</div> */}
                </div>
  
                {/* <div onClick={handleView} className={`${styles.viewallcomments}`}>View all {comment_num} {t('comments')} </div> */}
              </div>
  
            </div>
            <div className="d-flex flex-row">
              <span className="ml-auto">
                {/* <div className={`text-white-50 ${styles.f_fontSize10}`}> {plays} {t('plays')} </div> */}
              </span>
              {/* <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
              {/* <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
            </div>
      </>
    )
  }

  if (media) {
    return (
      <>
        <div className={styles.f_featureWrapperVideo}>
          <FeatureBkg source={avatarUrl}>
          {
            showHeader && (
              <>
                <div className={`d-flex align-items-center justify-content-between ${styles.f_featureHeaderWrapper}`}>
                  <div className={`ml-3 ${styles.views}`}>{media.plays} views</div>
                  <div className={`ml-2 ${styles.no_of_likes}`}>{media.likes ? media.likes.length : 0} Likes</div>
                  <ActionHeader
                    mediaId={media.media_id}
                    country={media.country}
                    title={media.media_id}
                    avatarUrl={avatarUrl}
                    showPlaylist
                  />
                </div>

                <div className='d-flex mx-2 mt-4'>
                  {media.premium && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_premium} height="10px" width="10px" /> PREMIUM</div>}
                  {media.theatre && <div className={`px-2 ${styles.f_featureHeaderWrapperTitle}`}><img src={icon_theatre} height="10px" width="10px" /> THEATRE</div>}
                </div>
  
                <div className={`${styles.likeandcomment}`}>
                  <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                  <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor_icon}`} alt="" />
                </div>
                <PlayButton
                  category={media.category}
                  onClick={() => handlePlay()} >
                  <PlayBtn
                    size={media.category == "audio" ? "30" : "40"}
                    isLoading={(isLoading && currentMediaId === media.media_id) || isCheckingSubscription}
                    isPlaying={isPlaying && currentMediaId === media.media_id}
                  />
                </PlayButton>
              </>
            )
          }
          </FeatureBkg>
        </div>
  
        {/* <div className={`d-flex w-100 px-3`}>
            <div className={styles.f_hoverCursor} onClick={handleArtistView}>
              {owner_name}
            </div>
          </div> */}
  
        
            
            <div className="d-flex mt-2">
              <div className={`d-flex flex-column ${styles.f_featureSummary}`}>
                <div style={{flex: 1}}>
                  
                  <div className={styles.title}><b>{media.title}</b></div>
                  {/* <div className={styles.f_description}>{description}</div> */}
                </div>
  
                {/* <div onClick={handleView} className={`${styles.viewallcomments}`}>View all {comment_num} {t('comments')} </div> */}
              </div>
  
            </div>
            <div className="d-flex flex-row">
              <span className="ml-auto">
                {/* <div className={`text-white-50 ${styles.f_fontSize10}`}> {plays} {t('plays')} </div> */}
              </span>
              {/* <img onClick={handleLikes} src={isLiked ? icon_like_full : icon_like} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
              {/* <img onClick={handleView} src={icon_comment} className={`${styles.f_bottom_icon} ${styles.f_hoverCursor}`} alt="" /> */}
            </div>
      </>
    )
  }

  return <div>No Media Found!</div>
}

FeatureHome.defaultProps = {
  showHeader: true,
  disablePlayBtn: false,
  type: "card", //types so far is 'card' and 'row'
}

FeatureHome.propTypes = {
  showHeader: PropTypes.bool,
  notifyPlayed: PropTypes.func,
  media: PropTypes.object.isRequired,
  disablePlayBtn: PropTypes.bool,
  type: PropTypes.string,
}

export default FeatureHome;
