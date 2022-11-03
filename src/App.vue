<script setup lang="ts">
import { ref } from 'vue'

let error: boolean = false;
let loading: boolean = false;
let isActive = ref<boolean>(false);

function showNotes() {
  isActive.value = !isActive.value;
  setTimeout(() => {
    isActive.value = !isActive.value;
  }, 3000)
}
</script>

<template>
  <div>
    <div v-if="error"
      class="relative mx-auto mt-2 w-10/12 font-poppins flex items-center justify-center bg-blue-700 rounded-lg px-4 py-2 h-20">
      <p class="text-center text-white font-semibold text-xl">No fue posible obtener el valor de las monedas,
        revise su conexión a internet o inténtalo mas tarde.</p>
    </div>

    <div v-else-if="loading"
      class="relative mx-auto mt-2 w-10/12 font-poppins flex items-center justify-center bg-blue-700 rounded-lg px-4 py-2 h-20">
      <p class="text-center font-semibold text-4xl uppercase text-gradient">CARGANDO</p>
    </div>

    <div v-else class="relative grid mx-auto mt-2 w-10/12 font-poppins">
      <div
        class="relative flex items-center justify-center bg-blue-700 rounded-lg px-4 py-2 w-full h-20 overflow-hidden">
        <p class="text-center text-white font-semibold text-2xl uppercase">Conversor de divisas y criptos
          <span
            :class="[{ 'invisible': isActive != false }, 'rounded-full', 'px-3.5', 'py-1', 'bg-blue-400', 'hover:bg-blue-500', 'cursor-pointer', 'transition', 'duration-200']"
            @click="showNotes">?</span>
        </p>
        <div
          :class="[{ 'notes-hidden': isActive != true, 'notes-open': isActive != false }, 'absolute', 'flex', 'flex-col', 'items-center', 'w-full', 'overflow-hidden', 'bg-blue-700']">
          <p class="text-center text-white font-semibold text-2xl">El valor de las divisas es proporcionado por
            <a class="text-gray-300 hover:text-blue-400 transition duration-200" target="_blank"
              href="https://openexchangerates.org/" rel="noreferrer">openexchangerates.org</a>.
          </p>
          <p class="text-center text-white font-semibold text-2xl">El valor de las criptomonedas es proporcionado por
            <a class="text-gray-300 hover:text-blue-400 transition duration-200" target="_blank"
              href="https://cryptocompare.com/" rel="noreferrer">cryptocompare.com</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading {
  0% {
    color: #ffffff;
  }

  50% {
    color: #909090;
  }

  100% {
    color: #ffffff;
  }
}

.text-gradient {
  animation: loading infinite 1s;
}

.notes-hidden {
  z-index: -1;
  transition: 500ms;
  opacity: 0;
}

.notes-open {
  z-index: 1;
  transition: 500ms;
  opacity: 1;
}
</style>
