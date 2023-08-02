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

  onSubmit = searchInput => {
    this.setState({ searchInput, isLoading: true });
    this.resetState();
  };

  onImagesFetch = (images, hits) => {
    this.incrementPage();

    if (hits - images.length < 12) {
      this.incrementPage();

      this.setState({
        images,
        totalHits: hits - images.length,
        perPage: hits - images.length,
        isLoading: false,
      });
    }
    this.setState({
      images,
      totalHits: hits - images.length,
      isLoading: false,
    });
  };

  resetState = () => {
    this.setState({ images: null, totalHits: 0, page: 1, perPage: 12 });
  };

  onLoadMore = () => {
    const { searchInput, totalHits, page, perPage } = this.state;

    this.incrementPage();

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
        }));
      })
      .catch(error => console.log(error));
  };

  incrementPage = () =>
    this.setState(prevState => ({ page: prevState.page + 1 }));

  incrementHits = hits =>
    this.setState(prevState => ({
      totalHits: prevState + hits.length,
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

  render() {
    const {
      searchInput,
      images,
      modalUrl,
      showModal,
      page,
      perPage,
      totalHits,
      isLoading,
    } = this.state;
    const {
      onSubmit,
      onOpenModal,
      onLoadMore,
      onImagesFetch,
      handleModalUrl,
      onModalClose,
    } = this;

    return (
      <AppContainer>
        <Searchbar onSubmit={onSubmit} />
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
        <ImageGallery
          onImagesFetch={onImagesFetch}
          searchInput={searchInput}
          page={page}
          perPage={perPage}
          isLoading={isLoading}
        >
          {images &&
            images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                onClick={handleModalUrl}
                onOpenModal={onOpenModal}
                largeImageURL={largeImageURL}
              />
            ))}
        </ImageGallery>
        {totalHits > 0 && <Button onClick={onLoadMore} />}
        {showModal && <Modal onClose={onModalClose} largeImageURL={modalUrl} />}
      </AppContainer>
    );
  }
}

export default App;
