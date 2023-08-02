import React from 'react';
import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  onClick,
  onOpenModal,
  largeImageURL,
}) => (
  <Item>
    <ItemImage
      src={webformatURL}
      alt={tags}
      onClick={() => {
        onOpenModal();
        onClick(largeImageURL);
      }}
    />
  </Item>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
