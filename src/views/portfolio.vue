<template>
    <div class="border-b border-l border-r border-red-dark p-2" >
        <div class="w-full flex flex-wrap border-b py-2 justify-between">
        <h4 class="w-3/4 cursor-pointer sortable">
            <span v-html="full_name"></span> (Rs. <span v-html="current_price"></span>)
        </h4>
        <div class="w-1/4">
           <div class="w-full flex flex-wrap justify-around">
                <font-awesome-icon class="cursor-pointer" :class="{'text-green-dark' : edit, 'text-blue-dark': !edit}" :icon="edit ? 'check' : 'edit'" @click="edit = !edit" />
                <font-awesome-icon class="cursor-pointer text-green-dark" icon="plus" @click="add(portfolio[0])"/>
                <font-awesome-icon class="cursor-pointer text-red-dark" icon="trash" v-confirm="'Are you sure?'" @click="bulkDelete(code)" />
           </div>
        </div>
        </div>
        <div class="w-full py-2">
            <table class="w-full text-center border ">
                <thead>
                    <tr class="border-b">
                        <th class="py-2 border-r">
                            Shares
                        </th>
                        <th class="py-2 border-r">Bought at</th>
                        <th class="py-2 border-r">Amount</th>
                        <th v-if="edit" class="py-2 border-r">Action</th>
                        <th v-if="!edit">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="each in portfolio" :key="each.key" class="text-center border-b" :class="{'bg-red-lighter text-red-darker': portfolio.length == 1 && total_current_value <= total_investment, 'bg-green-lighter text-green-darker': portfolio.length == 1 && total_current_value > total_investment}" >
                        <td class="text-center border-r p-2">
                            <input type="number" step="10" class="w-24 p-1 border text-center" v-if='edit' @change="enter({key: each.key, count: $event.target.value})" :value='each.count'>
                            <span v-else v-html="each.count || 0"></span>
                        </td>
                        <td class="text-center border-r p-2">
                            <input type="number" step="10" class="w-24 p-1 border text-center" v-if="edit" @change="enter({key: each.key, price: $event.target.value})" :value='each.price'>
                            <span v-else v-html="each.price || 0"></span>
                        </td>
                        <td v-html="each.count * each.price" class="text-center border-r p-2"></td>
                        <td v-if="edit" class="text-center border-r p-2">
                            <button @click="deleter(each.key)" v-confirm="'Are you sure?'">
                                <font-awesome-icon class="text-red" icon="trash" />
                            </button>
                        </td>
                        <td v-if="!edit">
                            <span v-html="each.count * current_price"></span>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="portfolio.length > 1" class="bg-green-lighter text-green-darker" :class="{'bg-red-lighter text-red-darker': total_current_value <= total_investment}">
                    <tr>
                        <td class="text-center border-r p-2" v-html="total_no_of_shares"></td>
                        <td class="text-center border-r p-2" v-html="average_buying_price"></td>
                        <td class="text-center border-r p-2" v-html="total_investment"></td>
                        <td v-if="edit" class="text-center border-r p-2" v-html="status"></td>
                        <td v-if="!edit">
                            <span v-html="total_current_value"></span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import _ from 'lodash';
export default {
  name: "portfolio",
  props: ["portfolio"],
  computed: {
    full_name() {
      return this.portfolio[0].name;
    },
    current_price(){
        return _.find(this.$store.state.companies, {code: this.code}).latest_share_price;
    },
    code() {
      return this.portfolio[0].code;
    },
    total_no_of_shares() {
      return _.sum(
        _.map(this.portfolio, "count").map(num => parseInt(num, 10))
      );
    },
    total_current_value(){
        return this.total_no_of_shares * this.current_price;
    },
    average_buying_price() {
      return Math.round(
        _.mean(
          _.map(this.portfolio, "price")
            .filter(Boolean)
            .map(num => parseInt(num, 10))
        ) || 0
      );
    },
    total_investment() {
      return _.sum(
        this.portfolio.map(portfolio => portfolio.count * portfolio.price)
      );
    },
    status() {}
  },
  methods: {
    ...mapMutations(["bulkDelete", "add", "deleter", "enter"])
  },
  data() {
    return {
      edit: false
    };
  }
};
</script>