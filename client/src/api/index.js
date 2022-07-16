import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/v1/api",
  // withCredentials: true,
});

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) =>
  API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => {
  // return fetch("http://localhost:5000/v1/api/auth/signin", {
  //   method: "POST",
  //   body: JSON.stringify(formData),
  // });

  return API.post("/auth/signin", formData, {
    // withCredentials: true,
  });
};
export const signUp = (formData) => API.post("/auth/signup", formData);

export const refreshToken = () =>
  API.get("/auth/refresh-token", {
    withCredentials: true,
  });
