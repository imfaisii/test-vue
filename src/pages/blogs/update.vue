<script setup>
import BlogCreate from "@/pages/blogs/create.vue";
import useBlogs from "@/composables/useBlogs";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const router = useRouter();
const blog = ref(undefined);
const {loading, show} = useBlogs();

const showBlog = async () => {
  loading.value = true;
  try {
    const {data} = await show(route.params.id);
    blog.value = data;
    loading.value = true;
  } catch (e) {
    router.push({name: "blogs.create"});
  }
};

onMounted(() => showBlog());
</script>

<template>
  <blog-create v-if="blog" :blog="blog"></blog-create>
  <div v-else>
    <v-btn type="submit" color="primary" :loading="true" :disabled="true">
      <span>Fetching...</span>
    </v-btn>
  </div>
</template>
