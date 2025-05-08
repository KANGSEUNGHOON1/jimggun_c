import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

const pinia = createPinia();

const messages = {
  kor: {
    info: "이용안내",
    price: "요금안내",
    reserve: "예약하기",
    review: "고객후기",
    cs: "고객센터",
    login: "로그인",
    logout: "로그아웃",
    mypage: "마이페이지",
  },
  eng: {
    info: "Information",
    price: "Pricing",
    reserve: "Reservation",
    review: "Reviews",
    cs: "Support",
    login: "Login",
    logout: "Logout",
    mypage: "My Page",
  },
};

const i18n = createI18n({
  legacy: false, // ✅ Composition API 모드로 설정
  locale: "kor",
  fallbackLocale: "eng",
  messages,
});

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount("#app");
