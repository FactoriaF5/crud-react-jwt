import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = false;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const serviceApi = () => {
  let baseUrl = "127.0.0.1:8080";
  let url = "/products";
  let urlSignin = "/api/register";
  let urlLogin = "/signin";

  const get = async () => {
    const res = await axios.get(url);
    console.log(res);
    return res;
  };

  const create = async (data) => {
    const res = await axios.post(url, data);
    return res;
  };

  const destroy = async (id) => {
    let urlID = `${url}/${id}`;
    const res = await axios.delete(urlID);
    return res;
  };

  const show = async (id) => {
    let urlID = `${url}/${id}`;
    const res = await axios.get(urlID);
    return res;
  };

  const update = async (id, data) => {
    let urlID = `${url}/${id}`;
    const res = await axios.post(urlID, data);
    return res;
  };

  const signin = async (data) => {
    const res = await axios.post(urlSignin, data);
    return res;
  };

  const login = async (data) => {
    const res = await axios.post(urlLogin, data);
    return res;
  };

  const logout = () => {
    //TODO REFACATOR AUTH LOCALSTORAGE  
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_id");
    localStorage.removeItem("auth");

    window.location = "/crud-api-login";
  };

  return {
    get,
    create,
    destroy,
    show,
    update,
    signin,
    login,
    logout,
    url,
    baseUrl,
  };
};
