import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getDescPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`);
  return await response.json();
};
export const getAscPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts?_sort=createdAt`);
  return await response.json();
};

export const getPost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts?id=${id}`);
  return await response.json();
};

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return await response.json();
};
export const register = async (username, nickname, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      nickname,
      password,
    }),
  });
  return await response.json();
};
export const getMe = async () => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const addPost = async (title, body) => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  return await response.json();
};
