<template>
    <div class="flex flex-col items-center w-full p-8">
        <div class="flex flex-col mb-2 gap-8 p-8 ">
            <div :key="index" class="w-full flex flex-col items-start justify-start bg-gray-100"
                 v-for="(filter,index) in filters">
                <label class="text-18 font-medium text-black mb-2 p-4">{{filter.title}} </label>
                <div :key="filterIndex" @click="selectFilter(value,filter)"
                     class="flex items-center mr-4 mb-4 px-4" v-for="(value,filterIndex) in filter.values">
                    <input :class="{'bg-blue-500 text-blue-100':isSelectedFilter(value,filter)}"
                           :id="`radio_${value.slug}`" :name="filter.type" checked class="hidden "
                           type="radio"/>
                    <label :class="{'bg-blue-500 text-blue-100':isSelectedFilter(value,filter)}"
                           :for="`radio_${value.slug}`"
                           class="flex items-center cursor-pointer">
                        <span :class="{'bg-blue-500':isSelectedFilter(value,filter)}"
                              class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                        {{value.title}}</label>
                </div>
            </div>
        </div>

        <div :key="index" class="w-full text-black " v-for="(selected,index) in selectedFilters">
            {{selected}}
        </div>
    </div>
</template>
<router>
    {
    path: '/products/filter/:pol?/:kemPrihoditsja?/:povod?/:interesy?/:tipPodarka?/:professiya?'
    }
</router>
<script>
  import { mapGetters } from 'vuex'

  export default {
    async asyncData ({ params }) {
      const filterParams = params // When calling /abc the slug will be "abc"
      return { filterParams }
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        filters: 'filters/getFilterTypes',
        selectedFilters: 'filters/getSelectedFilters',
      }),
    },
    watch: {
      filterParams (value) {
        console.log('PARAMS::::', value)
      },
      selectedFilters: {
        handler (value) {
          console.log('WATCH:::::', value)
        },
        deep: true,
        immediate: true,
      },
    },
    mounted () {
      console.log(this.filters)
    },
    methods: {
      isSelectedFilter (value, type) {
        return Object.keys(this.selectedFilters).length ? Array.isArray(this.selectedFilters[type.slug])
          ? this.selectedFilters[type.slug].includes(value.slug)
          : this.selectedFilters[type.slug] === value.slug : false
      },
      selectFilter (filter, parent) {

        this.$store.dispatch('filters/ACT_SELECT_FILTER', { filter: filter, parent: parent }).then(response=>{
         let params = this.$route.params
         params[parent.slug] = filter.slug

          this.$router.push({name:'products-filter',params:params})
        })
      },
    },
  }
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;

    }

    input[type="radio"] + label span {
        transition: background .2s,
        transform .2s;
    }

    input[type="radio"] + label span:hover,
    input[type="radio"] + label:hover span {
        transform: scale(1.2);
    }


</style>
