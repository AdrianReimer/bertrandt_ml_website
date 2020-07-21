<template>
    <section id="trigger">
        <TheAudio />
        <label for="sounds">Choose a trigger sound: </label>
        <select name="sounds" id="sounds">
            <option value="trigger1">trigger1</option>
            <option value="trigger2">trigger2</option>
            <option value="trigger3">trigger3</option>
        </select>
        <p></p>
        <label for="labels">Choose a trigger label: </label>
        <select name="labels" id="labels">
            <option value="angry">angry</option>
            <option value="disgusted">disgusted</option>
            <option value="scared">scared</option>
            <option value="happy">happy</option>
            <option value="neutral">neutral</option>
            <option value="sad">sad</option>
            <option value="surprised">surprised</option>
        </select>
        <p></p>
        <button @click="playAudio()" type="button">Play Audio</button>
        <button @click="setAudio()" type="button">Save Selection</button>
    </section>
</template>

<script>
import Vue from 'vue';
import TheAudio from '../components/TheAudio.vue';

export default {
  components: {
    TheAudio,
  },
  methods: {
    playAudio() {
      const audio = document.getElementById('sounds');
      const audioValue = document.getElementById(audio.options[audio.selectedIndex].value);
      audioValue.play();
    },
    setAudio() {
      const audio = document.getElementById('sounds');
      const audioValue = document.getElementById(audio.options[audio.selectedIndex].value);
      const label = document.getElementById('labels');
      Vue.prototype.$audioValue = audioValue;
      Vue.prototype.$labelValue = label.options[label.selectedIndex].value;
    },
  },
};
</script>
