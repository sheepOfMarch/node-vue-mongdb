import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import DynastyEdit from '../views/DynastyEdit.vue'
import DynastyList from '../views/DynastyList.vue'

import EmperorEdit from '../views/EmperorEdit.vue'
import EmperorList from '../views/EmperorList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      { path: 'dynasties/create', component: DynastyEdit},
      { path: 'dynasties/edit/:id', component: DynastyEdit, props: true},
      { path: 'dynasties/list', component: DynastyList},

      { path: 'emperors/create', component: EmperorEdit},
      { path: 'emperors/edit/:id', component: EmperorEdit, props: true},
      { path: 'emperors/list', component: EmperorList},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
