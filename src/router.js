import Vue from "vue";
import Router from "vue-router";
import Portfolio from "./views/portfolio";
import Company from './views/company';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Portfolio
    },
    {
      path: "/company",
      name: "company",
      component: Company
    }
  ]
});
