import useZiggy from "@/composables/useZiggy";
import axios from "@/libs/axios";
import {ref} from "vue";
import {defaultPagination} from "@/constants/pagination";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const {vRoute} = useZiggy();
const toast = useToast();

export default function useBlogs() {
  const imageHeader = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const router = useRouter();
  const loading = ref(false);
  const blogs = ref([]);
  const serverItemsLength = ref(0);
  const serverOptions = ref(defaultPagination);
  const headers = [
    {text: "Title", value: "title"},
    {text: "Body", value: "body"},
    {text: "Total Likes", value: "like_counter"},
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

  async function create(form) {
    try {
      loading.value = true;
      const formData = transFormData(form);

      await axios.post(vRoute("blogs.store"), formData, imageHeader);

      toast.success("Blog was created successully.");
      router.push({name: "dashboard"});
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  async function show(id) {
    try {
      const {data} = await axios.get(vRoute("blogs.show", {blog: id}));

      return data;
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  async function update(id, form) {
    try {
      loading.value = true;
      const formData = transFormData(form);
      formData.append("_method", "PUT");

      await axios.post(
        vRoute("blogs.update", {blog: id}),
        formData,
        imageHeader
      );

      router.push({name: "dashboard"});
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  async function destroy(blog) {
    try {
      loading.value = true;
      await axios.delete(vRoute("blogs.destroy", {blog: blog.id}));
      toast.success("Blog was deleted successully.");
      await index();
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  async function like(blog) {
    try {
      loading.value = true;
      await axios.get(vRoute("blogs.like", {blog: blog.id}));
      await index();
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? e);
    } finally {
      loading.value = false;
    }
  }

  function transFormData(data) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (
        key == "image" &&
        (typeof value === "string" || value instanceof String)
      ) {
        continue;
      }

      formData.append(key, value);
    }

    return formData;
  }

  return {
    serverItemsLength,
    serverOptions,
    headers,
    blogs,
    loading,
    index,
    create,
    update,
    show,
    destroy,
    like,
  };
}
