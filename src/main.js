import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import "./registerServiceWorker";
import "./main.css";
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import Vue2Filters from "vue2-filters";
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    faTrash,
    faUpload,
    faPlus,
    faEdit,
    faDownload,
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import VuejsDialog from 'vuejs-dialog';

library.add(faTrash);
library.add(faPlus);
library.add(faEdit);
library.add(faCheck);
library.add(faUpload);
library.add(faDownload);

Vue.filter('price', function (value) {
    if (Boolean(value)) {
        return 'Rs.' + currency(value);
    }
    return 'Rs. 0';
})

Vue.filter('comma', function (value) {
    if (Boolean(value)) {
        return currency(value);
    }
    return 0;
})

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use(VModal, {
    dialog: true,
    dynamic: true,
    injectModalsContainer: true
});
Vue.use(Vue2Filters);
Vue.use(VuejsDialog);

const currency = function (x) {
    if (!x) {
        return 0;
    }
    x = x.toString().replace(/\D/g, '');
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    if (!Boolean(res)) {
        return '';
    }
    return res;
}


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");