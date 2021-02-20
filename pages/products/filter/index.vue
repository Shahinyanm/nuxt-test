<template>
    <div class="flex flex-col items-center">
        <div class="flex flex-col mb-2 gap-8">
            <div :key="index" class="w-full flex flex-col items-start justify-start" v-for="(filter,index) in filters">
              <label class="text-18 font-medium text-black mb-2">{{filter.title}} </label>
                <div class="flex items-center mr-4 mb-4" v-for="(value,filterIndex) in filter.values" >
                    <input :id="`radio${filterIndex}`" checked class="hidden" name="radio" type="radio"/>
                    <label :for="`radio${filterIndex}`" class="flex items-center cursor-pointer">
                        <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                        {{value.title}}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        filters: 'filters/getFilterTypes',
      }),
    },
    mounted () {
      console.log(this.filters)
    },
    methods: {},
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

    input[type="radio"]:checked + label span {
        background-color: #3490DC;
    }

    input[type="radio"]:checked + label {
        color: #3490DC;
    }

</style>
