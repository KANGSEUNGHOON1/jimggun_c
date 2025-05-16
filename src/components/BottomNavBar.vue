<template>
  <!-- 네비게이션 바 -->
  <div
    class="fixed bottom-0 w-full max-w-[768px] py-3 px-[100px] bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] flex mx-auto justify-between items-center gap-20 overflow-hidden z-50"
  >
    <!-- 홈 -->
    <router-link to="/worker/worker-home">
      <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
        <img
          :src="route.path === '/worker/worker-home' ? '/images/kang/homeActive.png' : '/images/kang/home.png'"
          alt="home"
        />
        <div
          :class="[
            'w-12 text-center text-base font-medium font-[Pretendard]',
            route.path === '/worker/worker-home' ? 'text-[#FF6F00]' : 'text-[#111]',
          ]"
        >
          홈
        </div>
      </div>
    </router-link>

    <!-- 알림 -->
    <router-link to="/worker/worker-notice">
      <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
        <img :src="noticeIcon" alt="notice" />
        <div
          :class="[
            'w-12 text-center text-base font-medium font-[Pretendard]',
            route.path === '/worker/worker-notice' ? 'text-[#FF6F00]' : 'text-[#111]',
          ]"
        >
          알림
        </div>
      </div>
    </router-link>

    <!-- 마이페이지 -->
    <router-link to="/worker/worker-mypage">
      <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
        <img
          :src="route.path === '/worker/worker-mypage' ? '/images/kang/mypageActive.png' : '/images/kang/mypage.png'"
          alt="mypage"
        />
        <div
          :class="[
            'w-full text-center text-base font-medium font-[Pretendard]',
            route.path === '/worker/worker-mypage' ? 'text-[#FF6F00]' : 'text-[#111]',
          ]"
        >
          나의업무
        </div>
      </div>
    </router-link>

    <!-- 환경설정 -->
    <router-link to="/worker/worker-settings">
      <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
        <img
          :src="
            route.path === '/worker/worker-settings' ? '/images/kang/settingsActive.png' : '/images/kang/settings.png'
          "
          alt="settings"
        />
        <div
          :class="[
            'w-full text-center text-base font-medium font-[Pretendard]',
            route.path === '/worker/worker-settings' ? 'text-[#FF6F00]' : 'text-[#111]',
          ]"
        >
          환경설정
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const visitedNotice = ref(localStorage.getItem('visited-notice') === 'true')

// 라우터가 완전히 바뀐 후 이벤트 처리
onMounted(() => {
  router.afterEach((to) => {
    if (to.path === '/worker/worker-notice') {
      visitedNotice.value = true
      localStorage.setItem('visited-notice', 'true')
    }
  })
})

const noticeIcon = computed(() => {
  const isActive = route.path === '/worker/worker-notice'
  const prefix = visitedNotice.value ? 'noticeB' : 'notice'
  const suffix = isActive ? 'Active' : ''
  return `/images/kang/${prefix}${suffix}.png`
})
</script>