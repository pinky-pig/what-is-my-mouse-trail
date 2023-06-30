<script setup lang="ts">
import MouseTrail from './components/MouseTrail.vue';
import Draw from './components/Draw.vue';
import ColorPicker from './components/ColorPicker.vue';
import ModePicker from './components/ModePicker.vue';
import { currentMode } from './components/utils';

</script>

<template>
  <div class="playground">
    <div class="content">
      <MouseTrail />
      <Draw />

      <p class="place-holder-text">{{ currentMode }}</p>
    </div>
    <footer>
      <div class="footer-left">
        <ModePicker></ModePicker>
        <ColorPicker></ColorPicker>
      </div>

      <a href="https://github.com/pinky-pig/what-is-my-mouse-trail/tree/refactor" class="footer-right" target="_blank">
        GitHub
      </a>
    </footer>
  </div>
</template>
<style scoped>
.playground {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  background: #fefefe;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5% 10% 15%;
  box-sizing: border-box;
}

.content {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 5px solid #b8b8b8;
  text-align: center;
}

.place-holder-text {
  color: #b8b8b8;
  font-size: 18px;
  font-style: italic;
  font-family: fantasy;
  position: absolute;
  top: 0;
}

footer {
  width: 100%;
  height: 80px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 40px;
}

.footer-right {
  cursor: pointer;
  font-size: 24px;
  font-weight: 800;
}
.footer-right:hover {
  color: #b8b8b8;
}
</style>
