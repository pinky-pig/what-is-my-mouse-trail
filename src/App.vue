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

    <a  href="https://github.com/pinky-pig/what-is-my-mouse-trail/tree/refactor" class="right" target="_blank">
      GitHub
    </a>
  </footer>
</template>

<style scoped>
.playground{
  width: 80vw;
  height: 80vh;
  outline: 10px solid #474747;
  background: #f7f4f0;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  overflow: hidden;
}
.footer{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
.left{
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.right{
  margin: 0 10px;
  color: #474747;
  text-decoration: none;
  margin: 10px 10px;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
}
.right:hover{
  color: #f7f4f0;
  background: #474747;
  border-radius: 5px;
}
</style>
