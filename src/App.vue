<script setup>
import { provide, shallowRef } from 'vue';
import router from '@/router';
import layouts from '@/layouts';

const layout = shallowRef('div')

router.afterEach((to) => layout.value = layouts[to.meta.layout] || 'div')

provide('app:layout', layout)
</script>
<template>
  <component :is="layout || 'div'">
    <router-view></router-view>
  </component>
</template>

<style lang="scss">
body {
  background-color: #f0f0f0;
}

.v-messages__message {
  text-align: left;
  margin-bottom: 10px;
}
</style>