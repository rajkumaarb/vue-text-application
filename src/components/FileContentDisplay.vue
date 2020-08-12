<template>
  <div class="my-wrapper">
    <input type="text" placeholder="Search for a word" v-model="search.text" @keyup.enter="doSearch"/>
    <button @click="clearData()">Clear</button>
    <div class="no-match-message" v-if="search.showMsg" v-once>{{search.noMatchMsg}}</div>
    <div class="word-count" v-if="search.count > 0"> Total Occurrence : {{search.count}}</div>
    <div class="my-container" v-html="displaydata"></div>
  </div>
</template>
<script>
import { reactive, ref, computed } from '@vue/composition-api'
export default {
  name: 'FileContentDisplay',
  props: ['contentdata'],
  setup (props) {
    const search = reactive({
      text: '',
      count: 0,
      noMatchMsg: 'No match found',
      showMsg: false
    })

    const toData = ref(props.contentdata)

    const doSearch = () => {
      const toSearch = new RegExp(search.text, 'ig')
      if (search.text !== '') {
        search.count = (props.contentdata.match(toSearch) || []).length
        toData.value = props.contentdata.replace(toSearch, matchedText => {
          return ('<span class=\'hghlight-word\'>' + matchedText + '</span>')
        })
        search.showMsg = search.count <= 0
      } else if (search.text === '') {
        search.showMsg = true
        clearData()
      }
    }

    const clearData = () => {
      search.text = ''
      search.count = 0
      toData.value = props.contentdata
      search.showMsg = false
    }

    const displaydata = computed(() => {
      return toData.value
    })

    return {
      search,
      doSearch,
      clearData,
      displaydata
    }
  }
}
</script>
<style scoped>
.my-container >>> .hghlight-word {
  background-color: orange;
}
.my-wrapper {
  margin: 20px 40px;
}
.my-wrapper input {
  border: 1px solid #42b983;
  border-radius: 4px;
  padding: 5px;
}
.my-wrapper button {
  background-color: #42b983;
  border: 1px solid #42b983;
  border-radius: 4px;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
}
.my-container {
  margin-top: 10px;
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: justify;
  border: 2px solid #42b983;
  border-radius: 5px;
  padding: 5px 10px;
}
.word-count {
  margin-top: 5px;
}
.no-match-message {
  margin-top: 5px;
  color: red;
}
</style>
