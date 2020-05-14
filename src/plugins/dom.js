/**
 * @description 初始化rem
 */
function initRem() {
  const cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
  console.log(cale)
  window.document.documentElement.style.fontSize = `${100 * cale}px`
}
initRem()

window.addEventListener('resize', function() {
  initRem()
  // 解决Android下虚拟键盘出来而页面没有上移的情况
  if (
    document.activeElement.tagName === 'INPUT' ||
    document.activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(function() {
      if('scrollIntoView' in document.activeElement) {
        document.activeElement.scrollIntoView(false)
      } else {
        document.activeElement.scrollIntoViewIfNeeded(false)
      }
    }, 0)
  }
})

document.addEventListener('focusout', () => {
  // 处理手机点击输入框键盘弹起，页面未拉起的问题
  setTimeout(() => {
    const height = document.documentElement.scrollTop || document.body.scrollTop
    window.scrollTo(0, height + 1)
  }, 20)
})
