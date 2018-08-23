<template>
    <div v-on:dblclick="(edit=!edit)" @click.ctrl.exact="add(portfolio[0])"  class="border-b border-l-2 p-2 bg-grey-lightest" :class="{ 'border-red-dark':total_current_value <= total_investment, 'border-green-dark':total_current_value > total_investment  }" >
        <div class="w-full flex flex-wrap border-b py-2 justify-between">
        <h4 @click.shift.exact="bulkDelete(code)" class="w-3/4 cursor-pointer sortable">
            <span v-html="full_name"></span> (Rs. <span v-html="current_price"></span>)
        </h4>
        <div class="w-1/4">
           <div class="w-full flex flex-wrap justify-around">
                <font-awesome-icon class="cursor-pointer" :class="{'text-green-dark' : edit, 'text-blue-dark': !edit}" :icon="edit ? 'check' : 'edit'" @click="edit = !edit" />
                <font-awesome-icon class="cursor-pointer text-green-dark" icon="plus" @click="add(portfolio[0])"/>
                <font-awesome-icon class="cursor-pointer text-red" icon="trash" v-confirm="'Are you sure?'" @click="bulkDelete(code)" />
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
                    <tr @click.shift.exact="deleter(each.key)" v-for="each in portfolio" :key="each.key" class="text-center border-b" :class="{'bg-red-lighter text-red-darker': portfolio.length == 1 && total_current_value <= total_investment, 'bg-green-lighter text-green-darker': portfolio.length == 1 && total_current_value > total_investment}" >
                        <td class="text-center border-r p-2">
                            <input type="number" step="10" class="w-24 p-1 border text-center" v-if='edit' @change="enter({key: each.key, count: $event.target.value})" :value='each.count'>
                            <span v-else> {{  each.count  | price }}</span>
                        </td>
                        <td class="text-center border-r p-2">
                            <input type="number" step="10" class="w-24 p-1 border text-center" v-if="edit" @change="enter({key: each.key, price: $event.target.value})" :value='each.price'>
                            <span v-else> {{  each.price | price }}</span>
                        </td>
                        <td class="text-center border-r p-2"> {{ (each.count * each.price) | price }}</td>
                        <td v-if="edit" class="text-center border-r p-2">
                            <button @click="deleter(each.key)" v-confirm="'Are you sure?'">
                                <font-awesome-icon class="text-red" icon="trash" />
                            </button>
                        </td>
                        <td v-if="!edit">
                            <span> {{ each.count * current_price | price }}</span>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="portfolio.length > 1" class="bg-green-lighter text-green-darker" :class="{'bg-red-lighter text-red-darker': total_current_value <= total_investment}">
                    <tr>
                        <td class="text-center border-r p-2">{{ total_no_of_shares | price }}</td>
                        <td class="text-center border-r p-2">{{ average_buying_price | price }}</td>
                        <td class="text-center border-r p-2">{{ total_investment | price }}</td>
                        <td v-if="edit" class="text-center border-r p-2">{{ status | price }}</td>
                        <td v-if="!edit">
                            <span>{{ total_current_value | price }}</span>
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

<style>
    .border-l-2{
        border-left-width: 3px !important;
    }
</style>
