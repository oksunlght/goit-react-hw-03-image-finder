import React, { Component } from 'react';
import { fetchImages } from 'utils/fetch-api';
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { searchInput, page, perPage, onImagesFetch, onLoadMore } =
      this.props;

    if (prevProps.searchInput !== searchInput) {
      fetchImages(searchInput, page, perPage)
        .then(({ hits, totalHits }) => {
          onImagesFetch(hits, totalHits);
        })
        .catch(error => console.log(error));
    }

    if (prevProps.page !== page && prevProps.searchInput === searchInput) {
      onLoadMore();
    }
  }

  render() {
    return this.props.searchInput !== '' ? (
      <GalleryList>{this.props.children}</GalleryList>
    ) : (
      <></>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchInput: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onImagesFetch: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
