<template lang="html">
    <div id="search">
      <Row class="searchbar" type="flex" justify="center">
        <Col span="20">
          <Input size="large" v-model="search" icon="ios-search"
            placeholder="Search" @on-enter="submitSearch">
          </Input>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="20">
          <search-options @change="updateOptions"/>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="20">
          <search-results/>
        </Col>
      </Row>
    </div>
</template>

<script>
import SearchOptions from './Search/SearchOptions'
import SearchResults from './Search/SearchResults'
import querystring from 'querystring'
import request from 'request-promise'
import cheerio from 'cheerio'
import '../../js/cfb.js'

export default {
  components: {
    SearchOptions,
    SearchResults
  },
  methods: {
    updateOptions (newVal) {
      this.options = newVal
    },
    submitSearch () {
      console.log('submitted')
      this.searchCFB('goblin guide')
    },
    searchCFB (cardname) {
      function extractCardData (html) {
        let $ = cheerio.load(html)
        $('body')
      }

      let query = querystring.stringify({
        query: 'goblin guide'
      })
      return new Promise((resolve, reject) => {
        request('http://store.channelfireball.com/products/search?' + query)
          .then(extractCardData)
      })
    }
  },
  data () {
    return {
      search: '',
      searchResult: '',
      options: []
    }
  }
}
</script>

<style lang="css">
</style>
