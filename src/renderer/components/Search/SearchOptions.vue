<template lang="html">
  <div id="search-options">
      <Form :model="options" :label-width="50">
        <FormItem label="Sites">
          <CheckboxGroup v-model="stores">
            <Checkbox label="CFB"/>
            <Checkbox label="Cardkingdom"/>
            <Checkbox label="SCG (Coming soon)" disabled/>
          </CheckboxGroup>
        </FormItem>
      </Form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      storeorder: {
        'SCG': 1,
        'CFB': 2,
        'Cardkingdom': 3
      },
      stores: ['CFB', 'Cardkingdom']
    }
  },
  mounted () {
    // When component is created, set the search options to default
    this.$emit('change', this.options)
  },
  computed: {
    options () {
      return {
        stores: this.stores.sort(this.storesort)
      }
    }
  },
  watch: {
    options (newVal) {
      this.$emit('change', newVal)
    }
  },
  methods: {
    storesort: function (a, b) {
      return this.storeorder[a] - this.storeorder[b]
    }
  }
}
</script>

<style lang="css">
</style>
