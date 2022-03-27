import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("../views/home/Home.vue")
const Category = () => import("../views/category/Category.vue")
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/details/Detail.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/category',
      component: Category,
    },
    {
      path: '/profile',
      component: Profile,
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/detail/:iid',
      component: Detail,
    }
  ],
  mode: 'history'
})
