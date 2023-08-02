import React from 'react';
import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

const Button = ({ onClick }) => (
  <LoadMore type="button" onClick={onClick}>
    Load more
  </LoadMore>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
