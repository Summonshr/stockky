<template>
    <div class="flex flex-wrap justify-around">
        <font-awesome-icon class="cursor-pointer text-green" @click="$modal.show('add')" icon="plus"></font-awesome-icon>
        <font-awesome-icon icon="trash" class="cursor-pointer text-red-dark"></font-awesome-icon>
        <font-awesome-icon icon="upload" class="cursor-pointer text-teal"></font-awesome-icon>
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
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Add",
  computed: {
    ...mapGetters(["unadded"])
  },
  methods: {
    ...mapMutations(["add"])
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
