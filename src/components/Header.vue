<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // auth.js 경로에 맞게 수정
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const router = useRouter();

// 언어변경
const { t, locale } = useI18n();

const changeLang = (lang) => {
  locale.value = lang;
};

// 로그인 상태 계산
const isLoggedIn = computed(() => authStore.getIsLoggedIn);

// 로그아웃 후 리다이렉트
const handleLogout = () => {
  authStore.logout();
  router.push("/"); // 원하면 '/login'으로 변경 가능
};

// 예약하기 클릭 시 첫 화면으로 이동
const handleReservationClick = () => {
  router.push("/reservation");
  // 예약 페이지의 첫 화면으로 이동하기 위해 이벤트 발생
  window.dispatchEvent(new CustomEvent("resetToFirstStep"));
  isMenuOpen.value = false;
};
//
const closeMenu = () => {
  isMenuOpen.value = false;
};
// 모바일
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 외부 클릭 감지
const handleOutsideClick = (e) => {
  const clickedInsideNav = e.target.closest(".headerNav");
  const clickedHamburger = e.target.closest(".hamburger-menu");

  if (isMenuOpen.value && !clickedInsideNav && !clickedHamburger) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick, true);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick, true);
});
// 예약하기 로그인 상태 관리

//로그인 상태에 따라서 다른 곳으로 이동하게 하는 함수
function goToReservation() {
  if (isLoggedIn.value) {
    router.push("/reservation");
  } else {
    router.push("/reslogin");
  }
}
</script>

<template>
  <!-- 전체 레이아웃 -->
  <div class="headerWrap">
    <!-- 이너 -->
    <div class="header headerInner">
      <!-- 로고 -->
      <router-link to="/" class="headerLogo">
        <img src="/public/images/jimggun_logo.png" alt="짐꾼로고" />
      </router-link>
      <!-- 모바일 -->
      <div class="mobile-wrap">
        <!-- 메뉴 -->
        <ul class="headerNav" :class="{ open: isMenuOpen }">
          <li>
            <router-link to="/information" @click="closeMenu">{{
              t("info")
            }}</router-link>
          </li>
          <li>
            <router-link to="/charge" @click="closeMenu">{{
              t("price")
            }}</router-link>
          </li>
          <li>
            <router-link to="/reservation" @click.prevent="goToReservation">{{
              t("reserve")
            }}</router-link>
          </li>
          <li>
            <router-link to="/review" @click="closeMenu">{{
              t("review")
            }}</router-link>
          </li>
          <li>
            <router-link to="/cs" @click="closeMenu">{{ t("cs") }}</router-link>
          </li>
        </ul>
        <div class="headerSubnav">
          <!-- 로그인 상태일 때 -->
          <template v-if="isLoggedIn">
            <router-link to="/mypage">{{ t("mypage") }}</router-link>
            <router-link to="/" @click.prevent="handleLogout"
              >로그아웃</router-link
            >
          </template>

          <!-- 로그아웃 상태일 때 -->
          <template v-else>
            <router-link to="/login">로그인</router-link>
          </template>

          <!-- 햄버거바 -->
          <div
            class="hamburger-menu"
            @click="toggleMenu"
            :class="{ active: isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <!-- 언어 선택 -->
          <div class="headerSubLangs">
            <a href="#" @click.prevent="changeLang('kor')">KOR</a>
            <span>|</span>
            <a href="#" @click.prevent="changeLang('eng')">ENG</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";
// 전체 레이아웃
.headerWrap {
  width: 100%;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  // margin-bottom: 5px;
  // z-index: 10;
  // 헤더
  .header {
    position: relative;
    height: 90px;
    display: flex;
  }
  // 이너
  .headerInner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;
    background-color: $white;
    justify-content: space-between;
    // 로고
    .headerLogo {
      display: block;
      width: 10%;
      max-width: 200px;
      padding: 10px 0;
      box-sizing: border-box;
      @media screen and (max-width: 390px){
        width: 95px !important;
        height: 56px !important;
        padding: 0 !important;
        margin-top: 17px !important;
      }
      img {
        height: 100%;
        @media screen and (max-width: 390px){
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
    .mobile-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      .hamburger-menu {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        span {
          width: 25px;
          height: 3px;
          background-color: $font-gray;
        }
      }
      // 메뉴
      .headerNav {
        width: 750px;
        display: flex;
        align-items: center;
        li {
          width: calc(100% / 5);
          text-align: center;
          font-weight: bold;
          font-size: $text-font-L;
          a {
            color: $font-primary;
            text-decoration: none;
          }
        }
      }
      .headerNav.open {
      }
      // 로그인
      .headerSubnav {
        display: flex;
        align-items: center;
        gap: 30px;
        font-size: $text-font-S;
        font-weight: 500;
        a {
          color: $font-gray;
          text-decoration: none;
        }
        span {
          color: $font-gray;
          padding: 0 5px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .hamburger-menu {
    display: flex !important;
  }
  .headerNav {
    display: none !important;
    flex-direction: column !important;
    position: absolute !important;
    top: 90px !important;
    right: 0px !important;
    background-color: #fff !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    padding: 25px 20px !important;
    border-radius: 10px !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    max-width: 150px !important;
    gap: 30px !important;
    li {
      width: 100% !important;
    }
  }
  .headerNav.open {
    display: flex !important;
  }
  .headerSubLangs {
    display: none !important;
  }
}
</style>
