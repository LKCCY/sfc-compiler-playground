<template>
  <page-layout>
    <section class="container flex min-h-full">
      <section class="flex-1 border-r-2 border-bd-color">
        <code-manage @freshCode="onCodeFresh" ref="codeManage"/>
      </section>
      <section class="flex-1" id="showArea"></section>
      <div class="fixed flex bottom-0 left-0 h-[30px] w-full bg-[#53a0cf] z-50 justify-end pr-5">
        <span @click="onChangeMode" class="text-white text-sm leading-[30px] cursor-pointer">编译模式：{{ isComplieWebComponent ? 'web-component' : 'vue-component' }}</span>
      </div>
    </section>
  </page-layout>
</template>

<script>
import Vue from 'vue'
import PageLayout from './components/page-layout.vue'
import CodeManage from './components/code-manage.vue'
import compileComponent from './utils/compileComponent'
import wrap from './vue-wrap-component'

export default {
  components: {
    CodeManage,
    PageLayout
  },
  data () {
    return {
      isComplieWebComponent: true
    }
  },
  methods: {
    onCodeFresh ({ code, uid }) {
      const _options = compileComponent('src/App.vue', code, this.isComplieWebComponent)
      const _func = Vue.extend(_options.exports)
      this.isComplieWebComponent ? this.mountWebComponent(uid, _options.exports) : this.mountComponent(new _func())
    },
    mountWebComponent (uid, componentExports) {
      const _componentName = `p-${uid}`
      window.customElements.define(_componentName, wrap(Vue, componentExports))
      const el = document.getElementById('showArea')
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
      el.innerHTML = `<${_componentName}/>`
      // el.appendChild(_componentName)
    },
    mountComponent (vm) {
      const el = document.getElementById('showArea')
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
      const _place = document.createElement('div')
      el.appendChild(_place)
      this.$nextTick(() => {
        vm.$mount(_place)
      })
    },
    onChangeMode () {
      this.isComplieWebComponent = !this.isComplieWebComponent
      this.$refs.codeManage.freshCode()
    }
  }
}
</script>

<style>

</style>
