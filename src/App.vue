<template>
  <page-layout>
    <section class="container flex min-h-full">
      <section class="flex-1 border-r-2 border-bd-color">
        <code-manage @freshCode="onCodeFresh" />
      </section>
      <section class="flex-1" id="showArea"></section>
    </section>
  </page-layout>
</template>

<script>
import Vue from 'vue'
import PageLayout from './components/page-layout.vue'
import CodeManage from './components/code-manage.vue'
import compileComponent from './utils/compileComponent'
export default {
  components: {
    CodeManage,
    PageLayout
  },
  data () {
    return {
      tempVm: null
    }
  },
  methods: {
    onCodeFresh ({ code }) {
      const _options = compileComponent('src/App.vue', code)
      const _func = Vue.extend(_options.exports)
      this.tempVm = new _func()
      this.mountComponent()
    },
    mountComponent () {
      const el = document.getElementById('showArea')
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
      const _place = document.createElement('div')
      el.appendChild(_place)
      this.$nextTick(() => {
        this.tempVm.$mount(_place)
      })
    }
  }
}
</script>

<style>

</style>
