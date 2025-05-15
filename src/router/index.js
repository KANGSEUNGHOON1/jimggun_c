import { createRouter, createWebHistory } from 'vue-router';
import A1_home from '@/views/A1_home.vue';
import A2_information from '@/views/A2_information.vue';
import A3_charge from '@/views/A3_charge.vue';
import A4_reservation from '@/views/A4_reservation.vue';
import A5_review from '@/views/A5_review.vue';
import A5_reviewPost from '@/views/A5_reviewPost.vue';
import A6_cs from '@/views/A6_cs.vue';
import A7_login from '@/views/A7_login.vue';
import A7_signUp from '@/views/A7_signUp.vue';
import A7_signUpFinish from '@/views/A7_signUpFinish.vue';
import A8_mypage from '@/views/A8_mypage.vue';
import A9_inquire from '@/views/A9_inquire.vue';
import Step1Info from '@/views/Step1Info.vue';
import A4_reslogin from '@/views/A4_reslogin.vue';
// 기사페이지
import A11_workerLogin from '@/views/A11_workerLogin.vue';
import WorkerHome from '@/pages/worker/WorkerHome.vue';
import WorkerMain from '@/pages/worker/WorkerMain.vue';
import WorkerMypage from '@/pages/worker/WorkerMypage.vue';
import WorkerNotice from '@/pages/worker/WorkerNotice.vue';
import WorkerSettings from '@/pages/worker/WorkerSettings.vue';

// 관리자페이지 로그인
import A10_adminLogin from '@/views/A10_adminLogin.vue';
import AdminHome from '@/pages/admin/AdminHome.vue';
import Adminworker from '@/pages/admin/Adminworker.vue';
import Dashboard from '@/pages/admin/Dashboard.vue';
import Sidebar from '@/pages/admin/Sidebar.vue';
import Sidebarmenu from '@/pages/admin/Sidebarmenu.vue';
import Adminreservation from '@/pages/admin/Adminreservation.vue';

const routes = [
  { path: '/', component: A1_home },
  { path: '/information', component: A2_information },
  { path: '/charge', component: A3_charge },
  { path: '/reservation', component: A4_reservation },
  { path: '/review', component: A5_review },
  { path: '/reviewPost', component: A5_reviewPost },
  { path: '/cs', component: A6_cs },
  { path: '/login', component: A7_login },
  { path: '/signUp', component: A7_signUp },
  { path: '/signUpFinish', component: A7_signUpFinish },
  { path: '/mypage', component: A8_mypage },
  { path: '/inquire', component: A9_inquire },
  { path: '/Info', component: Step1Info },
  { path: '/reslogin', component: A4_reslogin },
  //기사페이지
  { path: '/worker', component: A11_workerLogin },
  // 기사페이지 로그인 후
  { path: '/worker/worker-main', component: WorkerMain },
  { path: '/worker/worker-home', component: WorkerHome },
  { path: '/worker/worker-mypage', component: WorkerMypage },
  { path: '/worker/worker-notice', component: WorkerNotice },
  { path: '/worker/worker-settings', component: WorkerSettings },
  // 관리자페이지
  {
    path: '/admin',
    name: 'A10_adminLogin',
    component: A10_adminLogin,
  },

  // 관리자페이지 로그인 후
  {
    path: '/admin',
    component: AdminHome,
    redirect: '/admin/adminhome',
    children: [
      { path: 'adminhome', component: AdminHome },
      { path: 'adminworker', component: Adminworker },
      { path: 'dashboard', component: Dashboard },
      { path: 'sidebar', component: Sidebar },
      { path: 'sidebarmenu', component: Sidebarmenu },
      { path: 'adminreservation', component: Adminreservation },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 페이지 이동 시 스크롤을 top으로 이동
    return { top: 0 };
  },
});
export default router;
