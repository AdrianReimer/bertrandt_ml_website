<template id="main">
  <v-ons-page style="height:100vh;">
    <v-ons-toolbar>
      <div class="center">Tutorial</div>
      <div class="right">
        <ons-toolbar-button @click="saveTut(); $router.push('/account/init')">
            Continue
        </ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-carousel fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex">
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <img class="tutImg" src="../assets/graphics/home.svg">
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <img class="tutImg" src="../assets/graphics/statistic.svg">
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <img class="tutImg" src="../assets/graphics/trigger.svg">
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <img class="tutImg" src="../assets/graphics/user.svg">
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <img class="tutImg" src="../assets/graphics/privacy.svg">
        </div>
      </v-ons-carousel-item>
    </v-ons-carousel>

    <div :style="dots">
      <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length"
        :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
      </span>
    </div>
  </v-ons-page>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      carouselIndex: 0,
      items: {
        HOME: '#085078',
        STATISTIC: '#373B44',
        TRIGGER: '#D38312',
        ACCOUNT: '',
        PRIVACY: '',
      },
      dots: {
        textAlign: 'center',
        fontSize: '50px',
        color: '#fff',
        position: 'absolute',
        bottom: '7vh',
        left: 0,
        right: 0,
      },
    };
  },
  mounted() {
    try {
      Vue.prototype.stopDraw();
    } catch {
      console.log('stopDraw function not defined');
    }
  },
  methods: {
    saveTut() {
      const doc = {
        _id: 'tutorial',
        value: true,
      };
      this.$pouch.put(doc, {}, 'tutorial').then(() => {
        console.log('Tutorial finished');
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="css">
  .tutImg {
    height: 68vh;
    width: 100vw;
  }
</style>
