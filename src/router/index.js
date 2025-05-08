import { createRouter, createWebHistory } from "vue-router";
import A1_home from "@/views/A1_home.vue";
import A2_information from "@/views/A2_information.vue";
import A3_charge from "@/views/A3_charge.vue";
import A4_reservation from "@/views/A4_reservation.vue";
import A5_review from "@/views/A5_review.vue";
import A5_reviewPost from "@/views/A5_reviewPost.vue";
import A6_cs from "@/views/A6_cs.vue";
import A7_login from "@/views/A7_login.vue";
import A7_signUp from "@/views/A7_signUp.vue";
import A7_signUpFinish from "@/views/A7_signUpFinish.vue";
import A8_mypage from "@/views/A8_mypage.vue";
import A9_inquire from "@/views/A9_inquire.vue";
import Step1Info from "@/views/Step1Info.vue";
import A4_reslogin from "@/views/A4_reslogin.vue";

const routes = [
  { path: "/", component: A1_home },
  { path: "/information", component: A2_information },
  { path: "/charge", component: A3_charge },
  { path: "/reservation", component: A4_reservation },
  { path: "/review", component: A5_review },
  { path: "/reviewPost", component: A5_reviewPost },
  { path: "/cs", component: A6_cs },
  { path: "/login", component: A7_login },
  { path: "/signUp", component: A7_signUp },
  { path: "/signUpFinish", component: A7_signUpFinish },
  { path: "/mypage", component: A8_mypage },
  { path: "/inquire", component: A9_inquire },
  { path: "/Info", component: Step1Info},
  { path: "/reslogin", component: A4_reslogin}
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 페이지 이동 시 스크롤을 top으로 이동
    return { top: 0 }
  },
});
export default router;
