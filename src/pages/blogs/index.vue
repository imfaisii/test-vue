<script setup>
import {onMounted, watch} from "vue";
import useBlogs from "@/composables/useBlogs";

const {
  loading,
  blogs,
  serverItemsLength,
  serverOptions,
  headers,
  destroy,
  index: getBlogs,
  like,
} = useBlogs();

// hooks
onMounted(() => getBlogs());

watch(
  serverOptions,
  (value) => {
    getBlogs();
  },
  {deep: true}
);
</script>

<template>
  <v-card class="max-width-card">
    <v-card-title>
      <h2>Blogs List</h2>
      <router-link :to="{name: 'blogs.create'}">
        <v-btn color="primary">Create Blog</v-btn>
      </router-link>
    </v-card-title>
    <v-card-text>
      <EasyDataTable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="blogs"
        buttons-pagination
      >
        <template #item-like_counter="{like_counter}">
          <span>{{ like_counter?.count ?? "-" }}</span>
        </template>

        <template #item-body="{body}">
          <span v-html="body"></span>
        </template>

        <template #item-operation="item">
          <router-link :to="{name: 'blogs.show', params: {id: item.id}}">
            <v-icon color="blue">mdi-pencil</v-icon>
          </router-link>
          <v-icon color="red" @click="destroy(item)">mdi-trash-can</v-icon>
          <v-icon color="red" @click="like(item)">
            {{ item.has_liked ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </template>
      </EasyDataTable>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.max-width-card {
  width: 800px;
  margin: 0 auto;
}

.v-card-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
