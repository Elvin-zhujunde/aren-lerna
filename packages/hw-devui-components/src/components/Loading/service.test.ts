import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LoadingService } from './service'
import { nextTick } from 'vue'

describe('LoadingService', () => {
  let loadingService: LoadingService

  beforeEach(() => {
    loadingService = new LoadingService()
    // 清理 DOM
    document.body.innerHTML = ''
  })

  it('应该能创建一个loading实例', async () => {
    const loading = loadingService.create()
    await nextTick()
    expect(document.querySelector('.devui-loading')).toBeTruthy()
  })

  it('应该能创建带配置的loading实例', async () => {
    const loading = loadingService.create({
      text: '加载中...',
      background: 'rgba(0,0,0,.8)',
      textColor: '#fff'
    })
    
    await nextTick()
    const loadingEl = document.querySelector('.devui-loading')
    expect(loadingEl?.querySelector('.devui-loading-text')?.textContent).toBe('加载中...')
    expect(loadingEl?.style.getPropertyValue('--loading-background')).toBe('rgba(0,0,0,.8)')
    expect(loadingEl?.querySelector('.devui-loading-text')?.style.color).toBe('#fff')
  })

  it('应该能正确关闭loading实例', async () => {
    const loading = loadingService.create()
    await nextTick()
    expect(document.querySelector('.devui-loading')).toBeTruthy()

    loading.close()
    await nextTick()
    expect(document.querySelector('.devui-loading')).toBeFalsy()
  })

  it('应该能更新loading实例的配置', async () => {
    const loading = loadingService.create({
      text: '初始文本'
    })
    
    await nextTick()
    expect(document.querySelector('.devui-loading-text')?.textContent).toBe('初始文本')

    loading.updateConfig({
      text: '更新后的文本'
    })
    
    await nextTick()
    expect(document.querySelector('.devui-loading-text')?.textContent).toBe('更新后的文本')
  })

  it('应该能正确处理多个loading实例', async () => {
    const loading1 = loadingService.create()
    const loading2 = loadingService.create()
    
    await nextTick()
    const loadingElements = document.querySelectorAll('.devui-loading')
    expect(loadingElements.length).toBe(2)

    loading1.close()
    await nextTick()
    expect(document.querySelectorAll('.devui-loading').length).toBe(1)

    loading2.close()
    await nextTick()
    expect(document.querySelectorAll('.devui-loading').length).toBe(0)
  })

  it('应该能正确处理全屏loading', async () => {
    const loading = loadingService.create({
      fullscreen: true
    })
    
    await nextTick()
    expect(document.querySelector('.devui-loading-fullscreen')).toBeTruthy()
  })

  it('应该能正确处理target loading', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    
    const loading = loadingService.create({
      target
    })
    
    await nextTick()
    expect(target.querySelector('.devui-loading')).toBeTruthy()
  })
}) 
import { LoadingService } from './service'
import { nextTick } from 'vue'

describe('LoadingService', () => {
  let loadingService: LoadingService

  beforeEach(() => {
    loadingService = new LoadingService()
    // 清理 DOM
    document.body.innerHTML = ''
  })

  it('应该能创建一个loading实例', async () => {
    const loading = loadingService.create()
    await nextTick()
    expect(document.querySelector('.devui-loading')).toBeTruthy()
  })

  it('应该能创建带配置的loading实例', async () => {
    const loading = loadingService.create({
      text: '加载中...',
      background: 'rgba(0,0,0,.8)',
      textColor: '#fff'
    })
    
    await nextTick()
    const loadingEl = document.querySelector('.devui-loading')
    expect(loadingEl?.querySelector('.devui-loading-text')?.textContent).toBe('加载中...')
    expect(loadingEl?.style.getPropertyValue('--loading-background')).toBe('rgba(0,0,0,.8)')
    expect(loadingEl?.querySelector('.devui-loading-text')?.style.color).toBe('#fff')
  })

  it('应该能正确关闭loading实例', async () => {
    const loading = loadingService.create()
    await nextTick()
    expect(document.querySelector('.devui-loading')).toBeTruthy()

    loading.close()
    await nextTick()
    expect(document.querySelector('.devui-loading')).toBeFalsy()
  })

  it('应该能更新loading实例的配置', async () => {
    const loading = loadingService.create({
      text: '初始文本'
    })
    
    await nextTick()
    expect(document.querySelector('.devui-loading-text')?.textContent).toBe('初始文本')

    loading.updateConfig({
      text: '更新后的文本'
    })
    
    await nextTick()
    expect(document.querySelector('.devui-loading-text')?.textContent).toBe('更新后的文本')
  })

  it('应该能正确处理多个loading实例', async () => {
    const loading1 = loadingService.create()
    const loading2 = loadingService.create()
    
    await nextTick()
    const loadingElements = document.querySelectorAll('.devui-loading')
    expect(loadingElements.length).toBe(2)

    loading1.close()
    await nextTick()
    expect(document.querySelectorAll('.devui-loading').length).toBe(1)

    loading2.close()
    await nextTick()
    expect(document.querySelectorAll('.devui-loading').length).toBe(0)
  })

  it('应该能正确处理全屏loading', async () => {
    const loading = loadingService.create({
      fullscreen: true
    })
    
    await nextTick()
    expect(document.querySelector('.devui-loading-fullscreen')).toBeTruthy()
  })

  it('应该能正确处理target loading', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    
    const loading = loadingService.create({
      target
    })
    
    await nextTick()
    expect(target.querySelector('.devui-loading')).toBeTruthy()
  })
})