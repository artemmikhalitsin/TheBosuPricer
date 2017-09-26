<template lang="html">
  <div id="searchresults">
    <search-item v-for="item in searchResults" :data="item"/>
  </div>
</template>

<script>
import SearchItem from './SearchResults/SearchItem'
export default {
  components: {
    SearchItem
  },
  data () {
    return {
      searchResults: [
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
      ],
      stores: ['CFB', 'SCG']
    }
  },
  methods: {}
}
</script>

<style lang="css">
</style>
