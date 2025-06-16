import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from './Loading'

describe('Loading Component', () => {
  // 基础渲染测试
  it('应该正确渲染Loading组件', () => {
    const wrapper = mount(Loading)
    expect(wrapper.classes()).toContain('devui-loading')
  })

  // 显示控制测试
  it('当loading为false时不应该显示', () => {
    const wrapper = mount(Loading, {
      props: {
        loading: false
      }
    })
    expect(wrapper.isVisible()).toBe(false)
  })

  // 属性测试
  it('应该正确设置type属性', () => {
    const wrapper = mount(Loading, {
      props: {
        type: 'circle'
      }
    })
    expect(wrapper.find('.devui-loading-circle').exists()).toBe(true)
  })

  it('应该正确设置size属性', () => {
    const size = 64
    const wrapper = mount(Loading, {
      props: {
        size
      }
    })
    expect(wrapper.attributes('style')).toContain(`${size}px`)
  })

  // 文本相关测试
  it('应该正确显示加载文本', () => {
    const text = '加载中...'
    const wrapper = mount(Loading, {
      props: {
        text
      }
    })
    expect(wrapper.text()).toContain(text)
  })

  it('应该正确设置文本位置', () => {
    const wrapper = mount(Loading, {
      props: {
        text: '加载中',
        textPosition: 'right'
      }
    })
    expect(wrapper.find('.devui-loading-text-right').exists()).toBe(true)
  })

  // 样式相关测试
  it('应该正确设置文本颜色', () => {
    const textColor = '#ff0000'
    const wrapper = mount(Loading, {
      props: {
        text: '加载中',
        textColor
      }
    })
    expect(wrapper.find('.devui-loading-text').attributes('style'))
      .toContain(`color: ${textColor}`)
  })

  it('应该正确设置loading颜色', () => {
    const loadingColor = '#0000ff'
    const wrapper = mount(Loading, {
      props: {
        loadingColor
      }
    })
    expect(wrapper.attributes('style')).toContain(`--loading-color: ${loadingColor}`)
  })

  // 自定义图标测试
  it('应该正确渲染自定义图标', () => {
    const customIcon = '<svg>...</svg>'
    const wrapper = mount(Loading, {
      props: {
        customIcon
      }
    })
    expect(wrapper.html()).toContain(customIcon)
  })
})
