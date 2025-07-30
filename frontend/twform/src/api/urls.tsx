const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Auth endpoints
export const LOGIN_URL = `${BASE_URL}login/`;
export const REGISTER_URL = `${BASE_URL}register/`;
export const LOGOUT_URL = `${BASE_URL}logout/`;
export const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;

// Course endpoints
export const COURSES_URL = `${BASE_URL}courses/`;

// Form endpoints
export const FORMTYPES_URL = `${BASE_URL}formtypes/`;

// Announcement endpoints
export const ANNOUNCEMENTS_URL = `${BASE_URL}announcements/add_announcements/`;
export const GET_ANNOUNCEMENTS_URL = `${BASE_URL}announcements/get_announcements/`;
export const DELETE_ANNOUNCEMENT_URL = (id: number) =>
  `${BASE_URL}announcements/del_announcements/${id}/`;

// Activity endpoints
export const ACTIVITIES_URL = `${BASE_URL}activities/add_activities/`;
export const GET_ACTIVITIES_URL = `${BASE_URL}activities/get_activities/`;
export const DELETE_ACTIVITY_URL = (id: number) =>
  `${BASE_URL}activities/del_activities/${id}/`;

// College endpoints
export const GET_COLLEGES_URL = `${BASE_URL}get_colleges/`;

// Article endpoints
export const SUBMIT_ARTICLE = `${BASE_URL}articles/submitArticle/`;
export const GET_ARTICLES = `${BASE_URL}articles/articles/`;
export const UPDATE_ARTICLE_STATUS = (id: number) =>
  `${BASE_URL}articles/articles/${id}/status/`;
export const GET_ARTICLE_DETAILS = (id: number) =>
  `${BASE_URL}articles/articles/${id}/`;
export const GET_APPROVED_ARTICLES = `${BASE_URL}articles/articles/approved`;
export const GET_RELATED_ARTICLES = (id: number) =>
  `${BASE_URL}articles/articles/${id}/related/`;

// UserType endpoints
export const GET_USERTYPES = `${BASE_URL}accounts/get_userTypes/`;
