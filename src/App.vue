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
  setup () {
    const text = ''
    return { text }
  },
  components: {
    FileUpload,
    FileContentDisplay
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
}
</style>
