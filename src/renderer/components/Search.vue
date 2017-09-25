<template lang="html">
    <div id="search">
      <Row class="searchbar" type="flex" justify="center">
        <Col span="20">
          <Input size="large" v-model="search" placeholder="Search">
               <Button slot="append" icon="ios-search"></Button>
          </Input>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="20">
          <search-options/>
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
    updateSearchOptions: function (newOptions) {
      this.options = newOptions
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
