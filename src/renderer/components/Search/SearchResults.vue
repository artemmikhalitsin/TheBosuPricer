<template lang="html">
  <div id="search results">
      <Button v-on:click="setColumns">Click</Button>
      <Table :columns="columns" :data="data" :loading="loading"></Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      storelist: [],
      loading: false,
      columns: [],
      data: []
    }
  },
  methods: {
    setColumns: function () {
      this.columns = [
        {
          title: ' ',
          key: 'img',
          width: 50
        },
        {
          title: 'Card',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('strong', {
                style: {
                  'font-size': '1.2em'
                }
              }, params.row.name),
              h('br'),
              h('p', params.row.set)
            ])
          }
        }
      ]

      for (var i = 0, len = this.storelist.length; i < len; i++) {
        let store = this.storelist[i]
        this.columns.push({
          title: store,
          key: store,
          width: 50,
          render: this.renderPriceQty(store)
        })
      }
    },
    renderPriceQty: function (storename) {
      return function (h, params) {
        return h('div', [
          h('p', params.row.stores[storename].NMPrice),
          h('p', params.row.stores[storename].quantity + ' in stock')
        ])
      }
    }
  }
}
</script>

<style lang="css">
</style>
