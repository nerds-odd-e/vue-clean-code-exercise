<template>
  <div style="font-size: 14px;">
    <h2>Budgets</h2>
    <div style="display: flex; height: 33px; border-top: 1px solid lightgrey; border-bottom: 1px solid lightgrey;">
        <div :key="header" v-for="header in headers" style="display: flex; position: relative;">
          <div style="display: block; height: 32px; width: 200px; border-right: 1px solid lightgrey;">
            <div style="align-items: center;font-weight: bolder">{{header}}</div>
          </div>
        </div>
    </div>

    <div style="position: relative;">
      <div :key="index" v-for="(budget, index) in budgets" style="display: flex; border-bottom: 1px solid lightgrey;">
        <div :key="key" v-for="(value, key) in budget"
             style="width: 200px; display: block; border-right: 1px solid lightgrey; min-height: 32px;">
          <span style="line-height: 1.5">{{value}}</span>
        </div>
      </div>
    </div>
    <div @click="goToAddBudget" style="align-items: center; cursor: pointer; display: flex; height: 32px; padding-left: 8px; padding-bottom: 2px; color: grey; border-bottom: 1px solid lightgrey">
      ＋Add New Budget
    </div>
  </div>
</template>

<script>
  import Api from '@/api'
  export default {
    data() {
      return {
        headers: [
          "Month",
          "Amount"
        ],
        budgets: []
      }
    },
    methods: {
      goToAddBudget(){
        this.$router.push('/budgets/add')
      }
    },
    beforeMount() {
      this.budgets = Api.getBudgets()
    }
  }
</script>