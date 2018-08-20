<template>
<div id="smart-mirror">
  <div v-if="weatherData" class="weather-wrap">
    <div class="weather-position">
      <p class="country" v-text="country"></p>
      <p class="city" v-text="city"></p>
      <p class="date">
        {{ currentCondition.date | dateFilter }}
      </p>
    </div>
    <div class="weather-image">
      <img :src="weatherStatus[currentCondition.code]" alt="">
    </div>
    <div class="weather-content">
      <div class="weather-content__temperature">
        {{ currentCondition.temp | c }}
      </div>
      <div class="weather-content__range">
        <span class="low-temp" v-text="minTemp"></span>
        <span> ~ </span>
        <span class="height-temp" v-text="maxTemp"></span>
      </div>
    </div>
    <ul class="feature-weather">
      <li
        class="weather"
        v-for="weather in weatherForecast"
        :key="weather.date"
      >
        <p class="day" v-text="weekday[new Date(weather.date).getDay()]"></p>
        <img :src="weatherStatus[weather.code]" alt="" class="image">
        <p class="high-temp">
          {{ weather.high | c }}
        </p>
        <p class="low-temp">
          {{ weather.low | c }}
        </p>
      </li>
    </ul>
  </div>
  <TodoList></TodoList>
</div>
</template>

<script>
import { getWeather, getLocation } from '@/utils/apis/weather'
import TodoList from './TodoList'

export default {
  name: 'HelloWorld',
  data () {
    return {
      weatherData: null,
      weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weatherStatus: {
        '27': require('../assets/weather-cloud.gif'),
        '4': require('../assets/weather-thundstorm.gif'),
        '47': require('../assets/weather-afternoon-rain.gif'),
        '32': require('../assets/weather-sunny.gif'),
        '24': require('../assets/weather-gale.gif')
      }
    }
  },
  components: {
    TodoList
  },
  computed: {
    maxTemp () {
      let temp = this.weatherForecast.map(temps => Number(temps.high))

      return Math.ceil((Math.max(...temp) - 32) * 5 / 9) + '℃'
    },
    minTemp () {
      let temp = this.weatherForecast.map(temps => Number(temps.low))

      return Math.ceil((Math.min(...temp) - 32) * 5 / 9) + '℃'
    },
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
      return this.weatherData.item.forecast.slice(1, 6)
    }

  },

  filters: {
    c (f) {
      const temp = Math.ceil((f - 32) * 5 / 9)
      return `${temp}℃`
    },
    dateFilter (date) {
      return new Date(date).toLocaleDateString()
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
@font-face
  font-family: MarkPro-Bold
  src: url('https://cdn.shopify.com/s/files/1/0274/8717/files/MarkPro-Bold.otf?12401685184872946130')

@font-face
  font-family: NotoSansCJKtc-Bold
  src: url('https://cdn.shopify.com/s/files/1/0274/8717/files/NotoSansCJKtc-Bold.otf?12610878586689504297')

@font-face
  font-family: MarkPro
  src: url('https://cdn.shopify.com/s/files/1/0274/8717/files/MarkPro.otf?4269257120200746974')

@font-face
    font-family: NotoSansCJKtc-Regular
    src: url(https://cdn.shopify.com/s/files/1/0274/8717/files/NotoSansCJKtc-Regular.otf?4935245772218057441)

img
  width: 100%
  height: auto
  display: block

#smart-mirror
  position: relative
  width: 100%
  height: 100vh
  font-family: 'MarkPro-Bold', 'NotoSansCJKtc-Bold'
  color: #FFF
  background-color: #000

.weather-wrap
  position: absolute
  bottom: 0
  left: 0
  width: 25%
  display: flex
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  box-sizing: border-box
  transform: rotate(-90deg) translate(0%, 10%)

  .weather-position
    display: flex
    align-items: center
    justify-content: flex-start
    flex-wrap: wrap
    width: 100%

    .country, .city
      font-size: 28px

    .country
      margin-right: 10px

    .date
      width: 100%
      margin-top: 10px
      font-size: 20px

  .weather-image
    width: 49%

  .weather-content
    width: 49%

    &__temperature
      font-size: 60px

    &__range
      margin-top: 10px

.feature-weather
  width: 100%
  display: flex
  justify-content: flex-start
  align-items: center

  .weather
    width: 25%
    display: flex
    align-items: center
    justify-content: flex-start
    flex-direction: column

    .high-temp,
    .low-temp
      font-family: 'MarkPro', 'NotoSansCJKtc-Regular'

    .high-temp
      margin-bottom: 10px
      color: #2aabe4

    .day
      color: #808080
</style>
