<template>
    <draggable v-model="sortablePortfolios" :options="{handle:'.sortable'}" class="portfolios">
        <portfolio v-for="(portfolio, key) in portfolios" :key="key" :portfolio="portfolio"/>
    </draggable>
</template>
<script>
import draggable from 'vuedraggable';
import {mapGetters} from 'vuex';
import _ from 'lodash';
import Portfolio from './portfolio';
export default {
    components:{
       portfolio: Portfolio,
       draggable
    },
    computed: {
        ...mapGetters(['portfolios']),
        sortablePortfolios:{
            get(){
                return _.values(this.portfolios);
            },
            set(value){
                this.$store.commit('sort', value);
            }
        }
    },
}
</script>