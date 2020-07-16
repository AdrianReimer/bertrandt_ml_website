<template>
  <div>
    <TheNavbar />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>
