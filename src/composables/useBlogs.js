import useZiggy from "@/composables/useZiggy";
import axios from "@/libs/axios";
import {ref} from "vue";
import {defaultPagination} from "@/constants/pagination";
import {useToast} from "vue-toastification";

const {vRoute} = useZiggy();
const toast = useToast();

export default function useBlogs() {
  const loading = ref(false);
  const blogs = ref([]);
  const serverItemsLength = ref(0);
  const serverOptions = ref(defaultPagination);
  const headers = [
    {text: "Title", value: "title"},
    {text: "Body", value: "body"},
    {text: "Actions", value: "operation"},
  ];

  async function index() {
    try {
      loading.value = true;
      const {
        data: {
          data: {data: serverCurrentPageItems, total: serverTotalItemsLength},
        },
      } = await axios.get(vRoute("blogs.index"), {params: serverOptions.value});

      blogs.value = serverCurrentPageItems;
      serverItemsLength.value = serverTotalItemsLength;
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  function getBlogById(id) {
    alert("id");
    alert(id);
    //
  }

  async function deleteBlog(blog) {
    try {
      await axios.delete(vRoute("blogs.destroy", {blog: blog.id}));
      await index();
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  return {
    serverItemsLength,
    serverOptions,
    headers,
    blogs,
    loading,
    index,
    getBlogById,
    deleteBlog,
  };
}
