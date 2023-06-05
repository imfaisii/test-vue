import {useLocalStorage} from "@vueuse/core";
import {defineStore} from "pinia";

const token = useLocalStorage("token");

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(user, token = null) {
      this.user = user;
      this.token = token;
      this.isLoggedIn = true;
      this.setLocalStorage();
    },
    setLocalStorage() {
      token.value = this.token;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      token.value = null;
    },
  },
});
