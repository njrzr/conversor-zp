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
      ['es-VE', 'VES', 2, input.value]
    ],
    'Dólar': [
      ['en-US', 'USD', 2, input.value]
    ],
    'Peso': [
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
      ['Conversión a Dólares BCV', 'en-US', 'USD', 2, (input.value / props.coinVal["ves_usd_bcv"])],
      ['Conversión a Dólares Paralelo', 'en-US', 'USD', 2, (input.value / props.coinVal["ves_usd_bm"])],
      ['Conversión a Euros BCV', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["ves_usd_bcv"] / props.coinVal["ves_eur"]))],
      ['Conversión a Euros Paralelo', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["ves_usd_bm"] / props.coinVal["ves_eur"]))],
      ['Conversión a Pesos BCV', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] / props.coinVal["ves_usd_bcv"]))],
      ['Conversión a Pesos Paralelo', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] / props.coinVal["ves_usd_bm"]))],
      ['Conversión a Pesos Chilenos BCV', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] / props.coinVal["ves_usd_bcv"]))],
      ['Conversión a Pesos Chilenos Paralelo', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] / props.coinVal["ves_usd_bm"]))],
      ['Conversión a Soles BCV', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] / props.coinVal["ves_usd_bcv"]))],
      ['Conversión a Soles Paralelo', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] / props.coinVal["ves_usd_bm"]))],
      ['Conversión a Bitcoin BCV', 'en-US', 'BTC', 8, (input.value / (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_btc"]))],
      ['Conversión a Bitcoin Paralelo', 'en-US', 'BTC', 8, (input.value / (props.coinVal["ves_usd_bm"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether BCV', 'en-US', 'ETH', 8, (input.value / (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_eth"]))],
      ['Conversión a Ether Paralelo', 'en-US', 'ETH', 8, (input.value / (props.coinVal["ves_usd_bm"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin BCV', 'en-US', 'LTC', 8, (input.value / (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Litecoin Paralelo', 'en-US', 'LTC', 8, (input.value / (props.coinVal["ves_usd_bm"] * props.coinVal["usd_ltc"]))],
    ],
    'Dólar': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * props.coinVal["ves_usd_bcv"])],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * props.coinVal["ves_usd_bm"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["era_eur"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * props.coinVal["era_cop"])],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * props.coinVal["era_clp"])],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * props.coinVal["era_pen"])],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / props.coinVal["usd_btc"])],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / props.coinVal["usd_eth"])],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / props.coinVal["usd_ltc"])]
    ],
    'Peso': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bcv"] / props.coinVal["era_cop"]))],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bm"] / props.coinVal["era_cop"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["era_cop"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_eur"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_clp"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_pen"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))]
    ],
    'Peso Chileno': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bcv"] / props.coinVal["era_clp"]))],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bm"] / props.coinVal["era_clp"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["era_clp"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_eur"]))],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_cop"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_pen"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))]
    ],
    'Sol': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bcv"] / props.coinVal["era_pen"]))],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bm"] / props.coinVal["era_pen"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["era_pen"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_eur"]))],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_cop"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_clp"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))]
    ],
    'Bitcoin': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_btc"]))],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bm"] * props.coinVal["usd_btc"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_btc"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_btc"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value * (props.coinVal["usd_btc"] / props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value * (props.coinVal["usd_btc"] / props.coinVal["usd_ltc"]))]
    ],
    'Ether': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_eth"]))],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bm"] * props.coinVal["usd_eth"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_eth"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_eth"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value * (props.coinVal["usd_eth"] / props.coinVal["usd_btc"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value * (props.coinVal["usd_eth"] / props.coinVal["usd_ltc"]))]
    ],
    'Litecoin': [
      ['Conversión a Bolívares BCV', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bcv"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Bolívares Paralelo', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd_bm"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_ltc"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_ltc"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value * (props.coinVal["usd_ltc"] / props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value * (props.coinVal["usd_ltc"] / props.coinVal["usd_eth"]))]
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
      <option>Bolívar</option>
      <option>Dólar</option>
      <option>Peso</option>
      <option>Peso Chileno</option>
      <option>Sol</option>
      <option>Bitcoin</option>
      <option>Ether</option>
      <option>Litecoin</option>
    </select>
    
    <input class="w-2/4 md:w-3/12 text-xl px-3 py-1 rounded-lg" type="number" inputmode="numeric" pattern="[0-9]*" :step="number"
      placeholder="Ingrese monto" @focus="clearInput" title="Solo ingresar números" autocomplete="off"
      required v-model="input" />
  </div>

  <div class="relative grid md:grid-cols-4 gap-1 w-full h-5/6 md:h-auto overflow-y-scroll rounded-lg" v-if="selected != ''">
    <div class="md:col-span-4 bg-white rounded-lg p-1">
      <p class="p-1 text-gray-500 text-center text-xl md:text-3xl font-semibold">{{ coinFormat(currencySelect[selected][0]) }}
        equivalen a
      </p>
    </div>
    <div class="bg-white rounded-lg py-1 px-2" v-for="coin of coinSelect[selected]">
      <p class="text-gray-500 font-semibold">{{ coin[0] }}</p>
      <p class="text-gray-500 text-right text-xl font-bold">{{
          coinFormat([coin[1], coin[2], coin[3], coin[4]])
      }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
