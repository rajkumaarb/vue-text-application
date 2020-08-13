import FileContentDisplay from '@/components/FileContentDisplay.vue'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

describe ('File Content Display', () => {

  let contentComponent;

  beforeEach(() => {
    contentComponent = shallowMount(FileContentDisplay, {
      propsData: {
        contentdata: 'Hello World! This is a spec file'
      },
      data: function () {
        return {
          search: {
            text: '',
            count: 0,
            noMatchMsg: 'hello',
            showMsg: false
          },
          toData: '',
          displaydata: ''
        }
      }
    })
  })

  afterEach(() => {
    contentComponent.destroy()
  })

  it('render the component', () => {
    expect(contentComponent.exists()).toBe(true);
  })

  it('DOM is rendered', () => {
    expect(contentComponent.classes()).toContain('my-wrapper')
  })

  it('initial message is proper', () => {
    contentComponent.setData({toData: contentComponent.vm._props.contentdata})
    contentComponent.setData({displaydata: contentComponent.vm.toData})
    expect(contentComponent.vm._data.displaydata).toBe(contentComponent.vm._data.toData)
  })

  xit('search filed should be cleared when clicking clear button', async () => {
    contentComponent.vm._data.search.text = 'spec'
    contentComponent.vm._clearData = sinon.stub()
    contentComponent.findAll('button').at(0).trigger('click')
    await contentComponent.vm.$nextTick()
    expect(contentComponent.vm._data.search.text).toBe('')
  })
})
