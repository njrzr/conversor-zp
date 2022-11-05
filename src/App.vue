<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Coin from './components/Coin.vue'
import CoinSelect from './components/CoinSelect.vue'
import axios from 'axios'

interface URL {
  [key: string]: string;
}

interface CoinValue {
  [key: string]: number | null;
}

const url: URL = {
  exchange: 'https://openexchangerates.org/api/latest.json?app_id=ae86587758744760bca3f3f4107b2369&show_alternative=1&symbols=COP,EUR,VEF_BLKMKT,PEN,CLP',
  crypto: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ADA,LTC&tsyms=USD,EUR,COP,VES,CLP,PEN&api_key={4a8910b13d689849c08919735481e44ff67190790f102938ee30e1a95169ae70}',
}

let coinValue: CoinValue = {
  ves_usd: null,
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
  eur_ltc: null,
  usd_ada: null
}

let isError = ref<boolean>(false)
let isLoading = ref<boolean>(true)
let isActive = ref<boolean>(false)
let date = new Date().getFullYear()

function showNotes() {
  isActive.value = !isActive.value
  setTimeout(() => {
    isActive.value = !isActive.value
  }, 3000)
}

onMounted(() => {
  axios
    .all([axios.get(url.exchange), axios.get(url.crypto)])
    .then(axios.spread((exchangeGet, cryptoGet) => {
      coinValue.ves_usd = exchangeGet.data.rates.VEF_BLKMKT
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
      coinValue.usd_ada = cryptoGet.data.ADA.USD
    }))
    .catch(error => {
      console.log(error)
      isError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div v-if="isError"
    class="relative mx-auto mt-1 w-10/12 h-20 font-poppins flex items-center justify-center bg-royal rounded-lg px-4 py-2">
    <p class="text-center text-white font-semibold text-xl">No fue posible obtener el valor de las monedas,
      revise su conexión a internet o inténtalo mas tarde.</p>
  </div>

  <div v-else-if="isLoading"
    class="relative mx-auto mt-1 w-10/12 h-20 font-poppins flex items-center justify-center bg-royal rounded-lg px-4 py-2">
    <p class="text-center font-semibold text-4xl uppercase text-gradient">CARGANDO</p>
  </div>

  <main v-else class="relative grid mx-auto mt-1 w-10/12 font-poppins">
    <div
      class="relative flex items-center justify-center gap-2 bg-royal rounded-lg px-4 py-2 w-full h-20 overflow-hidden">
      <p class="text-center text-white font-semibold text-4xl uppercase">Conversor de divisas y criptos</p>
      <span
        :class="[{ 'invisible': isActive != false }, 'bg-white', 'text-royal', 'font-semibold', 'rounded-full', 'text-2xl', 'px-3.5', 'py-1', 'hover:bg-gray-200', 'cursor-pointer', 'transition', 'duration-200']"
        @click="showNotes">?</span>
      <div
        :class="[{ 'notes-hidden': isActive != true, 'notes-open': isActive != false }, 'absolute', 'flex', 'flex-col', 'items-center', 'w-full', 'overflow-hidden', 'bg-royal']">
        <p class="text-center text-white font-semibold text-2xl">El valor de las divisas es proporcionado por
          <a class="text-gray-300 hover:text-gray-400 transition duration-200" target="_blank"
            href="https://openexchangerates.org/" rel="noreferrer">openexchangerates.org</a>.
        </p>
        <p class="text-center text-white font-semibold text-2xl">El valor de las criptomonedas es proporcionado por
          <a class="text-gray-300 hover:text-gray-400 transition duration-200" target="_blank"
            href="https://cryptocompare.com/" rel="noreferrer">cryptocompare.com</a>.
        </p>
      </div>
    </div>
    <Coin :coinVal="coinValue" />
    <CoinSelect :coinVal="coinValue" />
    <div
      class="relative flex items-center justify-center gap-2 bg-royal rounded-lg px-4 py-2 w-full h-20 overflow-hidden mt-1">
      <p class="text-white text-xl">WebApp creada por:</p>
      <a class="m-2 w-16 h-16 rounded-lg hover:bg-gray-300 hover:bg-opacity-80 transition duration-300"
        href="https://njrzr.github.io" target="_blank" rel="noreferrer"><img id="logos" src="images/logo.png"
          title="ZERO+PLUS" alt="Logo de creador" /></a>
      <p class="text-white text-xl">&copy; ZERO+PLUS 2019 - {{ date }}</p>
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
