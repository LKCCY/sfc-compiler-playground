import Vue from 'vue'
import compileComponent from './utils/compileComponent'

// vite 会将所有代码视为原生 ES模块，Vite 将会转化 Commonjs 或 UMD 发布的依赖项
// Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能

const template = `
  <template>
    <div class="red a">{{ msg }}</div>
  </template>
  <script>
    export default {
        data () {
          return {
            msg: '我是消息1234'
          }
        }
    }
  </script>

  <style scoped>
  .red {
    color: red;
  }
  </style>
`

const components = compileComponent('src/App.vue', template)

const VmFunc = Vue.extend(components.exports)
new VmFunc().$mount('#place')
