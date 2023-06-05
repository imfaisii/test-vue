import {useLocalStorage} from "@vueuse/core";
import {defineStore} from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async setUser(user) {
      this.user = user;
      this.isLoggedIn = true;
    },
    async logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
