<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Coin from './components/Coin.vue'
import CoinSelect from './components/CoinSelect.vue'
import axios from 'axios'

interface URL {
  [url_name: string]: string;
}

interface CoinValue {
  [coin_name: string]: number | null;
}

const url: URL = {
  exchange: 'https://openexchangerates.org/api/latest.json?app_id=ae86587758744760bca3f3f4107b2369&show_alternative=1&symbols=COP,EUR,VES,VEF_BLKMKT,PEN,CLP',
  crypto: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD,EUR,COP,VES,CLP,PEN&api_key={4a8910b13d689849c08919735481e44ff67190790f102938ee30e1a95169ae70}',
}

let coinValue: CoinValue = {
  ves_usd_bcv: null,
  ves_usd_bm: null,
  ves_usd_average: null,
  ves_eur: null,
  era_cop: null,
  era_eur: null,
  era_pen: null,
  era_clp: null,
  usd_btc: null,
  usd_ltc: null,
  usd_eth: null,
  eur_btc: null,
  eur_eth: null,
  eur_ltc: null
}

let conversion = ref<number>(10)
let isError = ref<boolean>(false)
let isLoading = ref<boolean>(true)
let isActive = ref<boolean>(false)
let isPrices = ref<boolean>(false)
let date = new Date().getFullYear()

function showNotes() {
  isActive.value = !isActive.value
  setTimeout(() => {
    isActive.value = !isActive.value
  }, 3000)
}

function showPrices() {
  isPrices.value = !isPrices.value
}

onMounted(() => {
  axios
    .all([axios.get(url.exchange), axios.get(url.crypto)])
    .then(axios.spread((exchangeGet, cryptoGet) => {
      coinValue.ves_usd_bcv = exchangeGet.data.rates.VES
      coinValue.ves_usd_bm = exchangeGet.data.rates.VEF_BLKMKT * conversion.value
      coinValue.ves_eur = exchangeGet.data.rates.EUR
      coinValue.era_cop = exchangeGet.data.rates.COP
      coinValue.era_eur = exchangeGet.data.rates.EUR
      coinValue.era_pen = exchangeGet.data.rates.PEN
      coinValue.era_clp = exchangeGet.data.rates.CLP
      coinValue.usd_btc = cryptoGet.data.BTC.USD
      coinValue.eur_btc = cryptoGet.data.BTC.EUR
      coinValue.eur_eth = cryptoGet.data.ETH.EUR
      coinValue.eur_ltc = cryptoGet.data.LTC.EUR
      coinValue.usd_ltc = cryptoGet.data.LTC.USD
      coinValue.usd_eth = cryptoGet.data.ETH.USD
    }))
    .catch(error => {
      console.log(error)
      isError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
})

function coinFormat([lang, currency, digits, value]: [string, string, number, number]) {
  if (isNaN(value)) {
    switch (currency) {
      case 'VES':
        return 'Bs. 0,00';
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
      case 'EUR':
        return '€ 0,00';
        break;
    }
  } else {
    return Intl.NumberFormat(lang, { style: 'currency', currency: currency, minimumFractionDigits: digits }).format(value);
  }
}
</script>

<template>
  <div v-if="isError"
    class="relative w-screen h-screen font-instrument flex justify-center items-center bg-royal">
    <p class=" w-8/12 text-center text-white font-semibold text-4xl">
      No fue posible obtener el valor de las monedas,
      revise su conexión a internet o inténtalo mas tarde.
    </p>
  </div>

  <div v-else-if="isLoading"
    class="relative w-screen h-screen font-instrument flex justify-center items-center bg-royal">
    <p class="text-center font-semibold text-4xl uppercase text-color-change">CARGANDO</p>
  </div>

  <main v-else class="relative flex gap-1 p-1 w-full h-screen font-instrument overflow-hidden">
    <Coin :coinVal="coinValue" :coinFormat="coinFormat" @showPrices="showPrices" :isPrices="isPrices" />

    <div class="relative bg-royal flex flex-col justify-start tems-center gap-2 p-1 w-full md:w-10/12 h-full rounded-lg overflow-hidden">
      <div class="relative w-full h-24 bg-white flex justify-center items-center rounded-lg text-gray-500 font-semibold text-xl md:text-4xl uppercase">
        <p>Conversor de divisas y criptos</p>
        
        <div
          :class="[{ 'notes-hidden': isActive != true, 'notes-open': isActive != false }, 'absolute left-0 top-0 flex flex-col items-center justify-center w-full h-auto md:h-full overflow-hidden bg-gray-800 rounded-lg']">
          <p class="text-center text-royal font-semibold text-lg md:text-2xl">El valor de las divisas es proporcionado por
            <a class="text-gray-300 hover:text-gray-400 transition duration-200" target="_blank"
              href="https://openexchangerates.org/" rel="noreferrer">openexchangerates.org</a>.
          </p>
          <p class="text-center text-royal font-semibold text-lg md:text-2xl">El valor de las criptomonedas es proporcionado por
            <a class="text-gray-300 hover:text-gray-400 transition duration-200" target="_blank"
              href="https://cryptocompare.com/" rel="noreferrer">cryptocompare.com</a>.
          </p>
        </div>
      </div>

      <span
        :class="[{ 'invisible': isPrices != false }, 'absolute left-2 top-2 flex md:hidden justify-center items-center bg-royal w-8 md:w-10 h-8 md:h-10 text-white font-semibold rounded-lg text-2xl hover:bg-gray-400 cursor-pointer transition duration-200']"
        @click="showPrices">
        <i class="text-lg fa-solid fa-coins"></i>
      </span>

      <span
        :class="[{ 'invisible': isActive != false }, 'absolute right-2 top-2 flex justify-center items-center bg-royal w-8 md:w-10 h-8 md:h-10 text-white font-semibold rounded-lg text-2xl hover:bg-gray-400 cursor-pointer transition duration-200']"
        @click="showNotes">
        <i class="text-lg fa-solid fa-question"></i>
      </span>
      
      <CoinSelect :coinVal="coinValue" :coinFormat="coinFormat" />
    </div>
    
    <div
      class="fixed border-l-2 border-t-2 border-royal bottom-0 right-0 hidden md:flex flex-col gap-2 items-center justify-center bg-white rounded-tl-lg p-1 w-32 h-auto overflow-hidden">
      <p class="relative text-lg">Hecho por</p>
      <a class="border border-black bg-gray-500 bg-opacity-0 w-12 h-12 rounded-lg hover:bg-opacity-75 transition duration-200"
        href="https://njrzr.github.io" target="_blank" rel="noreferrer"><img id="logos" class="w-full h-full" src="./assets/logo.svg"
          title="ZERO+PLUS" alt="Logo de creador" /></a>
      <p class="text-base">&copy; 2019 - {{ date }}</p>
    </div>
  </main>
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

.text-color-change {
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
