import React from 'react';
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

const ImageGallery = ({ searchInput, children }) =>
  searchInput !== '' ? <GalleryList>{children}</GalleryList> : <></>;

export default ImageGallery;

ImageGallery.propTypes = {
  searchInput: PropTypes.string.isRequired,
};
