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
  props: {
    searchResults: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      stores: ['CFB', 'SCG']
    }
  },
  methods: {}
}
</script>

<style lang="css">
</style>
