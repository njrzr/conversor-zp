<script setup lang="ts">
const props = defineProps(['coinVal'])

interface Coins {
  [coin: string]: [country: string, bill: string, offset: number, value: number]
}

interface Format {
  [bill: string]: string
}

let multiply: number = 1000

const coins: Coins = {
  vesToUsd: ['es-VE', 'VES', 2, props.coinVal["ves_usd"]],
  vesToEur: ['es-VE', 'VES', 2, (props.coinVal["ves_usd"] / props.coinVal["ves_eur"])],
  usdToBtc: ['en-US', 'USD', 2, props.coinVal["usd_btc"]],
  usdToEth: ['en-US', 'USD', 2, props.coinVal["usd_eth"]],
  usdToLtc: ['en-US', 'USD', 2, props.coinVal["usd_ltc"]],
  usdToAda: ['en-US', 'USD', 2, props.coinVal["usd_ada"]],
  copToUsd: ['es-CO', 'COP', 2, props.coinVal["era_cop"]],
  vesToCop: ['es-VE', 'VES', 4, (props.coinVal["ves_usd"] / props.coinVal["era_cop"]) * multiply],
  vesToPen: ['es-VE', 'VES', 2, (props.coinVal["ves_usd"] / props.coinVal["era_pen"])],
  copToVes: ['es-CO', 'COP', 2, (props.coinVal["era_cop"] / props.coinVal["ves_usd"])],
  vesToClp: ['es-VE', 'VES', 4, (props.coinVal["ves_usd"] / props.coinVal["era_clp"]) * multiply]
}

const format: Format = {
  vesToUsd: 'Bolivares por Dolar',
  vesToEur: 'Bolivares por Euro',
  usdToBtc: 'Dolares por Bitcoin',
  usdToEth: 'Dolares por Ether',
  usdToLtc: 'Dolares por Litecoin',
  usdToAda: 'Dolares por Ada',
  copToUsd: 'Pesos por Dolar',
  vesToCop: 'Bolivares por ' + multiply + ' Pesos',
  vesToPen: 'Bolivares por Sol',
  vesToClp: 'Bolivares por ' + multiply + ' CLP',
  copToVes: 'Pesos por Bolivar'
}

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
  <div class="relative grid grid-cols-4 gap-1 w-full mx-auto mt-1">
    <div v-for="coin, index in coins" key="index" class="bg-royal rounded-lg">
      <p class="p-1 text-white font-semibold">{{ format[index] }}</p>
      <p class="p-1 text-white text-right text-xl">{{ coinFormat(coin) }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
