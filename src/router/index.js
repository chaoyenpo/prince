import Vue from 'vue';
import Router from 'vue-router';

// Containers
import Full from '@/containers/Full';

// Views
import Dashboard from '@/views/Dashboard';
import HelloWorld from '@/views/HelloWorld';

// Views - Personal
import Profile from '@/views/personal/Profile';
import Account from '@/views/personal/Account';

// Views - Pages
import Login from '@/views/pages/Login';
import Register from '@/views/pages/Register';
// import ForgotPassword from '@/views/pages/ForgotPassword'
// import PasswordReset from '@/views/pages/PasswordReset'
import Maintain from '@/views/pages/Maintain';
import Page404 from '@/views/pages/Page404';
import Page500 from '@/views/pages/Page500';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { auth: false },
    },
    {
      path: '/app',
      redirect: '/app/dashboard',
      name: 'Home',
      component: Full,
      meta: { bodyClass: 'bg-light' },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { name: 'dashboard' },
        },
      ],
    },
    {
      path: '/app/personal',
      redirect: '/app/personal/profile',
      name: 'App',
      component: Full,
      meta: { bodyClass: 'bg-light' },
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: { name: 'profile' },
        },
        {
          path: 'account',
          name: 'Account',
          component: Account,
          meta: { name: 'account' },
        },
      ],
    },
    {
      path: '/pages',
      redirect: '/pages/login',
      name: 'Pages',
      component: {
        render(c) { return c('router-view'); },
      },
      meta: { bodyClass: 'bg-dark' },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404,
          meta: { auth: false },
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500,
          meta: { auth: false },
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: { auth: false },
        },
        // {
        //   path: 'password-reset',
        //   name: 'Forgot Password',
        //   component: ForgotPassword,
        //   meta: { auth: false },
        // },
        // {
        //   path: 'password-reset/:token/:user_id',
        //   name: 'Password Reset',
        //   component: PasswordReset,
        //   meta: { auth: false },
        // },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: { auth: false },
        },
        {
          path: 'maintain',
          name: 'Maintain',
          component: Maintain,
          meta: { auth: false },
        },
      ],
    },
    {
      path: '/*',
      redirect: '/pages/',
    },
  ],
});
