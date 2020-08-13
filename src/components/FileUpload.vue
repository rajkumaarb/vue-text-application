<template>
  <div>
    <label class="button-class">
      Upload a Text File
      <input type="file" accept=".txt" @change="uploadAndReadFile"/>
    </label>
    <span class="error-message" v-once v-if="showErrorMessage">Upload Only Text Files!!</span>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
export default {
  name: 'FileUpload',
  setup (props, { emit }) {
    const showErrorMessage = ref(false)

    const uploadAndReadFile = (event) => {
      const FILETOREAD = event.target.files[0]
      if (FILETOREAD.name.indexOf('.txt') === -1) {
        showErrorMessage.value = true
        emit('load', '')
      } else {
        emit('load', '')
        showErrorMessage.value = false
        const FILEREADER = new FileReader()

        FILEREADER.onload = e => emit('load', e.target.result)
        FILEREADER.readAsText(FILETOREAD)
      }
    }

    return {
      showErrorMessage,
      uploadAndReadFile
    }
  }
}
</script>
<style scoped>
.button-class {
  position: relative;
  background-color: #42b983;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0px 0px 40px;
}
.button-class input {
  opacity: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
.error-message {
  color: red;
  padding-left: 10px;
}
</style>
