import useZiggy from "@/composables/useZiggy";
import axios from "@/libs/axios";
import {ref} from "vue";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";

const {vRoute} = useZiggy();
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

export default function useBlogs() {
  const loading = ref(false);

  async function login(form) {
    try {
      loading.value = true;
      const {data} = await axios.post(vRoute("login"), form);

      userStore.setUser(data.user, data.access_token);
      userStore.isloggedIn = true;
      router.push({name: "dashboard"});
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  return {
    login,
    loading,
  };
}
