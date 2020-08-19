<template>
  <section id="privacy">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header style="font-size: 4vmin">Privacy</v-ons-list-header>
        <v-ons-list>
          <ons-list-item tappable
          @click="$router.push('/privacy/legal-and-privacy')">
            Legal & Privacy
          </ons-list-item>
          <ons-list-item tappable
          @click="$router.push('/privacy/cookie-policy')">
            Cookie Policy
          </ons-list-item>
        </v-ons-list>
      </v-ons-list>
    </v-ons-page>
  </section>
</template>

<script>
import Vue from 'vue';

export default {
  mounted() {
    try {
      Vue.prototype.stopDraw();
    } catch {
      console.log('stopDraw function not defined');
    }
  },
};
</script>
