<template>
    <div class="max-w-sm mx-auto shadow-lg">
      <Header/>
      <Total/>
      <Portfolios/>
      <Motto/>
    </div>
</template>
<script>
import Total from './views/total';
import Portfolios from './views/portfolios';
import Motto from './views/motto';
import Header from './views/header';

export default {
  components: {
     Total, Portfolios, Motto, Header
  },
  created(){
    this.$store.dispatch('getCompanies')
  }
}
</script>

