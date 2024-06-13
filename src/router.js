import Vue from 'vue';
import VueRouter from 'vue-router';
import { checkIfUserIsAuthenticated } from './utils/auth.js';


Vue.use(VueRouter);

// 导入组件
import LoginView from './views/login.vue';
import IndexView from './views/index.vue';

// 创建路由实例
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LoginView
    },
    {
      path: '/index',
      component: IndexView
    },
    // 其他路由规则...
  ]
});

// 添加导航守卫
router.beforeEach((to, from, next) => {
    const isAuthenticated = checkIfUserIsAuthenticated(); // 检查用户是否已登录
    if (to.path !== '/' && !isAuthenticated) {
      next('/'); // 未登录时跳转到默认界面
    } else {
      next(); // 继续路由导航
    }
  });
export default router;
