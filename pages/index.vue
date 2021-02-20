<template>
  <div class="w-full h-full bg-white">
      <nuxt-link to="/products/filter">Filters</nuxt-link>
  </div>
</template>

<script>
  export default {
    async asyncData({ params }) {
      console.log(params,'ssss')
      const selectedFilters = params.filter // When calling /abc the slug will be "abc"
      return { selectedFilters }
    },
    name: '_filter',

    mounted () {
      console.log(this.slug,'sss')
      console.log('TEST::::::')
    }

  }
</script>

<style scoped>

</style>
