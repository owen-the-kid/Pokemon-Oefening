<template>
  <head-nav />
  <router-view />
</template>

<script>
import HeadNav from './components/headNav.vue';

export default {
  components: {
    HeadNav,
  },
};
</script>

