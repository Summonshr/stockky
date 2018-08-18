import Vue from "vue";
import Router from "vue-router";
import App from "./App";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: App
    }
  ]
});
