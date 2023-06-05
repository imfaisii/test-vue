import {useLocalStorage} from "@vueuse/core";
import Axios from "axios";
import {watch} from "vue";

const token = useLocalStorage("token");

const axios = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    Authorization: "Bearer " + token.value,
  },
  withCredentials: true,
});

watch(token, (n, o) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + n;
});

export default axios;
