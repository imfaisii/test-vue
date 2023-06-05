<script setup>
import useAuth from "@/composables/useAuth";

const {logout} = useAuth();
</script>
<template>
  <main>
    <nav @click="logout">
      <v-icon>mdi-logout</v-icon>
    </nav>
    <slot></slot>
  </main>
</template>

<style scoped>
nav {
  text-align: right;
  margin-bottom: 5px;
  color: red;
  cursor: pointer;
}
</style>
