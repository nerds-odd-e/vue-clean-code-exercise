import Vue from 'vue'
import Router from 'vue-router'
import Profile from './views/Profile.vue'
import BudgetList from './views/BudgetList.vue'
import AddBudget from './views/AddBudget.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', redirect: '/budgets' },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/budgets', name: 'budgets', component: BudgetList },
    { path: '/budgets/add', name: 'addBudget', component: AddBudget },
  ]
})
