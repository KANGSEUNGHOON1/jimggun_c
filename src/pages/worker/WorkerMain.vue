<template>
  <div class="min-h-screen bg-orange-50 flex justify-center items-center">
    <div class="w-full max-w-[768px] min-h-screen bg-orange-500 text-white p-6 flex flex-col">
      <!-- 상단 -->
      <div class="flex justify-between items-center text-xl font-bold">
        <span>2025.04.28</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">24.2ºC</span>
          <img src="/images/hong/sun.png" alt="날씨" class="w-9 h-9 rounded-full" />
        </div>
      </div>

      <!-- contentsbox -->
      <!-- 중앙 텍스트 -->
      <div class="contentsbox flex-grow flex flex-col justify-center items-center text-center">
        <h2 class="text-4xl font-bold mb-2.5">홍길동 기사님</h2>
        <p class="text-5xl font-bold">오늘도 안전운행 하세요!</p>

        <!-- 출근하기 버튼 -->
          <router-link to="/worker/worker-home" class="flex justify-center mt-10" custom v-slot="{ navigate  }">
            <button @click="navigate " class="flex items-center justify-center bg-white text-orange-500 text-2xl font-bold w-64 h-20 rounded-full shadow-lg hover:scale-105 transition-transform">
             <span class="text-3xl">출근하기</span>
            </button>
          </router-link>
      </div>
    </div>
  </div>
</template>
