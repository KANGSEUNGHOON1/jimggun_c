<template>
  <!--배경색-->
  <div class="bg-white md:bg-[#FDF3E7] min-h-screen flex flex-col">
    <!--전체영역-->
    <div class="w-full max-w-[768px] mx-auto h-screen bg-white flex-1">
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
        <div class="grid grid-cols-7 bg-white text-center text-sm font-medium text-[#505050]">
          <div class="py-3 text-[#FF4B0F]">일</div>
          <div class="py-3">월</div>
          <div class="py-3">화</div>
          <div class="py-3">수</div>
          <div class="py-3">목</div>
          <div class="py-3">금</div>
          <div class="py-3 text-[#4299E1]">토</div>
        </div>

        <!-- 달력 그리드 -->
        <div class="grid grid-cols-7 border border-[#D9D9D9] rounded-[10px] overflow-hidden">
          <div
            v-for="(date, index) in calendarDates"
            :key="`${date.year}-${date.month}-${date.day}`"
            :class="[
              'h-24 bg-white p-1 relative hover:bg-gray-50 transition-colors cursor-pointer',
              'border-[#D9D9D9]',
              (index + 1) % 7 !== 0 ? 'border-r' : '', // 오른쪽 줄 제거
              index < calendarDates.length - 7 ? 'border-b' : '', // 마지막 줄 아래 줄 제거
            ]"
            @click="isModalOpen = true"
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
      <div
        class="w-full max-w-[730px] mx-auto mt-[45px] mb-[45px] py-4 px-1 bg-white rounded-md transition-all duration-300"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-[#111] text-xl pl-2 font-medium font-['Pretendard']">
            {{ currentMonthLabel }}
          </h2>
        </div>

        <div class="flex flex-wrap justify-between gap-5 items-center">
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
          <div class="flex flex-col items-end justify-center bg-white rounded-[10px] p1-4 py-5">
            <div class="text-[#505050] text-base font-medium font-['Pretendard'] mb-1 text-right pr-5">
              이 달의 추가수당
            </div>
            <div
              class="text-[#FF6F00] text-lg font-medium font-['Pretendard'] bg-white rounded-[10px] outline outline-1 outline-[#E5E5EC] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] py-2 w-[180px] text-right pr-5"
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

      <!-- 근무 통계 차트 -->
      <div class="w-full max-w-[730px] mx-auto mt-8 mb-[140px] py-6 px-4 bg-white rounded-lg shadow-sm">
        <h2 class="text-[#111] text-xl font-medium font-['Pretendard'] mb-6">근무 통계</h2>

        <!-- 차트 컨테이너 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 주간 근무 시간 차트 -->
          <div class="bg-white p-4 rounded-lg border border-[#E5E5EC]">
            <h3 class="text-[#505050] text-base font-medium mb-4">주간 근무 현황</h3>
            <div v-if="weeklyChartData.datasets[0].data.some((value) => value > 0)" class="h-[250px]">
              <Bar :data="weeklyChartData" :options="weeklyChartOptions" />
            </div>
            <div v-else class="h-[250px] flex items-center justify-center text-[#767676]">데이터가 없습니다</div>
          </div>

          <!-- 시급 추이 차트 -->
          <div class="bg-white p-4 rounded-lg border border-[#E5E5EC]">
            <h3 class="text-[#505050] text-base font-medium mb-4">추가 수당 추이</h3>
            <div v-if="payChartData.datasets[0].data.some((value) => value !== null)" class="h-[250px]">
              <Line :data="payChartData" :options="payChartOptions" />
            </div>
            <div v-else class="h-[250px] flex items-center justify-center text-[#767676]">데이터가 없습니다</div>
          </div>
        </div>
      </div>

      <!--네비게이션 바-->
      <BottomNavBar />

      <!-- 모달창 -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        @click="isModalOpen = false"
      >
        <!-- 모달 내용 영역 -->
        <div
          class="bg-white w-[90%] max-w-xl max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 relative"
          @click.stop
        >
          <button @click="isModalOpen = false" class="absolute top-3 right-4 text-xl text-[#767676] hover:text-[#111]">
            ✕
          </button>
          <h3 class="text-lg font-semibold text-[#111] mb-4">예약 리스트</h3>

          <div class="flex flex-col gap-3">
            <div
              v-for="place in markerData"
              :key="place.reservationId"
              class="border border-[#E5E5EC] rounded-lg p-4 shadow-sm"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-[#FF6F00]">예약번호 {{ place.reservationId }}</span>
              </div>
              <div class="text-sm text-[#111] mb-1"><strong>주소:</strong> {{ place.address }}</div>
              <div class="text-sm text-[#111] mb-1"><strong>이름:</strong> {{ place.name }}</div>
              <div class="text-sm text-[#111] mb-1"><strong>전화:</strong> {{ place.phone }}</div>
              <div class="text-sm text-[#111] mb-1 whitespace-pre-line">
                <strong>수화물:</strong> {{ place.clothes }}
              </div>
              <div class="text-sm text-[#111]"><strong>요청사항:</strong> {{ place.notes || '-' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import BottomNavBar from '@/components/BottomNavBar.vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

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
  '2025-05-08': { shift: '오후', pay: 21850 },
  '2025-05-09': { shift: '오후', pay: 22850 },
  '2025-05-10': { shift: '오후', pay: 30850 },
  '2025-05-11': { shift: '오후', pay: 20850 },
  '2025-05-15': { shift: '오전', pay: 20350 },
  '2025-05-16': { shift: '오전', pay: 21250 },
  '2025-05-17': { shift: '오전', pay: 30100 },
  '2025-05-18': { shift: '오전', pay: 20200 },
  '2025-05-22': { shift: '오전', pay: 21400 },
  '2025-05-23': { shift: '오전', pay: 20150 },
  '2025-05-24': { shift: '오전', pay: 30800 },
  '2025-05-25': { shift: '오전', pay: 22150 },
  '2025-05-29': { shift: '오전', pay: 20150 },
  '2025-05-30': { shift: '오전', pay: 21350 },

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

// 모달
const isModalOpen = ref(false);

// 데이터
const markerData = [
  {
    lat: 35.8997,
    lng: 128.638,
    title: '대구국제공항',
    reservationId: '01',
    address: '대구 동구 공항로 221',
    name: '홍길동',
    phone: '010-1234-5678',
    notes: '',
    clothes: 'M - 1개\nL - 1개',
    image: 'marker1.png',
  },
  {
    lat: 35.8797,
    lng: 128.6292,
    title: '동대구역',
    reservationId: '02',
    address: '대구 동구 동대구로 550',
    name: '이영희',
    phone: '010-2345-6789',
    notes: 'CU 편의점 앞에 둘게요',
    clothes: 'S - 2개',
    image: 'marker2.png',
  },
  {
    lat: 35.9428,
    lng: 128.5472,
    title: '칠곡그린빌3차',
    reservationId: '03',
    address: '대구 북구 구암로 55',
    name: '박철수',
    phone: '010-3456-7890',
    notes: '관리실에 둘게요',
    clothes: 'M - 1개\nXL - 2개',
    image: 'marker3.png',
  },
  {
    lat: 35.8961,
    lng: 128.5904,
    title: '북구문화회관',
    reservationId: '04',
    address: '대구 북구 옥산로 15',
    name: '김민지',
    phone: '010-4567-8901',
    notes: '',
    clothes: 'L - 1개\nS - 1개',
    image: 'marker4.png',
  },
  {
    lat: 35.8777,
    lng: 128.6002,
    title: '칠성시장 남문',
    reservationId: '05',
    address: '대구 북구 칠성남로 5',
    name: '최지훈',
    phone: '010-5678-9012',
    notes: '',
    clothes: 'M - 1개\nM - 1개',
    image: 'marker5.png',
  },
  {
    lat: 35.8889,
    lng: 128.5943,
    title: '북구 건강센터',
    reservationId: '06',
    address: '대구 북구 팔달로 35',
    name: '정유진',
    phone: '010-6789-0123',
    notes: '',
    clothes: 'S - 1개\nL - 2개',
    image: 'marker6.png',
  },
  {
    lat: 35.8944,
    lng: 128.6086,
    title: '침산동 사무실',
    reservationId: '07',
    address: '대구 북구 침산로 70',
    name: '장도현',
    phone: '010-7890-1234',
    notes: '',
    clothes: 'XL - 1개',
    image: 'marker7.png',
  },
  {
    lat: 35.9022,
    lng: 128.589,
    title: '공원 앞 편의점',
    reservationId: '08',
    address: '대구 북구 동암로 123',
    name: '서지수',
    phone: '010-8901-2345',
    notes: '',
    clothes: 'S - 2개\nM - 1개',
    image: 'marker8.png',
  },
  {
    lat: 35.9444,
    lng: 128.5673,
    title: '대구은행 칠곡지점',
    reservationId: '09',
    address: '대구 북구 칠곡중앙대로 77',
    name: '한상우',
    phone: '010-9012-3456',
    notes: '',
    clothes: 'L - 1개\nM - 1개',
    image: 'marker9.png',
  },
  {
    lat: 35.8948,
    lng: 128.5831,
    title: '스마트주차장',
    reservationId: '10',
    address: '대구 북구 구암동 777',
    name: '이소영',
    phone: '010-1122-3344',
    notes: '',
    clothes: 'S - 1개\nS - 1개',
    image: 'marker10.png',
  },
];

// 주간 차트 데이터 계산
const weeklyChartData = computed(() => {
  const year = currentPage.value.year;
  const month = currentPage.value.month;
  const weeks = ['1주차', '2주차', '3주차', '4주차', '5주차'];
  const weeklyData = [0, 0, 0, 0, 0];

  Object.entries(workData.value)
    .filter(([date]) => {
      const [y, m] = date.split('-').map(Number);
      return y === year && m === month;
    })
    .forEach(([date, info]) => {
      const day = parseInt(date.split('-')[2]);
      const weekIndex = Math.floor((day - 1) / 7);
      weeklyData[weekIndex] += info.pay;
    });

  return {
    labels: weeks,
    datasets: [
      {
        label: '주간 수입',
        data: weeklyData,
        backgroundColor: '#FF6F00',

        borderRadius: 5,
      },
    ],
  };
});

// 시급 추이 차트 데이터 계산
const payChartData = computed(() => {
  const year = currentPage.value.year;
  const month = currentPage.value.month;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const payData = Array(31).fill(null);

  Object.entries(workData.value)
    .filter(([date]) => {
      const [y, m] = date.split('-').map(Number);
      return y === year && m === month;
    })
    .forEach(([date, info]) => {
      const day = parseInt(date.split('-')[2]);
      payData[day - 1] = info.pay;
    });

  return {
    labels: days,
    datasets: [
      {
        label: '일일 수입',
        data: payData,
        borderColor: 'rgba(69, 166, 255, 0.8)',
        backgroundColor: '#4299E1',
        tension: 0.4,
        fill: true,
      },
    ],
  };
});

// 차트 옵션
const weeklyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `₩ ${context.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `₩ ${value.toLocaleString()}`,
      },
    },
  },
};

const payChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `₩ ${context.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `₩ ${value.toLocaleString()}`,
      },
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>
