<script setup lang="ts">

import MouseTrail from './components/MouseTrail.vue';
import Draw from './components/Draw.vue';
import ColorPicker from './components/ColorPicker.vue';
import ModePicker from './components/ModePicker.vue';
import { currentMode } from './components/utils';

</script>

<template>
  <div class="playground">
    <MouseTrail />
    <Draw />

    <p class="place-holder-text">{{ currentMode }}</p>
  </div>

  <footer class="footer">
    <div class="left">
      <ModePicker />
      <ColorPicker />
    </div>

    <a href="https://github.com/pinky-pig/what-is-my-mouse-trail/tree/refactor" class="right" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
        <path fill="currentColor" fill-rule="evenodd"
          d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z" />
      </svg>
    </a>
  </footer>
</template>

<style scoped>
.playground {
  width: 80vw;
  height: 80vh;
  outline: 10px solid #000;
  background: #f7f4f0;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px 41px 5px #00000073;
}

.footer {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.left {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.right {
  margin: 0 10px;
  color: #474747;
  text-decoration: none;
  margin: 10px 10px;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
}

.right:hover {
  color: #f7f4f0;
  background: #474747;
  border-radius: 5px;
}
</style>
