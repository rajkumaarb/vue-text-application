import FileContentDisplay from '@/components/FileContentDisplay.vue'
import { shallowMount } from '@vue/test-utils'

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

  it('wrapper component is available for user', () => {
    expect(contentComponent.classes()).toContain('my-wrapper')
  })

  it('initial message is proper', () => {
    contentComponent.setData({toData: contentComponent.vm._props.contentdata})
    contentComponent.setData({displaydata: contentComponent.vm.toData})
    expect(contentComponent.vm._data.displaydata).toBe(contentComponent.vm._data.toData)
  })

  it('search button is clicked', () => {
    contentComponent.vm.doSearch = jest.fn()
    contentComponent.find('input').trigger('keyup.enter')
    expect(contentComponent.vm.doSearch).toHaveBeenCalled()
  })

  it('clear button is clicked', () => {
    contentComponent.vm._data.search.text = 'spec'
    contentComponent.vm._data.search.count = 1
    contentComponent.vm.clearData = jest.fn(() => {
      contentComponent.vm._data.search.text = '';
      contentComponent.vm._data.search.count = 0;
    })
    contentComponent.findAll('button').at(0).trigger('click')
    expect(contentComponent.vm.clearData).toHaveBeenCalled()
    expect(contentComponent.vm._data.search.text).toBe('')
    expect(contentComponent.vm._data.search.count).toBe(0)
  })
})
