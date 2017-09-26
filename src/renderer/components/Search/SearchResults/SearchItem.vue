<template lang="html">
    <Row style="flex" :gutter="8" class="searchItem">
      <Col span="2" class="img">
        <img src="~@/assets/stock.jpg" />
      </Col>
      <Col span="5" class="info">
        <Row class="name"> {{ name }}</Row>
        <Row class="set"> {{ set }}</Row>
      </Col>
      <Col span="16" class="prices">
        <Table :columns="columns" :data="rows"
          :loading="loading" size="small"></Table>
      </Col>
    </Row>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      stores: ['CFB', 'SCG'],
      loading: false,
      name: 'Goblin Guide',
      set: 'Zendikar'
    }
  },
  computed: {
    columns () {
      let cols = [
        {
          key: 'info',
          title: ' ',
          fixed: 'left',
          width: 100,
          render (h, params) {
            return h('strong', params.row.info)
          }
        }
      ]

      for (var i = 0, len = this.stores.length; i < len; i++) {
        cols.push({
          key: this.stores[i],
          title: this.stores[i]
        })
      }

      return cols
    },
    rows () {
      let stock = {
        info: 'Stock'
      }
      let sell = {
        info: 'Sell'
      }
      let buy = {
        info: 'Buy'
      }
      for (let i = 0, len = this.stores.length; i < len; i++) {
        let store = this.stores[i]
        stock[store] = this.data.stock[store]
        sell[store] = this.data.sell[store]
        buy[store] = this.data.buy[store]
      }

      return [stock, sell, buy]
    }
  }
}
</script>

<style lang="css">
.img img {
  max-height: 120px;
  max-width: 60px;
}
.name {
  font-size: 1.35em;
  font-weight: bold;
}
.set {
  font-size: 1.05em;
  font-style:italic;
}

.searchItem{
  padding-top: 10px;
  padding-bottom:10px;
}
</style>
