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
    portfolios: [],
    sort: []
  },
  mutations: {
    companies: (state, companies) => {
      state.companies = companies;
    },
    empty: state => {
      state.portfolios = [];
    },
    add: function(state, company) {
      let newer = {
        ...company,
        count: 0,
        price: 0,
        key: _.random(100000, 100000000)
      };
      if(!state.sort.includes(newer.code)){
        state.sort.unshift(newer.code);
      }
      state.portfolios.unshift(newer);
     
    },
    sort: function(state, payload) {
      state.sort = _.map(payload, "0.code");
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
      state.portfolios = state.portfolios.map(portfolio => {
        if (portfolio.key == payload.key) {
          portfolio = { ...portfolio, ...payload };
        }
        return portfolio;
      });
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
      return _.sortBy(_.groupBy(state.portfolios, "code"), portfolio => {
        return _.indexOf(state.sort, portfolio[0].code);
      });
    },
    unadded: state => {
      let selected = _.map(state.portfolios, "code");
      return state.companies.filter(
        company => !selected.includes(company.code)
      );
    },
    enter: state => {
      let portfolios = portfolios;
      state.portfolios = portfolios;
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
      return Math.round(
        _.mean(
          _.map(state.portfolios, "price")
            .filter(Boolean)
            .map(num => parseInt(num || 0, 10))
        ) || 0
      );
    },
    investment: state => {
      return _.sum(
        state.portfolios.map(e => e.count * e.price).filter(Boolean)
      );
    },
    current: ({ companies, portfolios }) => {
      return _.sum(
        portfolios.map(
          portfolio =>
            _.find(portfolios, { code: portfolio.code }).latest_share_price *
            portfolio.count
        )
      );
    }
  }
});
