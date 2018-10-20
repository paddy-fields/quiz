import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import Question from './components/Question.vue'

Vue.use(Router)

const router = new Router({
 routes: [
   {
     path: '/',
     name:'language',
     component: LanguageSelector,
   },
   {
     path: '/question',
     name:'question',
     component: Question,
     props: true
   }
 ]
})

new Vue({
 el: '#app',
 router,
 render: h => h(App),
})