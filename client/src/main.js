import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bulma";
import "@fortawesome/fontawesome-free/css/all.css";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false;

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = "/api";



new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
