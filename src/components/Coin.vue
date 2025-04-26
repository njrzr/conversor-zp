<script setup lang="ts">
const props = defineProps(['coinVal', 'coinFormat', 'isPrices'])
const emits = defineEmits(['showPrices'])

interface Coins {
  [coin: string]: [country: string, bill: string, offset: number, value: number]
}

interface Format {
  [bill: string]: string
}

let multiply: number = 1000

const coins: Coins = {
  vesBCVToUsd: ['es-VE', 'VED', 2, props.coinVal["ves_usd_bcv"]],
  vesBMToUsd: ['es-VE', 'VED', 2, props.coinVal["ves_usd_bm"]],
  vesBCVToEur: ['es-VE', 'VED', 2, (props.coinVal["ves_usd_bcv"] / props.coinVal["ves_eur"])],
  vesBMToEur: ['es-VE', 'VED', 2, (props.coinVal["ves_usd_bm"] / props.coinVal["ves_eur"])],
  usdToBtc: ['en-US', 'USD', 2, props.coinVal["usd_btc"]],
  usdToEth: ['en-US', 'USD', 2, props.coinVal["usd_eth"]],
  usdToLtc: ['en-US', 'USD', 2, props.coinVal["usd_ltc"]],
  copToUsd: ['es-CO', 'COP', 2, props.coinVal["era_cop"]],
  vesToCop: ['es-VE', 'VED', 2, (props.coinVal["ves_usd_bm"] / props.coinVal["era_cop"]) * multiply],
  vesToPen: ['es-VE', 'VED', 2, (props.coinVal["ves_usd_bm"] / props.coinVal["era_pen"])],
  copToVes: ['es-CO', 'COP', 2, (props.coinVal["era_cop"] / props.coinVal["ves_usd_bm"])],
  vesToClp: ['es-VE', 'VED', 2, (props.coinVal["ves_usd_bm"] / props.coinVal["era_clp"]) * multiply]
}

const format: Format = {
  vesBCVToUsd: 'Bolivares por Dolar BCV',
  vesBMToUsd: 'Bolivares por Dolar Paralelo',
  vesBCVToEur: 'Bolivares por Euro BCV',
  vesBMToEur: 'Bolivares por Euro Paralelo',
  usdToBtc: 'Dolares por Bitcoin',
  usdToEth: 'Dolares por Ether',
  usdToLtc: 'Dolares por Litecoin',
  copToUsd: 'Pesos por Dolar',
  vesToCop: 'Bolivares por mil Pesos',
  vesToPen: 'Bolivares por Sol',
  vesToClp: 'Bolivares por mil Pesos Chilenos',
  copToVes: 'Pesos por Bolivar'
}
</script>

<template>
  <div v-show="isPrices" :class="['absolute bg-royal flex flex-col gap-1 w-full h-full p-1 overflow-y-scroll left-0 top-0 z-10']">
    <span
      :class="['absolute left-2 top-2 flex justify-center items-center bg-royal w-8 h-8 text-white font-semibold rounded-lg text-xl hover:bg-gray-400 cursor-pointer transition duration-200 z-10']"
      @click="emits('showPrices')">
      x
    </span>

    <p class="relative bg-white w-full h-auto p-2 text-center text-gray-500 text-2xl font-bold rounded-lg">
        Precios del dia
    </p>
    
    <div v-for="coin, index in coins" key="index" class="bg-white rounded-lg py-1 px-2">
      <p class="relative w-full h-12 flex justify-between items-center text-gray-500 font-medium">
        {{ format[index] }} <span class="font-bold">{{ coinFormat(coin) }}</span>
      </p>
    </div>
  </div>

  <div :class="['relative bg-royal hidden md:flex flex-col gap-1 w-3/12 h-auto p-1 rounded-lg overflow-y-scroll']">
    <p class="relative bg-white w-full h-auto p-2 text-center text-gray-500 text-2xl font-bold rounded-lg">
        Precios del dia
    </p>
    
    <div v-for="coin, index in coins" key="index" class="bg-white rounded-lg py-1 px-2">
      <p class="relative w-full h-12 flex justify-between items-center text-gray-500 font-medium">
        {{ format[index] }} <span class="font-bold">{{ coinFormat(coin) }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.prices-hidden {
  left: 0;
  top: 0;
  height: 100vh;
  z-index: -1;
  position: absolute;
  transition: 500ms;
  opacity: 0;
}

.prices-open {
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1;
  position: absolute;
  transition: 500ms;
  opacity: 1;
}
</style>
