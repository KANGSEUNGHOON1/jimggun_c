<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// 플로팅 버튼들 전체
// 로그인 상태 기반 라우터 설정
const router = useRouter();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.getIsLoggedIn);

// gotop 버튼
const smoothlyBtn = ref(null);
const topBtnWrap = ref(null);
const isFooterVisible = ref(false);

// resBtn 버튼 클릭 시 라우팅
function handleGoToReservation() {
  if (isLoggedIn.value) {
    router.push("/reservation");
  } else {
    router.push("/reslogin");
  }
}

// top 버튼 부드럽게
onMounted(() => {
  smoothlyBtn.value?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 푸터요소 관찰
  const footer = document.querySelector("footer");
  if (footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible.value = entry.isIntersecting;
        });
      },
      {
        threshold: 0.01,
        rootMargin: "-100px 0px 0px 0px",
      }
    );
    observer.observe(footer);
  }
});
</script>
<template>
  <div class="topBtnWrap" ref="topBtnWrap" :class="{ 'footer-visible': isFooterVisible }">
    <a href="#" class="topBtn" ref="smoothlyBtn">↑</a>
    <div class="resBtn" @click="handleGoToReservation">
      <img src="/images/hong/gotopBtn-logo-w.png" alt="gotopBtn로고" />
      <span>고용하기</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "/src/assets/variables";
// GoTop 버튼
.topBtnWrap {
  position: fixed;
  right: 100px;
  bottom: 60px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease-in-out;

  &.footer-visible {
    transform: translateY(-250px);
  }

  .topBtn {
    color: #ff6f00;
    font-size: 40px;
    text-decoration: none;
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .resBtn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: $primary-color;
    text-align: center;
    box-shadow: $info-boxShadow;
    text-decoration: none;
    padding: 13.5px 0;
    span {
      display: inline-block;
      color: $white;
      font-size: 12px;
    }
  }

  @media screen and (max-width: 768px) {
    display: none !important;
  }
}
</style>
