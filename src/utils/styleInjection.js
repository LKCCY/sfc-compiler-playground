import postcss from 'postcss'
import scopedPlugin from '@vue/component-compiler-utils/lib/stylePlugins/scoped'
import trimPlugin from '@vue/component-compiler-utils/lib/stylePlugins/trim'
import addStylesClient from 'vue-style-loader/lib/addStylesClient'
import addStylesShadow from 'vue-style-loader/lib/addStylesShadow'

// 来自 lib/codegen/styleInjection.js‘
const nonWhitespaceRE = /\S+/
const isNotEmptyStyle = style => style.src || nonWhitespaceRE.test(style.content)

function processStyle (filePath, source, id, shadowMode) { // vue-component-utils/compileStyle
  const plugins = []
  const scoped = !!id
  plugins.push(trimPlugin())
  if (scoped) { plugins.push(scopedPlugin(`data-v-${id}`)) }

  const _mid = postcss(plugins).process(source)
  const result = { rawResult: _mid, code: _mid.css || '' }
  // 经过css-loader 处理后的结果 ['解析当前文件的路径', '转换后的代码', query] 当前简单模拟
  const _mockCssLoaderResult = [[filePath, result.code, '']]
  if (shadowMode) {
    return function (shadowRoot) {
      addStylesShadow(id, _mockCssLoaderResult, shadowRoot)
    }
  }
  addStylesClient(id, _mockCssLoaderResult, true)
}

// 模拟VueStyleloader 结果
export default function genStyleInjectionCode (filePath, styles, id, needsExplicitInjection) {
  if (!needsExplicitInjection) {
    styles.forEach((style) => {
      // do not generate requests for empty styles
      if (isNotEmptyStyle(style)) {
        processStyle(filePath, style.content, style.scoped ? id : '', needsExplicitInjection)
      }
    })
  } else {
    const injectFunList = []
    styles.forEach((style) => {
      if (isNotEmptyStyle(style)) {
        injectFunList.push(processStyle(filePath, style.content, style.scoped ? id : '', needsExplicitInjection))
      }
    })
    return function _injectFunc (shadowRoot) {
      injectFunList.forEach(func => func(shadowRoot))
    }
  }
}
