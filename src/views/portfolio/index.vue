<template>
  <Layout>
    <Header/>
    <Total/>
    <Portfolios/>
    <Motto/>
  </Layout>
</template>
<script>
import Total from './total';
import Portfolios from './portfolios';
import Motto from './motto';
import Header from '../partials/header';
import Layout from '../layout';
import {mapMutations} from 'vuex';

export default {
  components: {
     Total, Portfolios, Motto, Header, Layout
  },
  methods: {
    ...mapMutations(["add", "empty", "importer"]),
  },
  created(){
    this.$store.dispatch('getCompanies')
  }
}
</script>

