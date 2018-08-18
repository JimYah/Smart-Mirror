<template>
<div id="smart-mirror">

</div>
</template>

<script>
import { getWeather, getLocation } from '@/utils/apis/weather'

export default {
  name: 'HelloWorld',
  data () {
    return {
      weatherData: null
    }
  },

  computed: {
    country () {
      return this.weatherData.location.country
    },
    city () {
      return this.weatherData.location.city
    },
    currentCondition () {
      return this.weatherData.item.condition
    },
    currentTemp () {
      return this.currentCondition.temp
    },
    currentWeatherText () {
      return this.currentCondition.text
    },
    weatherForecast () {
      return this.weatherData.item.forecast
    }

  },

  filters: {
    c (f) {
      const temp = (f - 32) * 5 / 9
      return `${temp}℃`
    }
  },

  mounted () {
    this.speakInit()
    this.fetchWeatherData()
  },

  methods: {
    speakInit () {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = 'zh-TW'
      recognition.interimResults = false

      recognition.addEventListener('result', this.handleGetMsg)

      recognition.addEventListener('end', () => {
        recognition.start()
      })

      recognition.start()
    },
    handleGetMsg (e) {
      const last = e.results.length - 1
      const msg = e.results[last][0].transcript
      console.log(msg)
    },
    async fetchWeatherData () {
      const { latitude, longitude } = await getLocation()
      const weatherData = await getWeather(latitude, longitude)
      this.weatherData = weatherData
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
#smart-mirror
  width: 100%
  height: 100vh
  background-color: #000
</style>
