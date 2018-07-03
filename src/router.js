import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home'
// Member components
import Members from './components/Members'
// Member forms
import MemberCreate from './components/forms/MemberCreate'
import MemberDeactivate from './components/forms/MemberDeactivate'
import MemberCharge from './components/forms/MemberCharge'
import MemberPaid from './components/forms/MemberPaid'
import MemberPaidStuff from './components/forms/MemberPaidStuff'
import MemberActivate from './components/forms/MemberActivate'
import MemberAddressUpdate from './components/forms/MemberAddressUpdate'

// Task components
import Tasks from './components/Tasks'
// Task forms
import TaskBoost from './components/forms/TaskBoost'
import TaskClaim from './components/forms/TaskClaim'
import TaskCreate from './components/forms/TaskCreate'
import TaskRateUpdate from './components/forms/TaskRateUpdate'

// Cash forms
import CashExpense from './components/forms/CashExpense'
import CashReceive from './components/forms/CashReceive'

//Resource components
import Resources from './components/Resources'
import ResourceCreate from './components/forms/ResourceCreate'
import ResourceUse from './components/forms/ResourceUse'
import ResourceStock from './components/forms/ResourceStock'
import RentSet from './components/forms/RentSet'

// Invoice components
import Invoices from './components/Invoices'
import InvoiceCreate from './components/forms/InvoiceCreate'

import Manage from './components/Manage'
import Auth from './components/Auth'

import MemberCalendar from './components/MemberCalendar'
import TaskCalendar from './components/TaskCalendar'
import List from './components/EventsList'

import MyPage from './components/MyPage'

Vue.use(VueRouter)

const routes =[{
  path: '/',
  component: Home
},{
  path: '/auth',
  component: Auth
},{
  path: '/history',
  component: List
},{
  path: '/invoices',
  component: Invoices
},{
  path: '/invoices/*',
  component: Invoices
},{
  path: '/invoice_create/*',
  component: InvoiceCreate
},{
  path: '/mypage',
  component: MyPage
},{
  path: '/calendar/*',
  component: MemberCalendar
},{
  path: '/member_create',
  component: MemberCreate
},{
  path: '/member_create/*',
  component: MemberCreate
},{
  path: '/member_paid/*',
  component: MemberPaid
},{
  path: '/member_charge/*',
  component: MemberCharge
},{
  path: '/member_deactivate',
  component: MemberDeactivate
},{
  path: '/member_activate/*',
  component: MemberActivate
},{
  path: '/member_address_update/*',
  component: MemberAddressUpdate
},{
  path: '/members',
  component: Members
},{
  path: '/member_paid_stuff/*',
  component: MemberPaidStuff
},{
  path: '/resources',
  component: Resources
},{
  path: '/resource_create',
  component: ResourceCreate
},{
  path: '/resource_use/*',
  component: ResourceUse
},{
  path: '/resource_stock/*',
  component: ResourceStock
},{
  path:'/cash_expense',
  component: CashExpense
},{
  path: '/cash_receive',
  component: CashReceive
},{
  path: '/task_create',
  component: TaskCreate
},{
  path: '/task_claim/*',
  component: TaskClaim
},{
  path: '/task/*',
  component: TaskCalendar
},{
  path: '/task_rate_update/*',
  component: TaskRateUpdate
},{
  path: '/tasks',
  component: Tasks
},{
  path: '/task_boost/*',
  component: TaskBoost
},{
  path:'/manage',
  component: Manage
}]

const router = new VueRouter({
  routes
})

export default router
