<template lang="html">
    <div id="search">
      <Row class="searchbar" type="flex" justify="center">
        <Col span="20">
          <Input size="large" v-model="search" icon="ios-search"
            placeholder="Search" @on-enter="submitSearch"
            @on-click="submitSearch">
          </Input>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="20">
          <search-options @change="updateOptions"/>
          {{ cfb }}
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="20">
          <search-results :search-results="mock"/>
        </Col>
      </Row>
    </div>
</template>

<script>
import SearchOptions from './Search/SearchOptions'
import SearchResults from './Search/SearchResults'
import cfbUtils from '../../js/cfb.js'

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
      this.searchCFB(this.search)
    },
    searchCFB (cardname) {
      console.log('executing search')
      cfbUtils.search(cardname)
        .then(
          (result) => { this.cfb = result }
        )
    }
  },
  data () {
    return {
      search: '',
      searchResult: '',
      options: [],
      cfb: 'cfb placeholder',
      mock: [
        {
          name: 'Goblin Guide',
          set: 'Zendikar',
          img: '',
          stock: {
            'CFB': 1,
            'SCG': 1
          },
          sell: {
            'CFB': 9.99,
            'SCG': 10.99
          },
          buy: {
            'CFB': 2.00,
            'SCG': 1.00
          }
        }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
