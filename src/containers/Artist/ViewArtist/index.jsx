import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '$components/common/Button';
import Social from '$components/common/Social';
import AlbumMenuPanel from '$components/common/AlbumMenuPanel';

import './index.scss';

const shareIcon = require('$assets/images/icons/share.svg');
const favoriteIcon = require('$assets/images/icons/favorite.svg');

// samples
const sampleCover = require('$assets/images/sample-cover.jpg');
const sampleAvatar = require('$assets/images/sample-artist.jpg');

const Cover = styled.div`
  background-image: url(${props => props.source});
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
`;

const Avatar = styled.div`
  background-image: url(${props => props.source});
  height: 110px;
  width: 110px;
  border-radius: 50%;
`;

const ViewArtist = () => {
  // effects
  useEffect(() => {
  }, []);

  // handler
  const handlePlay = () => {
    console.log("Play");
  }

  const handleShare = () => {
  }

  const handleFavorite = () => {
  }

  // render
  return (
    <div className="artist-view-container page-container">
      <div className="artist-cover-wrapper">
        <Cover source={sampleCover} />
        <div className="d-flex artist-header-wrapper">
          <div className="d-flex artist-header-infopane">
            <Avatar source={sampleAvatar} />
            <div className="ml-4 mt-2">
              <p className="artist-title mt-2">Artist Name</p>
              <span className="artist-subtitle pb-2">About</span>
            </div>
          </div>
          <div className="d-flex artist-header-actionpane">
            <Button onClick={handlePlay}>Play</Button>
            <Button
              onClick={handleFavorite}
              isTransparent
              noBorder
            >
              <img src={favoriteIcon} className="artist-action-icon" />
            </Button>
            <Button
              onClick={handleShare}
              isTransparent
              noBorder
            >
              <img src={shareIcon} className="artist-action-icon" />
            </Button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8">
            <div className="artist-overview-content">
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, </p>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, </p>
            </div>
            <Social links={{}}/>
            <AlbumMenuPanel
              showHeader
              title="Albums"
            />
            <AlbumMenuPanel
              showHeader
              title="Similar Artists"
              isRounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewArtist;
