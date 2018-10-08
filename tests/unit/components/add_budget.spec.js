import AddBudget from '@/views/AddBudget'
import Api from '@/api'
import {shallowMount} from '@vue/test-utils'

describe('add budget', () => {
  let wrapper
  let $router = {push: () => {}}
  let push = jest.spyOn($router, 'push')
  beforeEach(() => {
    wrapper = shallowMount(AddBudget, {
      mocks: {
        $router
      }
    })
    push.mockClear()
  })

  it('default value', () => {
    expect(wrapper.vm.budget).toEqual({month: '', amount: 0})
  })
  it('default errors should be empty', () => {
    expect(wrapper.vm.errors).toEqual({month: '', amount: ''})
  })
  describe('save budget', () => {
    let addBudget = Api.addBudget = jest.fn()
    let getBudgets = Api.getBudgets = jest.fn()
    let updateBudget = Api.updateBudget = jest.fn()
    beforeEach(() => {
      addBudget.mockClear()
      updateBudget.mockClear()
    })
    describe('validation failed', () => {
      let validation_failed_with = (field, message) => {
        expect(wrapper.vm.errors[field]).toEqual(message)
        expect(addBudget).not.toHaveBeenCalled()
        expect(push).not.toHaveBeenCalled()
      };
      it('month should not be empty', () => {
        wrapper.vm.budget.month = ''
        wrapper.vm.save()
        validation_failed_with('month', 'Month cannot be empty');
      })
      it('month format should be YYYY-MM', () => {
        wrapper.vm.budget.month = 'INVALID'
        wrapper.vm.save()
        validation_failed_with('month', 'Invalid month format');
      })
      it('amount should not be empty', () => {
        wrapper.vm.budget.amount = ''
        wrapper.vm.save()
        validation_failed_with('amount', 'Amount cannot be empty');
      })
      it('amount should be a number', () => {
        wrapper.vm.budget.amount = 'NOT A NUMBER'
        wrapper.vm.save()
        validation_failed_with('amount', 'Invalid amount');
      })
      it('amount should be a number', () => {
        wrapper.vm.budget.amount = -1
        wrapper.vm.save()
        validation_failed_with('amount', 'Invalid amount');
      })
    })
    it('add a budget', () => {
      getBudgets.mockReturnValue([])
      wrapper.vm.budget.month = '2019-01'
      wrapper.vm.budget.amount = 1000
      wrapper.vm.save()
      expect(addBudget).toHaveBeenCalledWith(wrapper.vm.budget)
    })
    it('update the existing budget if budget of month exists', () => {
      getBudgets.mockReturnValue([{month: '2019-01', amount: 500}])
      wrapper.vm.budget.month = '2019-01'
      wrapper.vm.budget.amount = 1000
      wrapper.vm.save()
      expect(updateBudget).toHaveBeenCalledWith(wrapper.vm.budget)
    })
    it('redirect to budget list page', () => {
      getBudgets.mockReturnValue([])
      wrapper.vm.budget.month = '2019-01'
      wrapper.vm.budget.amount = 1000
      wrapper.vm.save()
      expect(push).toHaveBeenCalledWith('/budgets')
    })
  })
  it('cancel', () => {
    wrapper.vm.cancel()
    expect(push).toHaveBeenCalledWith('/budgets')
  })
})
