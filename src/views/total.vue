<template>
    <div class="border-l-2 p-2" :class="{'bg-green-lightest border-green' : current > investment, 'bg-red-lightest border-red': investment > current}" >
        <div class="w-full py-1 flex flex-wrap justify-between">
            <span class="w-5/6 text-grey-darkest">Total Stocks:  
                <span class="font-bold">{{ total | comma }}</span>
            </span>
            <div class="w-1/6">
                <Add/>
            </div>
        </div>
        <div class="w-full py-1">
            <span class="text-grey-darkest">No. of Shares:  
                <span class="font-semibold">{{ count | comma }}</span>
            </span>
        </div>
        <div class="w-full py-1">
            <span class="text-grey-darkest">Average buying price: Rs 
                <span class="font-semibold"> {{ average | price }}</span>
            </span>
        </div>
        <div class="w-full py-1">
            <span class="text-grey-darkest">Investment: Rs 
                <span class="font-semibold">{{ investment | price }}</span>
            </span>
        </div>
        <div class="w-full py-1">
            <span class="text-grey-darkest">Total current value: Rs 
                <span class="font-semibold">{{ current | price }}</span>
            </span>
        </div>
        <div class="w-full py-1 flex flex-wrap justify-between" v-if="current != investment">
            <span class="text-grey-darkest">Current status: Rs 
                <span class="font-semibold">{{ current - investment | price }}</span>
            </span>
            <span class="p-1 rounded font-semibold" :class="{'bg-green-lighter text-green-darker' : current > investment, 'bg-red-lighter text-red-darker': investment > current}" v-html="current*1 > investment*1 ? 'In profit' : 'In Loss'"></span>
        </div>
    </div>
</template>
<script>
import Add from "./add";
import {  mapGetters } from "vuex";

export default {
  components: {
    Add
  },
  computed: {
    name() {
      return "some";
    },
    ...mapGetters([
      "total",
      "count",
      "average",
      "investment",
      "current",
      "status"
    ])
  }
};
</script>

