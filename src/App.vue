<template>
  <div>
    <TheNavbar />
    <router-view />
  </div>
</template>

<script>
import 'p5';
import 'meyda';
import TheNavbar from './components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>
