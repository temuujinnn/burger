import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-ebaf4-default-rtdb.firebaseio.com/",
});

export default instance;
