import Vue from "vue";
import Vuex from "vuex";
import Url from "./url";
import axios from "./axios";
import _ from "lodash";
import VuexPersistence from "vuex-persist";
import swal from 'sweetalert';
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
    portfolios: (state, payload) =>{
      state.portfolios = payload
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
    },
    importCompanies: ({ commit }) => {
      swal({
        text: "Enter your backup key",
        content: "input",
        button: {
          text: "Import !",
          closeModal: false
        }
      }).then(key => {
        if (!key) throw null;

        return axios.get(Url.import + "/" + key);
      }).then(results => {
        return JSON.parse(results.data.data);
      }).then(json => {
        commit('portfolios', json);
        swal({
          title: "Awesome !",
          text: "Imported Successfully",
          icon: "success"
        });
      }).catch(err => {
        if (err) {
          swal("Oh noes!", "The Import request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
    }
  },
  getters: {
    pure: (state) => {
      return state.portfolios;
    },
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
      let total = _.sum(
        state.portfolios.map(e => {
          let total = parseInt(e.count * e.price, 10);
          return total * 0.006 + total + 31;
        })
      );
      return Math.round(total);
    },
    current: ({ companies, portfolios }) => {
      return Math.round(_.sum(
        portfolios.map(
          portfolio => {
            let total = 
            _.find(portfolios, { code: portfolio.code }).latest_share_price *
            portfolio.count;
            return  total - total * 0.006 - 31
          }
        )
      ));
    }
  }
});
