import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import App from './App.vue'
import './assets/index.css'

Vue.use(VueCodemirror)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render (h) { return h(App) }
})
