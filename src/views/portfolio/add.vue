<template>
    <div class="flex flex-wrap justify-around">
        <font-awesome-icon class="cursor-pointer text-green" @click="$modal.show('add')" icon="plus"></font-awesome-icon>
        <font-awesome-icon v-if="portfolios.length > 0" icon="upload" @click="upload" class="cursor-pointer text-teal"></font-awesome-icon>
        <font-awesome-icon v-else icon="download" @click="importCompanies" class="cursor-pointer text-teal"></font-awesome-icon>
        <font-awesome-icon icon="trash" v-confirm="{loader: true, ok: (dialog)=>{empty(), dialog.close()}, cancel: ()=>{}, message:'Are you sure? it cannot be undone.'}" class="cursor-pointer text-red-dark"></font-awesome-icon>
        <modal name="add">
            <div class="px-2 pt-2">
                <input type="text" placeholder="Search by name or symbol" v-model="search" class="w-full p-2 border-2 mb-2">
            </div>
            <div class="px-2">
                <ul class="px-0 overflow-y-scroll h-64 pb-4">
                    <li  @click="add(company)" class="cursor-pointer w-full flex flex-wrap hover:bg-blue-lighter bg-blue-lightest text-blue-darker p-2" v-for="company in filterBy(unadded,search,'name','code')" :key="company.code">
                        <div class="w-5/6">
                            <span v-html="company.name"></span> (<span v-html="company.code"></span>)
                        </div>
                    </li>
                </ul>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "../../axios";
import Url from "../../url";
export default {
  name: "Add",
  computed: {
    ...mapGetters(["unadded", "portfolios", "pure"])
  },
  methods: {
    ...mapMutations(["add", "empty", "importer"]),
    ...mapActions(["importCompanies"]),
    upload() {
      axios.post(Url.export, { json: this.pure }).then(response => {
        this.$dialog
          .alert("Your backup key is " + response.data.key + "", {
            okText: "Close"
          })
          .then(function(dialog) {});
      });
    }
  },
  data() {
    return {
      importKey: "",
      showModal: false,
      search: "",
      download: false
    };
  }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
