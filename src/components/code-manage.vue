<template>
  <section class="code-manage">
    <codemirror
      :value="codeStr"
      :options="cmOptions"
      style="height:100%"
      @input="onInput"
    />
  </section>
</template>

<script>
import 'codemirror/mode/vue/vue'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import { templateDemo } from '../const'
import debounce from 'lodash.debounce'

let uid = 0

export default {
  data () {
    return {
      codeStr: templateDemo,
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-vue',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  mounted () {
    this.freshCode()
  },
  methods: {
    freshCode (code) {
      this.$emit('freshCode', { code: code || this.codeStr, uid: ++uid })
    },
    onInput: debounce(function (val) {
      this.freshCode(val)
    }, 500)
  }
}
</script>

<style>
.code-manage {
  overflow-y:auto;
  .CodeMirror {
    height: calc(100vh - 60px);
  }
}
</style>
