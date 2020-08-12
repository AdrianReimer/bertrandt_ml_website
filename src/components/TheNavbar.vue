<template>
  <v-ons-bottom-toolbar id="navbar">
    <v-ons-button @click="toggleIconColor(homeBtnID); $router.push('/')"
    modifier="quiet" class="btn" id="homeBtn">
      <i class="fa fa-home fa-fw"></i>
    </v-ons-button>
    <v-ons-button @click="toggleIconColor(chartBtnID); $router.push('/statistic')"
    modifier="quiet" class="btn" id="chartBtn">
      <i class="fa fa-pie-chart fa-fw"></i>
    </v-ons-button>
    <v-ons-button @click="toggleIconColor(triggerBtnID); $router.push('/trigger')"
    modifier="quiet" class="btn" id="triggerBtn">
      <i class="fa fa-volume-up fa-fw"></i>
    </v-ons-button>
    <v-ons-button @click="toggleIconColor(userBtnID); $router.push('/account')"
    modifier="quiet" class="btn" id="userBtn">
      <i class="fa fa-user fa-fw "></i>
    </v-ons-button>
    <v-ons-button @click="toggleIconColor(privacyBtnID); $router.push('/privacy')"
    modifier="quiet" class="btn" id="privacyBtn">
      <i class="fa fa-user-secret fa-fw"></i>
    </v-ons-button>
  </v-ons-bottom-toolbar>
</template>

<script>
export default {
  data() {
    return {
      homeBtnID: 'homeBtn',
      triggerBtnID: 'triggerBtn',
      chartBtnID: 'chartBtn',
      userBtnID: 'userBtn',
      privacyBtnID: 'privacyBtn',
      btnColorAct: 'rgb(66, 133, 244)',
    };
  },
  methods: {
    toggleIconColor(btnID) {
      document.getElementById(this.homeBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.triggerBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.chartBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.userBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.privacyBtnID).childNodes[0].style.color = 'black';
      document.getElementById(btnID).childNodes[0].style.color = this.btnColorAct;
    },

    toggleFirstSite() {
      if (this.$route.path === '/') {
        document.getElementById(this.homeBtnID).childNodes[0].style.color = this.btnColorAct;
      } else if (this.$route.path.startsWith('/statistic')) {
        document.getElementById(this.chartBtnID).childNodes[0].style.color = this.btnColorAct;
      } else if (this.$route.path.startsWith('/trigger')) {
        document.getElementById(this.triggerBtnID).childNodes[0].style.color = this.btnColorAct;
      } else if (this.$route.path.startsWith('/account')) {
        document.getElementById(this.userBtnID).childNodes[0].style.color = this.btnColorAct;
      } else if (this.$route.path.startsWith('/privacy')) {
        document.getElementById(this.privacyBtnID).childNodes[0].style.color = this.btnColorAct;
      }
    },
  },
  mounted() {
    this.toggleFirstSite();
  },
};
</script>

<style lang="css">
  #navbar {
    height: 10vh;
    width: 100vw;
    bottom: 0;
    left: 0;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .iconText {
    font-size: 2vmin;
    margin-top: 0.5vh;
  }

  .btn {
    color: black;
    padding: 6vw;
    background: transparent;
    border: hidden;
    justify-content: center;
    align-items: center;
    outline: none;
    font-size: 6vmin;
  }
</style>
