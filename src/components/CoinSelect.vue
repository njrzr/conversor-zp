<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['coinVal'])

let selected = ref<string>('')
let input = ref<number>()
let number = ref<number>(0)

interface CoinSelect {
  [currency: string]: [[country: string, bill: string, offset: number, value: number] |
  [conversion: string, country: string, bill: string, offset: number, value: number]]
}

// const coinSelect: CoinSelect = {
//   'Bolívar': [
//     ['es-VE', 'VES', 2, input],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input / props.coinVal["ves_usd"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input / props.coinVal["ves_eur"])]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input * (props.coinVal["era_cop"] / props.coinVal["ves_usd"]))]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input * (props.coinVal["era_clp"] / props.coinVal["ves_usd"]))]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input * (props.coinVal["era_pen"] / props.coinVal["ves_usd"]))]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input / (props.coinVal["ves_usd"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input / (props.coinVal["ves_usd"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input / (props.coinVal["ves_usd"] * props.coinVal["usd_ltc"]))]]
//   ],
//   'Dólar': [
//     ['en-US', 'USD', 2, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * props.coinVal["ves_usd"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input * props.coinVal["era_eur"])]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input * props.coinVal["era_cop"])]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input * props.coinVal["era_clp"])]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input * props.coinVal["era_pen"])]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input / props.coinVal["usd_btc"])]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input / props.coinVal["usd_eth"])]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input / props.coinVal["usd_ltc"])]]
//   ],
//   'Peso': [
//     ['es-CO', 'COP', 2, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * (props.coinVal["ves_usd"] / props.coinVal["era_cop"]))]],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input / props.coinVal["era_cop"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input / (props.coinVal["era_cop"] / props.coinVal["era_eur"]))]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input / (props.coinVal["era_cop"] / props.coinVal["era_clp"]))]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input / (props.coinVal["era_cop"] / props.coinVal["era_pen"]))]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input / (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input / (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input / (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))]]
//   ],
//   'Peso Chileno': [
//     ['es-CL', 'CLP', 2, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * (props.coinVal["ves_usd"] / props.coinVal["era_clp"]))]],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input / props.coinVal["era_clp"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input / (props.coinVal["era_clp"] / props.coinVal["era_eur"]))]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input / (props.coinVal["era_clp"] / props.coinVal["era_cop"]))]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input / (props.coinVal["era_clp"] / props.coinVal["era_pen"]))]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input / (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input / (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input / (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))]]
//   ],
//   'Sol': [
//     ['es-PE', 'PEN', 2, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * (props.coinVal["ves_usd"] / props.coinVal["era_pen"]))]],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input / props.coinVal["era_pen"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input / (props.coinVal["era_pen"] / props.coinVal["era_eur"]))]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input / (props.coinVal["era_pen"] / props.coinVal["era_cop"]))]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input / (props.coinVal["era_pen"] / props.coinVal["era_clp"]))]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input / (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input / (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input / (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))]]
//   ],
//   'Bitcoin': [
//     ['en-US', 'BTC', 8, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * (props.coinVal["ves_usd"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input * props.coinVal["usd_btc"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input * props.coinVal["eur_btc"])]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input * (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input * (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input * (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input * (props.coinVal["usd_btc"] / props.coinVal["usd_eth"]))]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input * (props.coinVal["usd_btc"] / props.coinVal["usd_ltc"]))]]
//   ],
//   'Ether': [
//     ['en-US', 'ETH', 8, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * (props.coinVal["ves_usd"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input * props.coinVal["usd_eth"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input * props.coinVal["eur_eth"])]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input * (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input * (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input * (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input * (props.coinVal["usd_eth"] / props.coinVal["usd_btc"]))]],
//     ['Conversión a Litecoin', ['en-US', 'LTC', 8, (input * (props.coinVal["usd_eth"] / props.coinVal["usd_ltc"]))]]
//   ],
//   'Litecoin': [
//     ['en-US', 'LTC', 8, input],
//     ['Conversión a Bolívares', ['es-VE', 'VES', 2, (input * (props.coinVal["ves_usd"] * props.coinVal["usd_ltc"]))]],
//     ['Conversión a Dólares', ['en-US', 'USD', 2, (input * props.coinVal["usd_ltc"])]],
//     ['Conversión a Euros', ['en-EU', 'EUR', 2, (input * props.coinVal["eur_ltc"])]],
//     ['Conversión a Pesos', ['es-CO', 'COP', 2, (input * (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))]],
//     ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (input * (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))]],
//     ['Conversión a Soles', ['es-PE', 'PEN', 2, (input * (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))]],
//     ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (input * (props.coinVal["usd_ltc"] / props.coinVal["usd_btc"]))]],
//     ['Conversión a Ether', ['en-US', 'ETH', 8, (input * (props.coinVal["usd_ltc"] / props.coinVal["usd_eth"]))]]
//   ]
// }

function coinFormat([lang, currency, digits, value]: [string, string, number, number]) {
  if (isNaN(value)) {
    switch (currency) {
      case 'VES':
        return 'Bs.S 0,00';
        break;
      case 'COP':
        return '$ 0,00';
        break;
      case 'USD':
        return '$0.00';
        break;
      case 'PEN':
        return 'S/ 0.00';
        break;
      case 'CLP':
        return '$ 0.00';
        break;
      case 'BTC':
        return 'BTC 0.00000000';
        break;
      case 'LTC':
        return 'LTC 0.00000000';
        break;
      case 'ETH':
        return 'ETH 0.00000000';
        break;
      case 'ADA':
        return 'ADA 0.00000000';
        break;
    }
  } else {
    return Intl.NumberFormat(lang, { style: 'currency', currency: currency, minimumFractionDigits: digits }).format(value);
  }
}
</script>

<template>
  <div class="relative flex justify-around items-center gap-2 mt-1 p-2 bg-royal rounded-lg">
    <select class="appearance-none w-1/4 text-2xl p-1" v-model="selected">
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
    <input class="w-3/4 text-2xl text-center p-1" type="number" inputmode="numeric" pattern="[0-9]*" :step="number"
      placeholder="Ingrese monto a calcular" title="Solo ingresar números" autocomplete="off" required
      v-model="input" />
  </div>

  <div class="relative grid grid-cols-4 gap-1 w-full mx-auto mt-1" v-if="selected != ''">
    <div class="col-span-4 bg-royal rounded-lg p-1">
      <p class="p-1 text-white text-center text-3xl font-semibold">Moneda equivalen a {{ input }}</p>
    </div>
    <div class="bg-royal rounded-lg p-1">
      <p class="p-1 text-white font-semibold">{{ }}</p>
      <p class="p-1 text-white text-right text-xl">{{ }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
