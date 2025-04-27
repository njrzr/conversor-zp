<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
const props = defineProps(['coinVal', 'coinFormat'])

let selected = ref<string>('')
let input = ref<number>(0)
let number = ref<number>(0)

interface CurrencySelect {
  [currency_name: string]: [string, string, number, number][]
}

interface CoinSelect {
  [currency_name: string]: [string, string, string, number, number][]
}

const currencySelect = computed((): CurrencySelect => {
  return {
    'Bolívar': [
      ['es-VE', 'VED', 2, input.value]
    ],
    'Dólar': [
      ['en-US', 'USD', 2, input.value]
    ],
    'Peso Colombiano': [
      ['es-CO', 'COP', 2, input.value]
    ],
    'Peso Chileno': [
      ['es-CL', 'CLP', 2, input.value]
    ],
    'Sol': [
      ['es-PE', 'PEN', 2, input.value]
    ],
    'Bitcoin': [
      ['en-US', 'BTC', 8, input.value]
    ],
    'Ether': [
      ['en-US', 'ETH', 8, input.value]
    ],
    'Litecoin': [
      ['en-US', 'LTC', 8, input.value]
    ]
  }
})

const coinSelect = computed((): CoinSelect => {
  return {
    'Bolívar': [
      ['Dólar BCV', 'en-US', 'USD', 2, (input.value / props.coinVal["ves_usd_bcv"])],
      ['Dólar Paralelo', 'en-US', 'USD', 2, (input.value / props.coinVal["ves_usd_bm"])],
      ['Euro BCV', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["ves_usd_bcv"] / props.coinVal["ves_eur"]))],
      ['Euro Paralelo', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["ves_usd_bm"] / props.coinVal["ves_eur"]))],
      ['Peso Colombiano BCV', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] / props.coinVal["ves_usd_bcv"]))],
      ['Peso Colombiano Paralelo', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] / props.coinVal["ves_usd_bm"]))],
      ['Peso Chileno BCV', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] / props.coinVal["ves_usd_bcv"]))],
      ['Peso Chileno Paralelo', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] / props.coinVal["ves_usd_bm"]))],
      ['Sol BCV', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] / props.coinVal["ves_usd_bcv"]))],
      ['Sol Paralelo', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] / props.coinVal["ves_usd_bm"]))],
      ['Bitcoin BCV', 'en-US', 'BTC', 8, (input.value / (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_btc"]))],
      ['Bitcoin Paralelo', 'en-US', 'BTC', 8, (input.value / (props.coinVal["ves_usd_bm"] * props.coinVal["usd_btc"]))],
      ['Ether BCV', 'en-US', 'ETH', 8, (input.value / (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_eth"]))],
      ['Ether Paralelo', 'en-US', 'ETH', 8, (input.value / (props.coinVal["ves_usd_bm"] * props.coinVal["usd_eth"]))],
      ['Litecoin BCV', 'en-US', 'LTC', 8, (input.value / (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_ltc"]))],
      ['Litecoin Paralelo', 'en-US', 'LTC', 8, (input.value / (props.coinVal["ves_usd_bm"] * props.coinVal["usd_ltc"]))],
    ],
    'Dólar': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * props.coinVal["ves_usd_bcv"])],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * props.coinVal["ves_usd_bm"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value * props.coinVal["era_eur"])],
      ['Peso Colombiano', 'es-CO', 'COP', 2, (input.value * props.coinVal["era_cop"])],
      ['Peso Chileno', 'es-CL', 'CLP', 2, (input.value * props.coinVal["era_clp"])],
      ['Sol', 'es-PE', 'PEN', 2, (input.value * props.coinVal["era_pen"])],
      ['Bitcoin', 'en-US', 'BTC', 8, (input.value / props.coinVal["usd_btc"])],
      ['Ether', 'en-US', 'ETH', 8, (input.value / props.coinVal["usd_eth"])],
      ['Litecoin', 'en-US', 'LTC', 8, (input.value / props.coinVal["usd_ltc"])]
    ],
    'Peso Colombiano': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bcv"] / props.coinVal["era_cop"]))],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bm"] / props.coinVal["era_cop"]))],
      ['Dólar', 'en-US', 'USD', 2, (input.value / props.coinVal["era_cop"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_eur"]))],
      ['Peso Chileno', 'es-CL', 'CLP', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_clp"]))],
      ['Sol', 'es-PE', 'PEN', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_pen"]))],
      ['Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))],
      ['Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))],
      ['Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))]
    ],
    'Peso Chileno': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bcv"] / props.coinVal["era_clp"]))],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bm"] / props.coinVal["era_clp"]))],
      ['Dólar', 'en-US', 'USD', 2, (input.value / props.coinVal["era_clp"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_eur"]))],
      ['Peso Colombiano', 'es-CO', 'COP', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_cop"]))],
      ['Sol', 'es-PE', 'PEN', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_pen"]))],
      ['Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))],
      ['Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))],
      ['Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))]
    ],
    'Sol': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bcv"] / props.coinVal["era_pen"]))],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bm"] / props.coinVal["era_pen"]))],
      ['Dólar', 'en-US', 'USD', 2, (input.value / props.coinVal["era_pen"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_eur"]))],
      ['Peso Colombiano', 'es-CO', 'COP', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_cop"]))],
      ['Peso Chileno', 'es-CL', 'CLP', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_clp"]))],
      ['Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))],
      ['Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))],
      ['Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))]
    ],
    'Bitcoin': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_btc"]))],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bm"] * props.coinVal["usd_btc"]))],
      ['Dólar', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_btc"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_btc"])],
      ['Peso Colombiano', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))],
      ['Peso Chileno', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))],
      ['Sol', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))],
      ['Ether', 'en-US', 'ETH', 8, (input.value * (props.coinVal["usd_btc"] / props.coinVal["usd_eth"]))],
      ['Litecoin', 'en-US', 'LTC', 8, (input.value * (props.coinVal["usd_btc"] / props.coinVal["usd_ltc"]))]
    ],
    'Ether': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_eth"]))],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bm"] * props.coinVal["usd_eth"]))],
      ['Dólar', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_eth"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_eth"])],
      ['Peso Colombiano', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))],
      ['Peso Chileno', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))],
      ['Sol', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))],
      ['Bitcoin', 'en-US', 'BTC', 8, (input.value * (props.coinVal["usd_eth"] / props.coinVal["usd_btc"]))],
      ['Litecoin', 'en-US', 'LTC', 8, (input.value * (props.coinVal["usd_eth"] / props.coinVal["usd_ltc"]))]
    ],
    'Litecoin': [
      ['Bolívares BCV', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_ltc"]))],
      ['Bolívares Paralelo', 'es-VE', 'VED', 2, (input.value * (props.coinVal["ves_usd_bm"] * props.coinVal["usd_ltc"]))],
      ['Dólar', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_ltc"])],
      ['Euro', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_ltc"])],
      ['Peso Colombiano', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))],
      ['Peso Chileno', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))],
      ['Sol', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))],
      ['Bitcoin', 'en-US', 'BTC', 8, (input.value * (props.coinVal["usd_ltc"] / props.coinVal["usd_btc"]))],
      ['Ether', 'en-US', 'ETH', 8, (input.value * (props.coinVal["usd_ltc"] / props.coinVal["usd_eth"]))]
    ]
  }
})

function clearInput(el: any) {
  el.target.value = ''
}
</script>

<template>
  <div class="relative w-full h-16 flex justify-center items-center gap-2 p-1 bg-royal rounded-lg">
    <select style="background-size: 1.25rem; background-position: 96% 50%;" class="relative rounded-lg w-2/4 md:w-2/12 text-xl pl-3 py-1 cursor-pointer appearance-none bg-arrow bg-contain bg-no-repeat" v-model="selected">
      <option disabled value="">Elige moneda</option>
      <option v-for="value, index of currencySelect">{{ index }}</option>
    </select>
    
    <input class="w-2/4 md:w-3/12 text-xl px-3 py-1 rounded-lg" type="number" inputmode="numeric" pattern="[0-9]*" :step="number"
      placeholder="Ingrese monto" @focus="clearInput" title="Solo ingresar números" autocomplete="off"
      required v-model="input" />
  </div>

  <div class="relative grid md:grid-cols-4 gap-1 p-1 md:p-0 w-full h-5/6 md:h-auto border-2 md:border-none border-gray-700 overflow-y-scroll rounded-lg scrollbar-none" v-if="selected != ''">
    <div class="md:col-span-4 bg-white rounded-lg p-1">
      <p class="p-1 text-gray-500 text-center text-xl md:text-3xl font-semibold">
        {{ coinFormat(currencySelect[selected][0]) }} equivale a:
      </p>
    </div>

    <div class="bg-white flex flex-col gap-1 rounded-lg py-1 px-2" v-for="coin of coinSelect[selected]">
      <p class="text-center text-gray-500 text-xl font-bold">{{ coin[0] }}</p>
      <p class="text-center text-gray-500 text-xl">{{
          coinFormat([coin[1], coin[2], coin[3], coin[4]])
      }}</p>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
}
</style>
