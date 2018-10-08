<template>
  <div>
    <h2>Add Budget</h2>
    <div class="form-item">
      <div class="label">
        <label>Month</label>
      </div>
      <div class="editor">
        <input type="text" v-model="budget.month" placeholder="Month YYYY-MM">
      </div>
      <div class="error">
        <span>{{errors.month}}</span>
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <label>Amount</label>
      </div>
      <div class="editor">
        <input type="number" v-model.number="budget.amount" placeholder="Amount">
      </div>
      <div class="error">
        <span>{{errors.amount}}</span>
      </div>
    </div>
    <div class="form-item">
      <button @click="save" class="button">Save</button>
      <button @click="cancel" class="button">Cancel</button>
    </div>
  </div>
</template>

<script>
  import Api from "../api"

  export default {
    data() {
      return {
        budget: {
          month: '',
          amount: 0
        },
        errors: {
          month: '',
          amount: ''
        }
      }
    },
    methods: {
      _goToBudgetList() {
        this.$router.push('/budgets')
      },
      save() {
        let monthValid, amountValid
        if (this.budget.month === '') {
          this.errors.month = 'Month cannot be empty'
          monthValid = false
        } else if (!(/^\d{4}-\d{2}$/g).test(this.budget.month)) {
          this.errors.month = 'Invalid month format'
          monthValid = false
        } else {
          this.errors.month = ''
          monthValid = true
        }
        if (this.budget.amount === '') {
          this.errors.amount = 'Amount cannot be empty'
          amountValid = false
        } else if (isNaN(parseInt(this.budget.amount, 10)) || this.budget.amount < 0) {
          this.errors.amount = 'Invalid amount'
          amountValid = false
        } else {
          this.errors.amount = ''
          amountValid = true
        }
        if (!monthValid || !amountValid) {
          return
        }
        let budgets = Api.getBudgets()
        let existing = budgets && budgets.find(budget => budget.month === this.budget.month)
        if (existing) {
          Api.updateBudget(this.budget)
        } else {
          Api.addBudget(this.budget)
        }
        this._goToBudgetList()
      },
      cancel() {
        this._goToBudgetList()
      }
    }
  }
</script>