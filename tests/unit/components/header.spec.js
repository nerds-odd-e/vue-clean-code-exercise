import {shallowMount} from '@vue/test-utils'
import Header from '@/components/Header'
import TimeProvider from '@/domain/timeProvider'
import Promise from '../common/promise'

describe('Header', () => {
  it('show cake on birthday', () => {
    TimeProvider.getDatePromise = () => ({then: callback => callback(new Date(20118, 9, 18))}) //() => Promise.resolve(new Date(2018, 9, 18))
    const wrapper = shallowMount(Header)
    expect(wrapper.vm.profileCaption).toEqual('Jackson🎂')
  })
  it('hide cake if not birthday', () => {
    TimeProvider.getDatePromise = () => ({then: callback => callback(new Date(20118, 9, 17))}) //() => Promise.resolve(new Date(2018, 9, 18))
    const wrapper = shallowMount(Header)
    expect(wrapper.vm.profileCaption).toEqual('Jackson')
  })
})