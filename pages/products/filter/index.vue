<template>
    <div>
        asdsadasdsadad
    </div>
</template>

<script>
  export default {
    async asyncData({ params }) {
      console.log(params)
      const selectedFilters = params.filter // When calling /abc the slug will be "abc"
      return { selectedFilters }
    },
    name: 'index',
  }
</script>

<style scoped>

</style>