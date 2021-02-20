<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col mb-2" v-for="filter in filters">
      <label class="">
        {{filter.title}}
        <div class="flex flex-row" v-for="value in filter.values"><input :type="filter.type" :value="value.slug" :v-model="filter.slug">{{value.title}}
        </div>
      </label></div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {

      }
    },
    computed: {
      filters() {
        return this.$store.state.filters.types
      },

    },
    mounted() {
      console.log(this.filters);
    },
    methods: {}
  }
</script>

<style scoped>

</style>
