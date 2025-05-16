<template>
  <!--배경색-->
  <div class="bg-white md:bg-[#FDF3E7] min-h-screen flex flex-col">
    <!--전체영역-->
    <div class="w-full max-w-[768px] mx-auto h-screen bg-white flex-1">
      <div class="max-w-3xl mx-auto p-4 space-y-6">
        <!-- 헤더 영역 -->
        <div class="relative flex items-center h-16">
          <!-- 텍스트 -->
          <h1 class="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-black">알림사항</h1>
        </div>

        <!-- 알림 리스트 -->
        <div class="grid gap-4 pb-[140px]">
          <div
            v-for="notice in noticeList"
            :key="notice.id"
            class="bg-white pt-11 px-4 space-y-2 border-b border-zinc-300 last:border-b-0"
          >
            <p class="text-2xl font-medium text-neutral-900">
              <span v-if="notice.isUrgent" class="text-red-500">(긴급) </span>{{ notice.title }}
            </p>
            <p class="text-xl pb-11 text-neutral-500">{{ notice.date }}</p>
          </div>
        </div>
      </div>
      <!--네비게이션 바-->
      <div
        class="fixed bottom-0 w-full max-w-[768px] py-3 px-[100px] bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] flex mx-auto justify-between items-center gap-20 overflow-hidden z-50"
      >
        <!-- 홈 아이콘 -->
        <router-link to="/worker/worker-home">
          <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
            <img src="/images/kang/home.png" alt="home" />
            <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">홈</div>
          </div></router-link
        >

        <!-- 알림 아이콘 -->
        <router-link to="/worker/worker-notice">
          <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
            <img src="/images/kang/noticeActive.png" alt="notice" />
            <div class="w-12 text-center text-[#FF6F00] text-base font-medium font-['Pretendard']">알림</div>
          </div></router-link
        >

        <!-- 마이페이지 아이콘 -->
        <router-link to="/worker/worker-mypage">
          <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
            <img src="/images/kang/mypage.png" alt="mypage" />
            <div class="w-20 text-center text-[#111] text-base font-medium font-['Pretendard']">마이페이지</div>
          </div></router-link
        >

        <!-- 환경설정 아이콘 -->
        <router-link to="/worker/worker-settings">
          <div class="flex flex-col items-center gap-2.5 w-14 cursor-pointer">
            <img src="/images/kang/settings.png" alt="settings" />
            <div class="w-full text-center text-[#111] text-base font-medium font-['Pretendard']">환경설정</div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
const noticeList = [
  {
    id: 1,
    title: '대구시장배 전국철인3종경기 개최로 5월 11일(일) 신천동로, 무학로 일부의 교통이 통제됨을 알려드립니다.',
    date: '5월 10일 14:07',
    isUrgent: false,
  },
  {
    id: 2,
    title: '파워풀 대구 페스티벌 기간 5월 10일(토)~5월 11일(일) 동안 국채보상로 전면 교통이 통제됨을 알려드립니다.',
    date: '5월 9일 13:11',
    isUrgent: false,
  },
  {
    id: 3,
    title: '금일 16:00부로 경부선 북대구IC 인근 산불로 인한 북대구TG 진입, 진출 차단을 알려드립니다.',
    date: '5월 4일 16:02',
    isUrgent: true,
  },
  {
    id: 4,
    title: '2025 국제 어린이 마라톤 개최로 5월 5일(월) 두류공원 일대 차량이 통제됨을 알려드립니다.',
    date: '5월 4일 13:28',
    isUrgent: false,
  },
  {
    id: 5,
    title: '새로운 이달의 안전 동영상이 업로드 되었습니다.',
    date: '4월 30일 11:48',
    isUrgent: false,
  },
  {
    id: 6,
    title: '금일 예약번호 18번 건이 예약 취소되었습니다.',
    date: '4월 25일 01:02',
    isUrgent: true,
  },
];
</script>
