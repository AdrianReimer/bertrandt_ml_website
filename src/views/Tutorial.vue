<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Tutorial</div>
      <div class="right">
        <ons-toolbar-button @click="$router.push('/')">
            Continue
        </ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-carousel fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex">
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <i class="fa fa-home fa-fw" style="font-size: 50px;"></i>
            <p style="font-size: 20px;">Home </p>
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <i class="fa fa-pie-chart fa-fw" style="font-size: 50px;"></i>
            <p style="font-size: 20px;">Statistic </p>
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <i class="fa fa-volume-up fa-fw" style="font-size: 50px;"></i>
            <p style="font-size: 20px;">Trigger </p>
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <i class="fa fa-user fa-fw" style="font-size: 50px;"></i>
            <p style="font-size: 20px;">Account </p>
        </div>
      </v-ons-carousel-item>
      <v-ons-carousel-item>
        <div style="text-align: center; margin-top: 20px;">
            <i class="fa fa-user-secret fa-fw" style="font-size: 50px;"></i>
            <p style="font-size: 20px;">Privacy </p>
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
        fontSize: '40px',
        color: '#fff',
        position: 'absolute',
        bottom: '15vh',
        left: 0,
        right: 0,
      },
    };
  },
};
</script>
