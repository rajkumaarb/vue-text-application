<template>
  <div>
    <label class="button-class">
      Upload a File
      <input type="file" @change="uploadAndReadFile"/>
    </label>
  </div>
</template>
<script>
export default {
  name: 'FileUpload',
  methods: {
    uploadAndReadFile (event) {
      const FILETOREAD = event.target.files[0]
      const FILEREADER = new FileReader()

      FILEREADER.onload = e => this.$emit('load', e.target.result)
      FILEREADER.readAsText(FILETOREAD)
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
  margin: 0px 40px;
}
.button-class input {
  opacity: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
.custom-button {
  border: 0px;
  border-radius: 5px;
}
</style>
