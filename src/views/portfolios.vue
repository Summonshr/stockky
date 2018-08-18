<template>
    <div>
        <draggable>
            <portfolio v-for="(portfolio, key) in portfolios" :key="key" :portfolio="portfolio"/>
        </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import {mapGetters} from 'vuex';
import Portfolio from './portfolio';
export default {
    components:{
       portfolio: Portfolio,
       draggable
    },
    computed: {
        ...mapGetters(['portfolios'])
    },
}
</script>