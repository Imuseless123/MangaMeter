export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mangameter.littlebutenough.com/api';

export const API_ENDPOINTS = {
  GET_MANGA: '/manga/get',
  GET_AVERAGE_MANGA_RATING: '/manga/ratings/get',
  GET_USER_MANGA_RATING: '/user/ratings/manga/get',
  POST_USER_RATING: '/manga/ratings/add',
  GET_MANGA_GENRE: '/genres/ratings/get',
  GET_USER_FAVORITE_MANGA: '/user/favorites/get'
};

