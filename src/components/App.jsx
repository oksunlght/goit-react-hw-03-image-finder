import React, { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import { fetchImages } from 'utils/fetch-api';
import Searchbar from './Searchbar';
import ImageGallery from './Gallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import Button from './Button';
import { AppContainer, LoaderWrapper } from './App.styled';

class App extends Component {
  state = {
    searchInput: '',
    images: null,
    modalUrl: '',
    totalHits: 0,
    page: 1,
    perPage: 12,
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevState, prevProps) {
    const { page, searchInput, perPage } = this.state;

    if (prevProps.searchInput !== searchInput) {
      fetchImages(searchInput, page, perPage)
        .then(({ hits, totalHits }) => {
          this.onImagesFetch(hits, totalHits);
        })
        .catch(error => console.log(error));
    }

    if (prevProps.page !== page && prevProps.searchInput === searchInput) {
      this.onLoadMore();
    }
  }

  onSubmit = searchInput => {
    this.setState({
      searchInput,
      images: null,
      totalHits: 0,
      page: 1,
      perPage: 12,
      isLoading: true,
    });
  };

  onImagesFetch = (images, hits) => {
    this.setState({
      images,
      totalHits: hits - images.length,
      isLoading: false,
    });
  };

  onLoadMore = () => {
    const { searchInput, totalHits, page, perPage } = this.state;

    if (totalHits >= 12) {
      this.setState(prevState => ({
        totalHits: prevState.totalHits - 12,
        perPage: prevState.perPage,
      }));
    } else if (totalHits < 12) {
      this.setState(prevState => ({
        totalHits: prevState.totalHits - totalHits,
        perPage: totalHits,
      }));
    } else if (totalHits === 0) {
      this.setState({
        totalHits: 0,
        perPage: 0,
      });
    }

    fetchImages(searchInput, page, perPage)
      .then(({ hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoading: false,
        }));
      })
      .catch(error => console.log(error));
  };

  incrementPage = () =>
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  onModalClose = () => {
    this.setState({ modalUrl: '', showModal: false });
  };

  handleModalUrl = url => {
    this.setState({ modalUrl: url });
  };

  onUpdate = () => {
    this.setState({ showList: true });
  };

  render() {
    const {
      searchInput,
      images,
      modalUrl,
      showModal,

      totalHits,
      isLoading,
    } = this.state;
    const {
      onSubmit,
      onOpenModal,
      incrementPage,
      handleModalUrl,
      onModalClose,
    } = this;

    return (
      <AppContainer>
        <Searchbar onSubmit={onSubmit} />

        <ImageGallery searchInput={searchInput}>
          {images &&
            images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                images={images}
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                onClick={handleModalUrl}
                onOpenModal={onOpenModal}
                largeImageURL={largeImageURL}
              />
            ))}
        </ImageGallery>

        {totalHits > 0 && !isLoading && <Button onClick={incrementPage} />}
        {isLoading && (
          <LoaderWrapper>
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={isLoading}
            />
          </LoaderWrapper>
        )}
        {showModal && <Modal onClose={onModalClose} largeImageURL={modalUrl} />}
      </AppContainer>
    );
  }
}

export default App;
