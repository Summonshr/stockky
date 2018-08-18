import Vue from "vue";
import Vuex from "vuex";
import Url from "./url";
import axios from "./axios";
import _ from "lodash";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "stocknp-v1"
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    companies: [],
    portfolios: []
  },
  mutations: {
    companies: (state, companies) => {
      state.companies = companies;
    },
    add: function(state, company) {
      let newer = {
        ...company,
        count: 0,
        price: 0,
        key: _.random(100000, 100000000)
      };
      state.portfolios.push(newer);
    },
    deleter: (state, key) => {
      state.portfolios = state.portfolios.filter(
        portfolio => portfolio.key !== key
      );
    },
    bulkDelete: (state, code) => {
      state.portfolios = state.portfolios.filter(
        portfolio => portfolio.code !== code
      );
    },
    enter(state, payload) {
      let portfolios = state.portfolios;
      let old = { ..._.find(portfolios, { key: payload.key }), ...payload };
      state.portfolios = portfolios;
    }
  },
  actions: {
    getCompanies: ({ commit }) => {
      axios.get(Url.companies).then(response => {
        commit("companies", response.data.companies);
      });
    }
  },
  getters: {
    portfolios: state => {
      return _.groupBy(state.portfolios, "code");
    },
    unadded: state => {
      let selected = _.map(state.portfolios, "code");
      return state.companies.filter(
        company => !selected.includes(company.code)
      );
    },
    total: state => {
      return _.values(_.groupBy(state.portfolios, "code")).length;
    },
    count: state => {
      return _.sum(
        _.map(state.portfolios, "count").map(num => parseInt(num, 10))
      );
    },
    average: state => {
      return Math.round(_.mean(
        _.map(state.portfolios,'count').filter(Boolean).map(num => parseInt(num || 0, 10))
      ));
    },
    investment: state => {
      return _.sum(state.portfolios.map(e=>e.count*e.price).filter(Boolean))
    }
  }
});
