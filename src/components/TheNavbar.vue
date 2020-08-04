<template>
    <v-ons-bottom-toolbar id="navbar">
        <button @click="toggleIconColor(homeBtnID); $router.push('/')"
        class="btn" id="homeBtn">
        <i class="fa fa-home fa-fw"></i></button>
        <button @click="toggleIconColor(triggerBtnID); $router.push('/trigger')"
        class="btn" id="triggerBtn">
        <i class="fa fa-search fa-fw"></i></button>
        <button @click="toggleIconColor(chartBtnID); $router.push('/statistic')"
        class="btn" id="chartBtn">
        <i class="fa fa-pie-chart fa-fw"></i></button>
        <button @click="toggleIconColor(helpBtnID); $router.push('/help')"
        class="btn" id="helpBtn">
        <i class="fa fa-question fa-fw"></i></button>
        <button @click="toggleIconColor(userBtnID); $router.push('/account')"
        class="btn" id="userBtn">
        <i class="fa fa-user fa-fw "></i></button>
    </v-ons-bottom-toolbar>
</template>

<script>
export default {
  data() {
    return {
      homeBtnID: 'homeBtn',
      triggerBtnID: 'triggerBtn',
      chartBtnID: 'chartBtn',
      helpBtnID: 'helpBtn',
      userBtnID: 'userBtn',
    };
  },
  methods: {
    toggleIconColor(btnID) {
      document.getElementById(this.homeBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.triggerBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.chartBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.helpBtnID).childNodes[0].style.color = 'black';
      document.getElementById(this.userBtnID).childNodes[0].style.color = 'black';
      document.getElementById(btnID).childNodes[0].style.color = 'rgb(66, 133, 244)';
    },
  },
  mounted() {
    document.getElementById(this.homeBtnID).childNodes[0].style.color = 'rgb(66, 133, 244)';
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

    .btn {
        margin: 3vh 3.5vw;
        padding: 3vh 3vw;
        background: transparent;
        border: hidden;
        justify-content: center;
        align-items: center;
        outline: none;
        font-size: 6vmin;
    }
</style>
