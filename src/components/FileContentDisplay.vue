<template>
  <div class="my-wrapper">
    <input type="text" placeholder="Search for a word" v-model="searchText"/>
    <button :disabled="!searchText" @click="doSearch()" type="button">Search</button>
    <button @click="clearData()">Clear</button>
    <div class="word-count" v-if="searchCount > 0"> Total Occurrence of {{searchText}}: {{searchCount}}</div>
    <div class="my-container" v-html="displaydata"></div>
  </div>
</template>
<script>
export default {
  name: 'FileContentDisplay',
  props: ['contentdata'],
  filters: {
    myFilter: function (words, query) {
      if (query === '') {
        return
      }
      var iQuery = new RegExp(query, 'ig')
      return words.toString().replace(iQuery, function (matchedTxt, a, b) {
        return ('<span class=\'hghlight-word\'>' + matchedTxt + '</span>')
      })
    }
  },
  computed: {
    displaydata: function () {
      return this.toData
    }
  },
  data: () => ({
    searchText: '',
    searchCount: 0,
    toData: ''
  }),
  created () {
    this.toData = this.contentdata
  },
  methods: {
    doSearch () {
      const toSearch = new RegExp(this.searchText, 'ig')
      this.searchCount = (this.contentdata.match(toSearch) || []).length
      if (this.searchText !== '') {
        this.toData = this.contentdata.replace(toSearch, matchedText => {
          return ('<span class=\'hghlight-word\'>' + matchedText + '</span>')
        })
      }
    },
    clearData () {
      this.searchCount = 0
      this.searchText = ''
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
</style>
