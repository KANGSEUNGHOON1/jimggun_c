<template>
  <!-- 월 페이지네이션 -->
  <div class="w-full max-w-xs mx-auto mt-6 mb-[65px]">
    <div class="flex items-center justify-between px-2">
      <button @click="goPrev">
        <img src="/images/kang/pre.png" class="w-3 h-3.5" alt="이전 달" />
      </button>

      <span class="text-[#111] text-base font-medium font-['Pretendard']">
        {{ currentLabel }}
      </span>

      <button @click="goNext">
        <img src="/images/kang/next.png" class="w-3 h-3.5" alt="다음 달" />
      </button>
    </div>
  </div>

  <!--달력-->
  <!-- 요일 헤더 -->
  <div class="max-w-[728px] w-full mx-auto grid grid-cols-7 bg-white text-center text-sm font-medium text-[#505050]">
    <div class="py-2 text-[#FF4B0F]">일</div>
    <div class="py-2">월</div>
    <div class="py-2">화</div>
    <div class="py-2">수</div>
    <div class="py-2">목</div>
    <div class="py-2">금</div>
    <div class="py-2 text-[#4299E1]">토</div>
  </div>
  <div class="max-w-[728px] w-full mx-auto rounded-[10px] outline outline-1 outline-[#D9D9D9] overflow-hidden">
    <!-- 날짜 격자 -->
    <div class="grid grid-cols-7 grid-rows-5 gap-px bg-[#D9D9D9]">
      <!-- 날짜 셀 -->
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#D9D9D9]">27</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#D9D9D9]">28</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#D9D9D9]">29</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#D9D9D9]">30</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">
        1
        <div class="absolute top-8 bg-[#45A6FF]/20 text-[#111] text-[14px] w-[92%] rounded-md truncate text-right pr-1">
          <p class="pr-1">오전</p>
        </div>

        <div
          class="absolute top-[60px] bg-white text-[#505050] text-[14px] outline outline-1 outline-[#E5E5EC] w-[92%] rounded-md truncate text-right pr-1"
        >
          <p>₩ 32,050</p>
        </div>
      </div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">
        2
        <div class="absolute top-8 bg-[#45A6FF]/20 text-[#111] text-[14px] w-[92%] rounded-md truncate text-right pr-1">
          <p class="pr-1">오전</p>
        </div>

        <div
          class="absolute top-[60px] bg-white text-[#505050] text-[14px] outline outline-1 outline-[#E5E5EC] w-[92%] rounded-md truncate text-right pr-1"
        >
          <p>₩ 36,720</p>
        </div>
      </div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">3</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">4</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">
        5
        <div class="absolute top-8 bg-[#5FC95E]/20 text-[#111] text-[14px] w-[92%] rounded-md truncate text-right pr-1">
          <p class="pr-1">오후</p>
        </div>

        <div
          class="absolute top-[60px] bg-white text-[#505050] text-[14px] outline outline-1 outline-[#E5E5EC] w-[92%] rounded-md truncate text-right pr-1"
        >
          <p>₩ 31,350</p>
        </div>
      </div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">6</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">7</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">8</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">9</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">10</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">11</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">12</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">23</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">14</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">15</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">16</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">17</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">18</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">19</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">20</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">21</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">22</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">23</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">24</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">25</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">26</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">27</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">28</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">29</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">30</div>
      <div class="bg-white h-24 p-1 relative text-[11px] text-right pr-2 text-[#767676]">31</div>
    </div>
  </div>

  <!-- 근무 현황 -->
  <div class="w-full max-w-[730px] mx-auto mt-[45px] mb-[140px] p-4 bg-white rounded-md">
    <h2 class="text-[#111] text-xl font-medium font-['Pretendard'] mb-4">5월 근무 현황</h2>

    <div class="flex flex-wrap justify-between gap-4 items-start">
      <!-- 출근 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">출근</div>
        <div class="text-[#FF6F00] text-lg font-medium font-['Pretendard']">3</div>
      </div>
      <!-- 결근 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">결근</div>
        <div class="text-[#767676] text-lg font-medium font-['Pretendard']">0</div>
      </div>
      <!-- 지각 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">지각</div>
        <div class="text-[#767676] text-lg font-medium font-['Pretendard']">0</div>
      </div>
      <!-- 조퇴 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">조퇴</div>
        <div class="text-[#767676] text-lg font-medium font-['Pretendard']">0</div>
      </div>
      <!-- 인센티브 -->
      <div class="flex flex-col items-center justify-center bg-white rounded-[10px] pt-6">
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1 text-right">이 달의 인센티브</div>
        <div
          class="text-[#FF6F00] text-lg font-medium font-['Pretendard'] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-4 py-2 w-[180px]"
        >
          ₩ 100,120
        </div>
      </div>
    </div>
  </div>

  <!--네비게이션 바-->
  <div
    class="fixed bottom-0 left-0 w-full py-3 bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-20 overflow-hidden z-50"
  >
    <!-- 홈 아이콘 -->
    <router-link to="/worker/worker-home">
      <div class="flex flex-col items-center gap-2.5 w-14">
        <img src="/images/kang/home.png" alt="home" />
        <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">홈</div>
      </div></router-link
    >

    <!-- 알림 아이콘 -->
    <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
      <img src="/images/kang/notice.png" alt="notice" />
      <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">알림</div>
    </div>

    <!-- 마이페이지 아이콘 -->
    <router-link to="/worker/worker-mypage">
      <div class="flex flex-col items-center gap-2.5 w-14">
        <img src="/images/kang/mypage.png" alt="mypage" />
        <div class="w-20 text-center text-[#111] text-base font-medium font-['Pretendard']">마이페이지</div>
      </div></router-link
    >

    <!-- 환경설정 아이콘 -->
    <div class="flex flex-col items-center gap-2.5 w-14 cursor-pointer">
      <img src="/images/kang/settings.png" alt="settings" />
      <div class="w-full text-center text-[#111] text-base font-medium font-['Pretendard']">환경설정</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

// 날짜 상태
const currentDate = ref(new Date(2025, 4)); // 5월

// 표시할 월 문자열
const currentLabel = ref('');

// 날짜 → 문자열 변환
function updateLabel() {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  currentLabel.value = `${year}년 ${month}월`;
}

// 이전/다음 버튼 함수
function goPrev() {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1);
  updateLabel();
}

function goNext() {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1);
  updateLabel();
}

// 초기 렌더
updateLabel();
</script>
