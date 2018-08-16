import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon
} from 'react-share';
import './SharePanel.css';

export const SharePanel = ({ shareUrl, title }) => {
  return (
    <div className="SharePanel">
      <h4>Do you like this post? Share it ;-)</h4>
      <div>
        <FacebookShareButton url={shareUrl} quote={title} className="Demo__some-network__share-button">
          <FacebookIcon size={32} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
          <TwitterIcon size={32} />
        </TwitterShareButton>
        <GooglePlusShareButton url={shareUrl} className="Demo__some-network__share-button">
          <GooglePlusIcon size={32} />
        </GooglePlusShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          windowWidth={750}
          windowHeight={600}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

SharePanel.propTypes = {
  shareUrl: PropTypes.string,
  title: PropTypes.string
};
