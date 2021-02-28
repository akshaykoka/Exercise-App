//Importing vue module
import Vue from 'vue'
//Importing App view,so that application will start from APP page
import App from './App.vue'
//Importing router module so that we can decalre path routing
import router from './router'
//Importing Bulma css
import "bulma"
//Importing font awesome for Icons
import '@fortawesome/fontawesome-free/css/all.css'
import store from '../src/router/store.js'
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton);
//For auto complete feature
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
import vSelect from 'vselect-component'
Vue.use(vSelect)
//Creating Vue Instance
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
