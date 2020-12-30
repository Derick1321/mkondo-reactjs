import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

import TextArea from '$components/common/TextArea';
import Button from '$components/common/Button';

import { updateShareCount } from '$redux/features/media';

import './index.scss';

const avatarSample = require('$assets/images/album-sample.png');

const Avatar = styled.div`
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;  
`;

const Share = (props) => {
  // props
  const {
    name,
    country,
    link: url,
    avatar,
    initialDescription,
    mediaId,
  } = props;

  // refs
  const linkRef = useRef(null);

  // store
  const dispatch = useDispatch();

  // state
  const [description, setDescription] = useState(initialDescription);
  const [link, setLink] = useState(url);

  // handlers
  const handleChange = (name, value) => {
    if (name === 'description') {
      setDescription(value);
      return;
    }
    
    setLink(value);
  }

  const copyLink = () => {
    linkRef.current.select();
    document.execCommand('copy');
    alert('Copied!');
    handleShare();
  }

  const handleShare = () => {
    dispatch(updateShareCount(mediaId));
  }

  // render
  return (
    <div className="row">
      <div className="col-6 col-sm-2">
        <Avatar url={avatar || avatarSample} />
      </div>
      <div className="col-12 col-sm-5 col-md-6">
        <p className="my-0">{name}</p>
        <p className="share-region-text">{country}</p>
        <p>Description</p>
        <TextArea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={description}
        />
      </div>
      <div className="col-12 col-sm-5 col-md-4">
        <p>Share your Profile</p>
        <div className="d-flex flex-wrap">
          <div className="mr-2">
            <FacebookShareButton url={link} onShareWindowClose={handleShare}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
          <div className="mr-2">
            <WhatsappShareButton url={link} onShareWindowClose={handleShare}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
          <div className="mr-2">
            <EmailShareButton url={link} onShareWindowClose={handleShare}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
          <div className="mr-2">
            <TwitterShareButton url={link} onShareWindowClose={handleShare}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </div>
        <input
          className="text-input-container share-input"
          ref={linkRef}
          onChange={(evt) => handleChange('link', evt.target.value)}
          type="text"
          value={link}
        />
        <Button onClick={copyLink}>
          Copy Link
        </Button>
      </div>
    </div>
  );
}

Share.defaultProps = {
  mediaId: null,
  name: 'Artist Name',
  country: 'Tanzania',
  link: 'https//mkondo.co/app/artist/artist01',
  avatar: null,
  initialDescription: 'I just joined Mkondo visit www.mkondo.co for checking my profile!',
};

Share.propTypes = {
  mediaId: PropTypes.string,
  name: PropTypes.string,
  country: PropTypes.string,
  link: PropTypes.string,
  avatar: PropTypes.string,
  initialDescription: PropTypes.string,
};

export default Share;
