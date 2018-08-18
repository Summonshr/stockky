import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import "./registerServiceWorker";
import "./main.css";
import Vue2Filters from "vue2-filters";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faUpload,
  faPlus,
  faEdit,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrash);
library.add(faPlus);
library.add(faEdit);
library.add(faCheck);
library.add(faUpload);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vue2Filters);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
