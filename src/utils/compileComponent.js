import { parseComponent, compile } from 'vue-template-compiler'
import genStyleInjectionCode from './styleInjection'
import normalizeComponent from 'vue-loader/lib/runtime/componentNormalizer'
import transpile from 'vue-template-es2015-compiler'
import hash from 'hash-sum'

export default function (filePath, templateStr) {
  // 拆分组件
  const descriptor = parseComponent(templateStr, { pad: 'line' })

  // vue-loader  module id for scoped CSS
  const shortFilePath = filePath
  const id = hash(shortFilePath)

  const isComplieWebComponent = false // 是否编译为 webComponent

  const hasScoped = descriptor.styles.some(s => s.scoped)
  const hasFunctional = descriptor.template && descriptor.template.attrs.functional

  let render = function () {}
  let staticRenderFns = []
  // 模版编译 vue-loader => pitcher => vue-loader => template-loader
  if (descriptor.template) {
  //
    const content = descriptor.template.content
    const complieOptions = {
      outputSourceRange: true,
      scopeId: hasScoped
        ? `data-v-${id}`
        : null,
      comments: undefined
    }
    // const { render, staticRenderFns }
    const _complierResult = compile(content, complieOptions)
    const toFunction = (code) => {
      return `function (${hasFunctional ? '_h,_vm' : ''}) {${code}}`
    }
    let _code = transpile(`var __render__ = ${toFunction(_complierResult.render)}\n` +
  `var __staticRenderFns__ = [${_complierResult.staticRenderFns.map(toFunction)}]`, { stripWithFunctional: hasFunctional })

    _code = _code.replace(/var\s__(render|staticRenderFns)__\s/g, ' $1 ')
    eval(_code)
  }

  // sciprt编译, vue-loader => pitcher => vue-loader
  let _scriptExportExtract = {}

  if (descriptor.script) {
    const _script = descriptor.script.content
    const _scriptExport = _script.match(/export default\s(\{(?:\n|.)*\})\n*$/)
    if (_scriptExport && _scriptExport[1]) {
      eval(`_scriptExportExtract=${_scriptExport[1]}`)
    }
  }

  // style 编译, vue-loader => pitcher => stylePostLoader => vue-style-loader
  let complierStyles = function () {}
  if (descriptor.styles) {
    complierStyles = genStyleInjectionCode(shortFilePath, descriptor.styles, hasScoped ? id : '', isComplieWebComponent)
  }
  return normalizeComponent(
    _scriptExportExtract,
    render,
    staticRenderFns,
    !!hasFunctional,
    isComplieWebComponent ? complierStyles : '',
    hasScoped ? id : '',
    false,
    isComplieWebComponent
  )
}
