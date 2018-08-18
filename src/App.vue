<template>
    <div class="max-w-sm mx-auto py-4">
      <Total/>
      <Portfolios/>
      <Motto/>
    </div>
</template>
<script>
import Total from './views/total';
import Portfolios from './views/portfolios';
import Motto from './views/motto';

export default {
  components: {
     Total, Portfolios, Motto
  },
  created(){
    this.$store.dispatch('getCompanies')
  }
}
</script>

