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
          <p>{{ cfb }}</p>
          <p>{{ cardkingdom }}</p>
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
import ckUtils from '../../js/cardkingdom.js'

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
      cfbUtils.search(this.search)
        .then((data) => { this.cfb = data })
      ckUtils.search(this.search)
        .then((data) => { this.cardkingdom = data })
    },
    searchCFB (cardname) {
      console.log('executing search')
      cfbUtils.search(cardname)
      ckUtils.search(cardname)
    }
  },
  data () {
    return {
      search: '',
      searchResult: '',
      options: [],
      cfb: 'cfb placeholder',
      cardkingdom: 'cardkingdom placeholder',
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
