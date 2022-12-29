<script setup lang="ts">
import { storageColor, storageMode } from '~/logic/storage'
// import { storageColor, storageDemo } from '~/logic/storage'

// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }
</script>

<template>
  <main class="main w-[240px] h-[200px] text-center px-4 py-5 text-gray-700">
    <!-- <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">
      Open Options111
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div> -->

    <div class=" ml-1/2 my-30px">
      <input id="switch" v-model="storageMode" type="checkbox">
      <label class="love-heart" for="switch">
        <i class="left" />
        <i class="right" />
        <i class="bottom" />
        <div class="round" />
      </label>
    </div>

    <input v-model="storageColor" class="border-0 outline-none w-90% h-100px  cursor-pointer" type="color">
  </main>
</template>

<style scoped>
.main {
  /* background-color: blue;
  background-image: url(https://arc.net/noise.png); */
  background-attachment: fixed;
}

.love-heart:before,#switch {
 display: none;
}

.love-heart, .love-heart::after {
 border-color: hsl(231deg 28% 86%);
 border: 1px solid;
 border-top-left-radius: 100px;
 border-top-right-radius: 100px;
 width: 10px;
 height: 8px;
 border-bottom: 0
}

.round {
 position: absolute;
 z-index: 1;
 width: 8px;
 height: 8px;
 background: hsl(0deg 0% 100%);
 box-shadow: rgb(0 0 0 / 24%) 0px 0px 4px 0px;
 border-radius: 100%;
 left: 0px;
 bottom: -1px;
 transition: all .5s ease;
 animation: check-animation2 .5s forwards;
}

input:checked + label .round {
 transform: translate(0px, 0px);
 animation: check-animation .5s forwards;
 background-color: hsl(0deg 0% 100%);
}

@keyframes check-animation {
 0% {
  transform: translate(0px, 0px);
 }

 50% {
  transform: translate(0px, 7px);
 }

 100% {
  transform: translate(7px, 7px);
 }
}

@keyframes check-animation2 {
 0% {
  transform: translate(7px, 7px);
 }

 50% {
  transform: translate(0px, 7px);
 }

 100% {
  transform: translate(0px, 0px);
 }
}

.love-heart {
 box-sizing: border-box;
 position: relative;
 transform: rotate(-45deg) translate(-50%, -33px) scale(4);
 display: block;
 border-color: hsl(231deg 28% 86%);
 cursor: pointer;
 top: 0;
}

input:checked + .love-heart, input:checked + .love-heart::after, input:checked + .love-heart .bottom {
 border-color: hsl(347deg 81% 61%);
 box-shadow: inset 6px -5px 0px 2px hsl(347deg 99% 72%);
}

.love-heart::after, .love-heart .bottom {
 content: "";
 display: block;
 box-sizing: border-box;
 position: absolute;
 border-color: hsl(231deg 28% 86%);
}

.love-heart::after {
 right: -9px;
 transform: rotate(90deg);
 top: 7px;
}

.love-heart .bottom {
 width: 11px;
 height: 11px;
 border-left: 1px solid;
 border-bottom: 1px solid;
 border-color: hsl(231deg 28% 86%);
 left: -1px;
 top: 5px;
 border-radius: 0px 0px 0px 5px;
}
</style>
