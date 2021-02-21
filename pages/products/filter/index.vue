<template>
    <div class="flex flex-col items-center w-full p-8">
        <div class="flex flex-col mb-2 gap-8 p-8 ">
            <div :key="index" class="w-full flex flex-col items-start justify-start bg-gray-100"
                 v-for="(filter,index) in filters">
                <template v-if="filter.type ==='radio'">
                    <label class="text-18 font-medium text-black mb-2 p-4">{{filter.title}} </label>
                    <div :key="filterIndex"
                         class="flex items-center mr-4 mb-4 px-4"
                         v-for="(value,filterIndex) in getByCondition(filter.values)">
                        <input :class="{'bg-blue-500 text-blue-100':isSelectedFilter(value,filter)}"
                               :id="`radio_${value.slug}`"
                               :name="filter.type" @click="selectFilter(value,filter)" checked class="hidden "
                               type="radio"/>
                        <label :class="{'text-blue-900':isSelectedFilter(value,filter)}"
                               :for="`radio_${value.slug}`"
                               class="flex items-center cursor-pointer">
                        <span :class="{'bg-blue-500':isSelectedFilter(value,filter)}"
                              class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                            {{value.title}}</label>
                    </div>
                </template>
                <template v-else>
                    <label :key="filterIndex" class="flex justify-start items-start"
                           v-for="(value,filterIndex) in getByCondition(filter.values)">
                        <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                            <input :checked="isSelectedFilter(value,filter)" @click="selectFilter(value,filter)" class="opacity-0 absolute"
                                   type="checkbox">
                            <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
                                 viewBox="0 0 20 20">
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                            </svg>
                        </div>
                        <div class="select-none">{{value.title}}</div>
                    </label>

                </template>
            </div>
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
    async asyncData({ params }) {
      return { params }
    },
    computed: {
      ...mapGetters({
        filters: 'filters/getFilterTypes',
        selectedFilters: 'filters/getSelectedFilters',
      }),
    },
    watch: {
      params: {
        handler (value) {
          Object.keys(value).forEach(param => {
            if (typeof value[param] !== 'undefined') {
              let splitParams = value[param].split('_')
              let type = this.filters.filter(filter => filter.slug === splitParams[0])[0].type
              let filterType = splitParams[0]
              if (type === 'checkbox') {
                this.$store.dispatch('filters/ACT_SELECT_FILTER', { filter: splitParams, type: filterType })
              } else {
                if (this.selectedFilters[filterType] !== splitParams[1]) {
                  this.$store.dispatch('filters/ACT_SELECT_FILTER', { filter: splitParams[1], type: filterType })
                }
              }
            }
          })
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      getByCondition (filters) {
        return filters.filter(item => {
          if (!item.condition) return true

          let conditions = item.condition.split('==')
          let filterCondition = conditions[1].replace(/[\[\]']+/g, '')
          let selectedFilter = this.selectedFilters[conditions[0]]

          return typeof selectedFilter === 'undefined' || `"${selectedFilter}"` === filterCondition
        })
      },
      isSelectedFilter (value, type) {
        return Object.keys(this.selectedFilters).length ? Array.isArray(this.selectedFilters[type.slug])
          ? this.selectedFilters[type.slug].includes(value.slug)
          : this.selectedFilters[type.slug] === value.slug : false
      },
      selectFilter (filter, parent) {
        if (parent.type === 'radio') {
          this.$store.dispatch('filters/ACT_SELECT_FILTER', { filter: filter.slug, type: parent.slug }).then(() => {
            let params = this.$route.params
            params[parent.slug] = `${parent.slug}_${filter.slug}`
            this.$router.push({ name: 'products-filter', params: params })
          })
        } else {
          let data = []
          let selected = this.selectedFilters[parent.slug]
          if (!selected) {
            data.push(filter.slug)
          } else {
            selected.forEach(item => {
              data.push(item)
            })
            let index = data.indexOf(filter.slug)
            if (index !== -1) {
              data.splice(index, 1)
            } else {
              data.push(filter.slug)
            }
          }
          this.$store.dispatch('filters/ACT_SELECT_FILTER', { filter: data, type: parent.slug }).then(() => {
            let params = this.$route.params
            params[parent.slug] = data.length ? `${parent.slug}_${data.join('_')}` : null
            this.$router.push({ name: 'products-filter', params: params })
          })
        }
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

    input:checked + svg {
        display: block;
    }
</style>
