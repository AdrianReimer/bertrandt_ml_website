<template>
  <div>
    <Init />
    <router-view />
    <TheNavbar />
  </div>
</template>

<script>
import Init from './components/Init.vue';
import TheNavbar from './components/TheNavbar.vue';

export default {
  components: {
    Init, TheNavbar,
  },
};
</script>
