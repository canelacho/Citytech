
import Site from './components/site.vue'
import Login from './components/login.vue'
import Dashboard from './components/dashboard/dashboard-main.vue'
import UsersViewAdmin from './components/users/users-view-admin.vue'
import UsersNewAdmin from './components/users/user-new-admin.vue'
import UsersListAdmin from './components/users/users-list-admin.vue'
import UserResumeAdmin from './components/users/user-resume-admin.vue'

import UserResumeUser from './components/users/user-resume-user.vue'
import PaymentViewUser from './components/payments/payment-view-user.vue'
import Events from './components/events.vue'
import Messages from './components/messages.vue'
import PaymentSendUser from './components/payments/payment-send-user.vue'
import PaymentBalanceUser from './components/payments/payment-balance-user.vue'
import MyProfile from './components/my-profile.vue'
import msgOk from './components/msg-ok.vue'
import LogOut from './components/logout.vue'
import NotFound404 from './components/not-found-404.vue'

import { store } from './store/store'


export const routes = [
  { path : '/', component : Site },
  { path : '/login', component : Login, name:'login' },
  { beforeEnter : ((to, from, next) => {
      next(store.getters.sessionStatus)
    }),
    path : '/dashboard', component : Dashboard, name:'dashboard', children : [
        { path : 'users-view-admin', component : UsersViewAdmin, name:'users-view-admin', children : [
          { path : 'user-new-admin', component : UsersNewAdmin, name:'user-new-admin'},
          { path : 'users-list-admin', component : UsersListAdmin, name:'users-list-admin'},
          { path : 'user-resume-admin', component : UserResumeAdmin, name:'user-resume-admin'}
        ] },
        { path : 'resume-user', component : UserResumeUser, name:'resume-user'},
        { path : 'events-view-user', component : Events, name:'events-view-user'},
        { path : 'messages-view-user', component : Messages, name:'messages-view-user'},
        { path : 'payment-view-user', component : PaymentViewUser, name:'payment-view-user', children : [
          { path : 'payment-balance-user', component : PaymentBalanceUser, name:'payment-balance-user' },
          { path : 'payment-send-user', component : PaymentSendUser, name:'payment-send-user' }        
        ]},
        { path : 'profile-view-user', component : MyProfile, name:'profile-view-user'},
        { path : 'msg-ok', component : msgOk, name : 'msg-ok' },
        { path : '/log-out', component : LogOut, name:'log-out'},
    ],
  },
  { path : '*', component : NotFound404}
]