import useZiggy from "@/composables/useZiggy";
import axios from "@/libs/axios";
import {ref} from "vue";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {useLocalStorage} from "@vueuse/core";

export default function useBlogs() {
  const loading = ref(false);
  const router = useRouter();
  const {vRoute} = useZiggy();
  const toast = useToast();
  const userStore = useUserStore();
  const token = useLocalStorage("token");

  async function login(form) {
    try {
      loading.value = true;
      const {data} = await axios.post(vRoute("login"), form);

      await userStore.setUser(data.user);
      token.value = data.access_token;
      router.push({name: "dashboard"});
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  async function register(form) {
    try {
      loading.value = true;
      const {data} = await axios.post(vRoute("register"), form);

      await userStore.setUser(data.user);
      token.value = data.access_token;
      router.push({name: "dashboard"});
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await userStore.logout();
      token.value = null;
      router.push({name: "login"});
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    }
  }

  return {
    login,
    register,
    logout,
    loading,
  };
}
