<template>
  <!-- 월 페이지네이션 -->
  <div class="w-full max-w-xs mx-auto mt-6 mb-[40px]">
    <div class="flex items-center justify-between px-2">
      <button @click="goPrev" class="transition-transform hover:scale-110 active:scale-95">
        <img src="/images/kang/pre.png" class="w-3 h-3.5" alt="이전 달" />
      </button>

      <span class="text-[#111] text-base font-medium font-['Pretendard']">
        {{ currentLabel }}
      </span>

      <button @click="goNext" class="transition-transform hover:scale-110 active:scale-95">
        <img src="/images/kang/next.png" class="w-3 h-3.5" alt="다음 달" />
      </button>
    </div>
  </div>

  <!--달력-->
  <div class="max-w-[728px] w-full mx-auto">
    <!-- 요일 헤더 -->
    <div
      class="grid grid-cols-7 bg-white text-center text-sm font-medium text-[#505050] border-t border-l border-r border-[#D9D9D9] rounded-t-lg"
    >
      <div class="py-3 text-[#FF4B0F] border-r border-[#D9D9D9]">일</div>
      <div class="py-3 border-r border-[#D9D9D9]">월</div>
      <div class="py-3 border-r border-[#D9D9D9]">화</div>
      <div class="py-3 border-r border-[#D9D9D9]">수</div>
      <div class="py-3 border-r border-[#D9D9D9]">목</div>
      <div class="py-3 border-r border-[#D9D9D9]">금</div>
      <div class="py-3 text-[#4299E1]">토</div>
    </div>

    <!-- 달력 그리드 -->
    <div class="grid grid-cols-7 border border-[#D9D9D9] rounded-b-lg overflow-hidden">
      <div
        v-for="date in calendarDates"
        :key="`${date.year}-${date.month}-${date.day}`"
        class="h-24 bg-white border-r border-b border-[#D9D9D9] p-1 relative hover:bg-gray-50 transition-colors"
        :class="{ 'last:border-r-0': true }"
      >
        <span
          class="absolute top-1 right-2 text-[11px]"
          :class="{
            'text-[#D9D9D9]': !date.inMonth,
            'text-[#FF4B0F]': date.inMonth && date.weekday === 0,
            'text-[#4299E1]': date.inMonth && date.weekday === 6,
            'text-[#767676]': date.inMonth && date.weekday !== 0 && date.weekday !== 6,
          }"
        >
          {{ date.day }}
        </span>

        <!-- 근무 정보 표시 -->
        <div v-if="getWorkInfo(date)" class="absolute inset-x-1 top-8">
          <div
            :class="getShiftClass(getWorkInfo(date).shift)"
            class="text-[14px] w-full rounded-md truncate text-right pr-1 mb-1"
          >
            <p class="pr-1">{{ getWorkInfo(date).shift }}</p>
          </div>
          <div
            class="bg-white text-[#505050] text-[14px] outline outline-1 outline-[#E5E5EC] w-full rounded-md truncate text-right pr-1"
          >
            <p>₩ {{ getWorkInfo(date).pay.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 근무 현황 -->
  <div class="w-full max-w-[730px] mx-auto mt-[45px] mb-[140px] p-4 bg-white rounded-md transition-all duration-300">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-[#111] text-xl font-medium font-['Pretendard']">
        {{ currentMonthLabel }}
      </h2>
    </div>

    <div class="flex flex-wrap justify-between gap-4 items-start">
      <!-- 출근 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5 hover:shadow-lg transition-all duration-200"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">출근</div>
        <div class="text-[#FF6F00] text-lg font-medium font-['Pretendard']">
          {{ attendanceCount }}
        </div>
      </div>
      <!-- 결근 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5 hover:shadow-lg transition-all duration-200"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">결근</div>
        <div class="text-[#767676] text-lg font-medium font-['Pretendard']">0</div>
      </div>
      <!-- 지각 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5 hover:shadow-lg transition-all duration-200"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">지각</div>
        <div class="text-[#767676] text-lg font-medium font-['Pretendard']">0</div>
      </div>
      <!-- 조퇴 -->
      <div
        class="flex flex-col items-center justify-center w-[100px] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-7 py-5 hover:shadow-lg transition-all duration-200"
      >
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1">조퇴</div>
        <div class="text-[#767676] text-lg font-medium font-['Pretendard']">0</div>
      </div>
      <!-- 인센티브 -->
      <div class="flex flex-col items-center justify-center bg-white rounded-[10px] pt-6">
        <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1 text-center">이 달의 인센티브</div>
        <div
          class="text-[#FF6F00] text-lg font-medium font-['Pretendard'] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-4 py-2 w-[180px] text-center hover:shadow-lg transition-all duration-200"
        >
          ₩ {{ totalMonthlyPay.toLocaleString() }}
        </div>
      </div>
    </div>

    <!-- 빈 데이터일 때 안내 -->
    <div v-if="attendanceCount === 0" class="text-center py-8 mt-6">
      <div class="text-[#767676] text-base">{{ currentPage.month }}월에는 근무 기록이 없습니다.</div>
    </div>
  </div>

  <!--네비게이션 바-->
  <div
    class="fixed bottom-0 left-0 w-full py-3 bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-20 overflow-hidden z-50"
  >
    <!-- 홈 아이콘 -->
    <router-link to="/worker/worker-home">
      <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
        <img src="/images/kang/home.png" alt="home" />
        <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">홈</div>
      </div></router-link
    >

    <!-- 알림 아이콘 -->
    <div class="flex flex-col items-center gap-2 w-14 cursor-pointer transition-transform hover:scale-105">
      <img src="/images/kang/notice.png" alt="notice" />
      <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">알림</div>
    </div>

    <!-- 마이페이지 아이콘 -->
    <router-link to="/worker/worker-mypage">
      <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
        <img src="/images/kang/mypageActive.png" alt="mypage" />
        <div class="w-20 text-center text-[#FF6F00] text-base font-medium font-['Pretendard']">마이페이지</div>
      </div></router-link
    >

    <!-- 환경설정 아이콘 -->
    <div class="flex flex-col items-center gap-2.5 w-14 cursor-pointer transition-transform hover:scale-105">
      <img src="/images/kang/settings.png" alt="settings" />
      <div class="w-full text-center text-[#111] text-base font-medium font-['Pretendard']">환경설정</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 현재 페이지 상태
const currentPage = ref({ month: 5, year: 2025 });

// 근무 데이터
const workData = ref({
  // 4월 데이터
  '2025-04-03': { shift: '오전', pay: 22050 },
  '2025-04-04': { shift: '오전', pay: 21170 },
  '2025-04-05': { shift: '오전', pay: 28550 },
  '2025-04-06': { shift: '오전', pay: 25000 },
  '2025-04-10': { shift: '오전', pay: 22250 },
  '2025-04-11': { shift: '오전', pay: 21700 },
  '2025-04-12': { shift: '오전', pay: 30050 },
  '2025-04-13': { shift: '오전', pay: 25850 },
  '2025-04-17': { shift: '오전', pay: 19050 },
  '2025-04-18': { shift: '오전', pay: 21950 },
  '2025-04-19': { shift: '오전', pay: 29400 },
  '2025-04-20': { shift: '오전', pay: 23750 },
  '2025-04-24': { shift: '오후', pay: 20600 },
  '2025-04-25': { shift: '오후', pay: 21050 },
  '2025-04-26': { shift: '오후', pay: 30150 },
  '2025-04-27': { shift: '오후', pay: 25150 },

  // 5월 데이터
  '2025-05-01': { shift: '오후', pay: 34200 },
  '2025-05-02': { shift: '오후', pay: 36720 },
  '2025-05-03': { shift: '오후', pay: 34350 },
  '2025-05-04': { shift: '오후', pay: 33850 },

  //3월 데이터
  '2025-03-01': { shift: '오전', pay: 28500 },
  '2025-03-02': { shift: '오전', pay: 29500 },
  '2025-03-06': { shift: '오전', pay: 20200 },
  '2025-03-07': { shift: '오전', pay: 20800 },
  '2025-03-08': { shift: '오전', pay: 30500 },
  '2025-03-09': { shift: '오전', pay: 20600 },
  '2025-03-13': { shift: '오후', pay: 22100 },
  '2025-03-14': { shift: '오후', pay: 24400 },
  '2025-03-15': { shift: '오후', pay: 31200 },
  '2025-03-16': { shift: '오후', pay: 20800 },
  '2025-03-20': { shift: '오후', pay: 21800 },
  '2025-03-21': { shift: '오후', pay: 20800 },
  '2025-03-22': { shift: '오후', pay: 30800 },
  '2025-03-23': { shift: '오후', pay: 23800 },
  '2025-03-27': { shift: '오후', pay: 22900 },
  '2025-03-28': { shift: '오후', pay: 21900 },
  '2025-03-29': { shift: '오후', pay: 31750 },
  '2025-03-30': { shift: '오후', pay: 24600 },
});

// 현재 월 레이블
const currentLabel = computed(() => {
  return `${currentPage.value.year}년 ${currentPage.value.month}월`;
});

// 근무현황 레이블
const currentMonthLabel = computed(() => {
  return `${currentPage.value.year}년 ${String(currentPage.value.month).padStart(2, '0')}월 근무 현황`;
});

// 달력 날짜 배열 생성
const calendarDates = computed(() => {
  const year = currentPage.value.year;
  const month = currentPage.value.month;

  // 해당 월의 첫날과 마지막날
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // 첫 주 시작일 (일요일)
  const startDate = new Date(firstDay);
  const firstWeekday = firstDay.getDay();
  startDate.setDate(startDate.getDate() - firstWeekday);

  // 마지막 주 끝일 (토요일)
  const endDate = new Date(lastDay);
  const lastWeekday = lastDay.getDay();
  endDate.setDate(endDate.getDate() + (6 - lastWeekday));

  const dates = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push({
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
      weekday: current.getDay(),
      inMonth: current.getMonth() + 1 === month && current.getFullYear() === year,
    });
    current.setDate(current.getDate() + 1);
  }

  return dates;
});

// 근무 정보 조회
function getWorkInfo(date) {
  if (!date.inMonth) return null;
  const dateKey = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  return workData.value[dateKey];
}

// 시프트 클래스 결정
function getShiftClass(shift) {
  return shift === '오전' ? 'bg-[#45A6FF]/20 text-[#111]' : 'bg-[#5FC95E]/20 text-[#111]';
}

// 출근 수 계산
const attendanceCount = computed(() => {
  const year = currentPage.value.year;
  const month = String(currentPage.value.month).padStart(2, '0');
  return Object.keys(workData.value).filter((key) => key.startsWith(`${year}-${month}`)).length;
});

// 인센티브 합계 계산
const totalMonthlyPay = computed(() => {
  const year = currentPage.value.year;
  const month = String(currentPage.value.month).padStart(2, '0');
  return Object.entries(workData.value)
    .filter(([date]) => date.startsWith(`${year}-${month}`))
    .reduce((sum, [_, info]) => sum + info.pay, 0);
});

// 월 변경 함수
function goPrev() {
  if (currentPage.value.month === 1) {
    currentPage.value = { month: 12, year: currentPage.value.year - 1 };
  } else {
    currentPage.value = {
      ...currentPage.value,
      month: currentPage.value.month - 1,
    };
  }
}

function goNext() {
  if (currentPage.value.month === 12) {
    currentPage.value = { month: 1, year: currentPage.value.year + 1 };
  } else {
    currentPage.value = {
      ...currentPage.value,
      month: currentPage.value.month + 1,
    };
  }
}
</script>

<style scoped></style>
