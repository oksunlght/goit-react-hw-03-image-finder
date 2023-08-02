import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';
import {
  SearchbarHeader,
  SearchForm,
  FormButton,
  FormButtonLabel,
  Input,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchInput: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchInput } = this.state;

    if (searchInput.trim() === '') {
      return;
    }

    this.props.onSubmit(searchInput);
    this.setState({ searchInput: '' });
  };

  handleChange = e => {
    this.setState({ searchInput: e.currentTarget.value });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { searchInput } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <FormButton type="submit">
            <CiSearch />
            <FormButtonLabel>Search</FormButtonLabel>
          </FormButton>

          <Input
            type="text"
            name="searchInput"
            value={searchInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
