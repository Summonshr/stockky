<template>
    <div class="flex flex-wrap justify-between bg-teal-darkest p-3 py-2">
        <a class="text-grey-light no-underline" href="/">StockNp.com</a>
        <a class="text-grey-light no-underline" href="mailto:summonshr@gmail.com">Summonshr@gmail.com</a>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "../axios";
import Url from "../url";
export default {
  name: "Add",
  computed: {
    ...mapGetters(["unadded", "portfolios"])
  },
  methods: {
    ...mapMutations(["add", "empty"]),
    upload() {
      axios.post(Url.export, { json: this.portfolios }).then(response => {
        this.$dialog
          .alert("Your backup key is " + response.data.key + "", {
            okText: "Close"
          })
          .then(function(dialog) {});
      });
    },
    download() {
    }
  },
  data() {
    return {
      showModal: false,
      search: ""
    };
  }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
