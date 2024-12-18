export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mangameter.littlebutenough.com/api';

export const API_ENDPOINTS = {
  GET_MANGA: '/manga/get',
  GET_AVERAGE_MANGA_RATING: '/manga/ratings/get',
  GET_USER_MANGA_RATING: '/user/ratings/manga/get',
  POST_USER_RATING: '/manga/ratings/add',
  GET_MANGA_GENRE: '/genres/ratings/get',
  GET_USER_FAVORITE_MANGA: '/user/favorites/get',
  GET_USER_MANGA_FAVORITE_STATUS: '/user/favorites/manga/get',
  POST_USER_MANGA_FAVORITE: '/user/favorites/manga/add',
  DELETE_USER_MANGA_FAVORITE: '/user/favorites/manga/delete',
  GET_GENRE: '/genres/get',
  GET_COVER_ART:'/manga/art/get',
  GET_MANGA_SUGGESTION:'/manga/suggestion/get',
  GET_MANGA_GENRE_RATING:'/genres/ratings/get'

};

