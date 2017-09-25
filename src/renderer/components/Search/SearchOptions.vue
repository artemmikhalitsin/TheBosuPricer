<template lang="html">
  <div id="search-options">
      <Form :model="options" :label-width="50">
        <FormItem label="Sites">
          <CheckboxGroup v-model="options.sites">
            <Checkbox label="CFB"/>
            <Checkbox label="Cardkingdom"/>
            <Checkbox label="SCG (Coming soon)" disabled/>
            <Checkbox label="MKM (Coming soon)" disabled/>
          </CheckboxGroup>
        </FormItem>
      </Form>
  </div>
</template>
<script>
export default {
  props: ['opts'],
  data () {
    return {
      options: {
        stores: []
      }
    }
  }
}
</script>

<style lang="css">
</style>
