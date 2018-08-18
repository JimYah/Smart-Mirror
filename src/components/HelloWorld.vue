<template>
<div id="smart-mirror">

</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  mounted () {
    this.speakInit()
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
