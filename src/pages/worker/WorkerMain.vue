<template>
  <div v-if="!redirecting" class="min-h-screen bg-orange-50 flex justify-center items-center">
    <div class="w-full max-w-[768px] min-h-screen bg-orange-500 text-white p-6 flex flex-col">
      <!-- 상단 -->
      <div class="flex justify-between items-center text-xl font-bold">
        <span>{{ formattedDate }}</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">24.2ºC</span>
          <img src="/images/hong/sun.png" alt="날씨" class="w-9 h-9 rounded-full" />
        </div>
      </div>

      <!-- 중앙 텍스트 -->
      <div class="contentsbox flex-grow flex flex-col justify-center items-center text-center">
        <h2 class="text-4xl font-bold mb-2.5">홍길동 기사님</h2>
        <p class="text-5xl font-bold">오늘도 안전운행 하세요!</p>

        <router-link to="/worker/worker-home" custom v-slot="{ navigate }">
          <div class="flex justify-center mt-10">
            <button @click="handleNavigate(navigate)" class="flex items-center justify-center bg-white text-orange-500 text-2xl font-bold w-64 h-20 rounded-full shadow-lg hover:scale-105 transition-transform">
              <span class="text-3xl">출근하기</span>
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const redirecting = ref(true)

// 날짜 포맷
const today = new Date()
const days = ['일', '월', '화', '수', '목', '금', '토']
const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} (${days[today.getDay()]})`

onMounted(() => {
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  const lastCheckedDate = localStorage.getItem('worker-checked-date')

  // 로그인 후 "/worker"에서 넘어온 경우에만 자동 리디렉션
  const redirectedFromWorker = route.redirectedFrom?.fullPath === '/worker'

  if (redirectedFromWorker && lastCheckedDate === todayKey) {
    router.replace('/worker/worker-home')
  } else {
    redirecting.value = false
  }
})

// 출근하기 버튼 클릭 시 실행
function handleNavigate(navigate) {
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  localStorage.setItem('worker-checked-date', todayKey)
  navigate() // worker-home으로 이동
}
</script>
