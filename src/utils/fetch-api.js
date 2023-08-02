const API_KEY = '37347285-29ebaeb1886979c1c94a64382';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = (searchInput, page, perPage) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: `${searchInput}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: `${page}`,
    per_page: `${perPage}`,
  });

  const url = `${BASE_URL}?${params}`;
  return fetch(url)
    .then(r => r.json())
    .then(images => {
      return images;
    });
};
