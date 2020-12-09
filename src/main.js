import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

