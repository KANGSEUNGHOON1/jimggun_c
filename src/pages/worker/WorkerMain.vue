<template>
  <div class="min-h-screen bg-orange-50 flex justify-center items-center">
    <div class="w-full max-w-[768px] min-h-screen bg-orange-500 text-white p-6 flex flex-col justify-between">
      <!-- 상단 날짜 & 날씨 -->
      <div class="flex justify-between items-center text-xl font-bold">
        <span>2025.04.28</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">24.2ºC</span>
          <img src="/images/hong/sun.png" alt="날씨" class="w-9 h-9 rounded-full" />
        </div>
      </div>

      <!-- 중앙 메시지 -->
      <div class="text-center mt-10">
        <h2 class="text-4xl font-bold mb-2.5">홍길동 기사님</h2>
        <p class="text-5xl font-bold">오늘도 안전운행 하세요!</p>
      </div>

      <!-- 하단 버튼 -->
      <div class="flex justify-center mb-10">
        <button class="bg-white text-orange-500 text-2xl font-bold w-64 h-20 rounded-full shadow-lg hover:scale-105 transition-transform">
          출근하기
        </button>
      </div>
    </div>
  </div>
</template>