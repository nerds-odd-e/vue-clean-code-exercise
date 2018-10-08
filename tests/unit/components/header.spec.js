import {shallowMount} from '@vue/test-utils'
import Header from '@/components/Header'
import TimeProvider from '@/domain/timeProvider'

describe('Header', () => {
  it('show cake on birthday', () => {
    TimeProvider.getDateCallback = callback => callback(new Date(2018, 9, 18))
    const wrapper = shallowMount(Header)
    expect(wrapper.vm.profileCaption).toEqual('Jackson🎂')
  })
  it('hide cake if not birthday', () => {
    TimeProvider.getDateCallback = callback => callback(new Date(2018, 9, 17))
    const wrapper = shallowMount(Header)
    expect(wrapper.vm.profileCaption).toEqual('Jackson')
  })
})