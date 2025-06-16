import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp, h, nextTick } from 'vue'
import { vLoading } from './directive'
import { LoadingService } from './service'

describe('v-loading 指令', () => {
  let app: any
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    app = createApp({})
    app.directive('loading', vLoading)
  })

  it('应该正确绑定v-loading指令', async () => {
    const wrapper = mount({
      template: `<div v-loading="true"></div>`
    }, {
      global: {
        directives: {
          loading: vLoading
        }
      }
    })

    await nextTick()
    expect(document.querySelector('.devui-loading-relative')).toBeTruthy()
  })

  it('应该响应loading值的变化', async () => {
    const wrapper = mount({
      template: `<div v-loading="isLoading"></div>`,
      data() {
        return {
          isLoading: false
        }
      }
    }, {
      global: {
        directives: {
          loading: vLoading
        }
      }
    })

    expect(document.querySelector('.devui-loading-relative')).toBeFalsy()
    
    await wrapper.setData({ isLoading: true })
    expect(document.querySelector('.devui-loading-relative')).toBeTruthy()
  })

  it('应该支持自定义loading配置', async () => {
    const wrapper = mount({
      template: `
        <div v-loading="true" 
          loading-text="自定义文本"
          loading-background="rgba(0,0,0,.8)"
          loading-text-color="#fff">
        </div>
      `
    }, {
      global: {
        directives: {
          loading: vLoading
        }
      }
    })

    await nextTick()
    const loadingEl = document.querySelector('.devui-loading-relative')
    expect(loadingEl?.querySelector('.devui-loading-text')?.textContent).toContain('自定义文本')
    expect(loadingEl?.style.getPropertyValue('--loading-background')).toBe('rgba(0,0,0,.8)')
    expect(loadingEl?.querySelector('.devui-loading-text')?.style.color).toBe('#fff')
  })

  it('应该正确处理全屏loading', async () => {
    const wrapper = mount({
      template: `<div v-loading.fullscreen="true"></div>`
    }, {
      global: {
        directives: {
          loading: vLoading
        }
      }
    })

    await nextTick()
    expect(document.querySelector('.devui-loading-fullscreen')).toBeTruthy()
  })
}) 