import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire';
import FullCalendar from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.css';

Vue.use(FullCalendar)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
