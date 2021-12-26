import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import App from './App.vue'
import './assets/index.css'
// import compileComponent from './utils/compileComponent'

Vue.use(VueCodemirror)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render (h) { return h(App) }
})

// const components = compileComponent('src/App.vue', template)

// const VmFunc = Vue.extend(components.exports)
// new VmFunc().$mount('#place')
