<template>
  <div id="app">
    <FileUpload @load="text = $event"></FileUpload>
    <FileContentDisplay v-if="text" :contentdata="text"></FileContentDisplay>
  </div>
</template>

<script>
import FileUpload from './components/FileUpload.vue'
import FileContentDisplay from './components/FileContentDisplay.vue'

export default {
  name: 'App',
  data: () => ({ text: '' }),
  components: {
    FileUpload,
    FileContentDisplay
  },
  methods: {
    updateText (text) {
      this.text = text
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
