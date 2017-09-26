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
    }
  },
  data () {
    return {
      search: '',
      options: []
    }
  }
}
</script>

<style lang="css">
</style>
