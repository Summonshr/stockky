import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import "./registerServiceWorker";
import "./main.css";
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import Vue2Filters from "vue2-filters";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faUpload,
  faPlus,
  faEdit,
  faDownload,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VuejsDialog from 'vuejs-dialog';

library.add(faTrash);
library.add(faPlus);
library.add(faEdit);
library.add(faCheck);
library.add(faUpload);
library.add(faDownload);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vue2Filters);
Vue.use(VuejsDialog);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
