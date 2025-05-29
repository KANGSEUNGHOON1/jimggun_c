<template>
  <div class="mt-[30px] ml-[32px] flex justify-between items-center">
    <div class="font-bold">대시보드</div>
    <div class="text-[14px]  text-gray-200 dark:text-dark-font-300 mr-[16px]">{{ today }}</div>
  </div>
  <div
    class="grid w-full px-[32px] pt-[24px] pb-[40px] grid-cols-[repeat(4,394px)] grid-rows-[100px_358px_300px_332px] gap-x-[20px] gap-y-[24px]">
    <!-- 첫 번째 행 -->
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div
            class="font-normal text-gray text-[15px] dark:text-dark-font-100">
            일 매출
          </div>
          <div class="pt-0.5 flex items-center">
            <div class="text-xl font-bold">2,580,000</div>
            <div class="font-bold ml-1">원</div>
            <div class="p-1 ml-3">
              <img src="/images/jung/up.png" alt="up" />
            </div>
            <div class="text-manager text-[14px] ml-0.5">12.5</div>
            <div class="text-manager font-light text-[14px] ml-0.5">%</div>
          </div>
        </div>
        <!-- 아이콘 -->
        <div
          :style="{ backgroundImage: daypayBg }"
          class="w-11 h-11 bg-no-repeat bg-[calc(50%+2px)_center] bg-gray-100 rounded-full dark:bg-dark"></div>
      </div>
    </section>
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div
            class="font-normal text-gray text-[15px] dark:text-dark-font-100">
            비회원 예약 수 / 총 예약 수
          </div>
          <div class="pt-0.5 flex items-center">
            <div class="text-xl font-bold">95 / 342</div>
            <div class="p-1 ml-3">
              <img src="/images/jung/up.png" alt="up" />
            </div>
            <div class="text-manager text-[14px] ml-0.5">12.5</div>
            <div class="text-manager font-light text-[14px] ml-0.5">%</div>
          </div>
        </div>
        <!-- 아이콘 -->
        <div
          :style="{ backgroundImage: rescountBg }"
          class="w-11 h-11 bg-no-repeat bg-center bg-gray-100 rounded-full dark:bg-dark"></div>
      </div>
    </section>
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div
            class="font-normal text-gray text-[15px] dark:text-dark-font-100">
            오늘 방문자 수
          </div>
          <div class="pt-0.5 flex items-center">
            <div class="text-xl font-bold">2,458</div>
            <div class="p-1 ml-3">
              <img src="/images/jung/up.png" alt="up" />
            </div>
            <div class="text-manager text-[14px] ml-0.5">8.3</div>
            <div class="text-manager font-light text-[14px] ml-0.5">%</div>
          </div>
        </div>
        <!-- 아이콘 -->
        <div
          :style="{ backgroundImage: usersBg }"
          class="w-11 h-11 bg-no-repeat bg-center bg-gray-100 rounded-full dark:bg-dark"></div>
      </div>
    </section>
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div
            class="font-normal text-gray text-[15px] dark:text-dark-font-100">
            오늘 회원가입 수
          </div>
          <div class="pt-0.5 flex items-center">
            <div class="text-xl font-bold">187</div>
            <div class="p-1 ml-3">
              <img :src="downIconSrc" alt="하락" />
            </div>
            <div class="text-gray-200 text-[14px] ml-0.5 dark:text-dark-200">
              8.3
            </div>
            <div
              class="text-gray-200 font-light text-[14px] ml-0.5 dark:text-dark-200">
              %
            </div>
          </div>
        </div>
        <!-- 아이콘 -->
        <div
          :style="{ backgroundImage: userplusBg }"
          class="w-11 h-11 bg-no-repeat bg-center bg-gray-100 rounded-full dark:bg-dark"></div>
      </div>
    </section>
    <!-- 두 번째 행 -->
    <!-- 2-예약분석 -->
    <section class="dash-card col-span-2 px-6 pt-6">
      <div class="flex justify-between items-center pb-4">
        <h2 class="font-bold text-[16px] flex gap-5">
          예약 분석
          <!-- 날짜 버튼 -->
          <CustomDateSelector :mode="modew" @update:modelValue="onReservationDateChange" />
        </h2>
        <!-- 요일별/주차별/월별 버튼 -->
        <div class="flex items-center text-xs">
          <button
            class="px-1.5 py-1"
            @click="modew = 'weekly'"
            :class="
              modew === 'weekly'
                ? ' font-medium text-gray-300 dark:text-white dark:font-normal'
                : ' text-gray-200  dark:text-dark-font-100 dark:opacity-90'
            ">
            요일별
          </button>
          <div class="w-[1px] h-[12px] bg-input dark:bg-dark-200"></div>
          <button
            class="px-1.5 py-1"
            @click="modew = 'monthly'"
            :class="
              modew === 'monthly'
                ? ' font-medium text-gray-300  dark:text-white dark:font-normal'
                : ' text-gray-200  dark:text-dark-font-100 dark:opacity-90'
            ">
            주차별
          </button>
          <div class="w-[1px] h-[12px] bg-input dark:bg-dark-200"></div>
          <button
            class="px-1.5 py-1"
            @click="modew = 'yearly'"
            :class="
              modew === 'yearly'
                ? ' font-medium text-gray-300  dark:text-white dark:font-normal'
                : ' text-gray-200  dark:text-dark-font-100 dark:opacity-90'
            ">
            월별
          </button>
        </div>
      </div>
      <div class="h-[280px]">
        <ResChart
  :mode="modew"
  :year="selectedYearRes"
  :month="selectedMonthRes"
  :week="selectedWeekRes" />
      </div>
    </section>
    <!-- 2-매출분석 -->
    <section class="dash-card col-span-2 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-[16px] flex gap-5">
          매출 분석
          <!-- 날짜 버튼 -->
          <CustomDateSelector :mode="mode" @update:modelValue="onPayDateChange" />
        </h2>
        <!-- 요일별/주차별/월별 버튼 -->
        <div class="flex items-center text-xs">
          <button
            class="px-1.5 py-1"
            @click="mode = 'weekly'"
            :class="
              mode === 'weekly'
                ? ' font-medium text-gray-300 dark:text-white dark:font-normal'
                : ' text-gray-200  dark:text-dark-font-100 dark:opacity-90'
            ">
            요일별
          </button>
          <div class="w-[1px] h-[12px] bg-input dark:bg-dark-200"></div>
          <button
            class="px-1.5 py-1"
            @click="mode = 'monthly'"
            :class="
              mode === 'monthly'
                ? ' font-medium text-gray-300  dark:text-white dark:font-normal'
                : ' text-gray-200  dark:text-dark-font-100 dark:opacity-90'
            ">
            주차별
          </button>
          <div class="w-[1px] h-[12px] bg-input dark:bg-dark-200"></div>
          <button
            class="px-1.5 py-1"
            @click="mode = 'yearly'"
            :class="
              mode === 'yearly'
                ? ' font-medium text-gray-300  dark:text-white dark:font-normal'
                : ' text-gray-200  dark:text-dark-font-100 dark:opacity-90'
            ">
            월별
          </button>
        </div>
      </div>
      <div class="h-[258px]">
        <PayChart
  :mode="mode"
  :year="selectedYearPay"
  :month="selectedMonthPay"
  :week="selectedWeekPay" />
      </div>
    </section>
    <!-- 세 번째 행 -->
    <!-- 3- 배차현황 -->
    <section class="dash-card p-6">
      <h2 class="font-bold text-[16px] mb-4">배차 현황</h2>
      <div class="h-[180px]">
        <BarChart />
      </div>
      <div
        class="flex justify-center gap-4 mt-4 text-xs text-gray-300 font-normal dark:text-dark-font-100">
        <div
          v-for="(label, i) in legends"
          :key="i"
          class="flex items-center gap-2">
          <span
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: colors[i] }"></span>
          {{ label }}
        </div>
      </div>
    </section>
    <!-- 3- 지역별 예약 분포 -->
    <section class="dash-card">
      <div class="flex items-center justify-between pr-6">
        <div class="dash-title">지역별 예약 분포</div>
        <div class="flex items-center gap-1">
          <img :src="resIconSrc" alt="icon" />
          <div class="text-gray-200 text-xs dark:text-dark-font-200">
            지난 24시간 기준
          </div>
        </div>
      </div>

      <div class="dash-box h-[200px] relative">
        <DonutCart />
      </div>
    </section>
    <!-- 3- 운영알림 -->
    <section class="dash-card col-span-2">
      <div class="flex items-center justify-between pr-6 ">
        <div class="dash-title fle-200x items-start ">
          운영 알림
          <span class="px-1.5 py-1 dark:opacity-95 bg-manager rounded-md text-white font-semibold text-xs ml-[6px] dark:text-dark-100">
            {{ alertCount }}
          </span>
        </div>
        <div class="flex gap-1 items-center cursor-pointer ">
          <div class="text-gray-200 text-xs dark:text-dark-font-200">
            모든 알림보기
          </div>
          <div :style="{ backgroundImage: arrowright }" class="w-3 h-3 bg-no-repeat bg-cover"></div>
        </div>
      </div>
      <div class="dash-box "><alarm v-model:alertCount="alertCount" /></div>
    </section>

    <!-- 네 번째 행 -->
    <section class="dash-card col-span-2">
      <div class="flex items-center justify-between pr-6">
        <div class="dash-title">고객 소통 현황</div>
        <div class="flex gap-1 items-center cursor-pointer">
          <div class="text-gray-200 text-xs dark:text-dark-font-200">전체보기</div>
          <img src="/images/jung/lefticon.png" alt="화살" class="w-3 h-3"/>
        </div>
      </div>
      <div class="dash-box"><UserReview /></div>
    </section>
    <section class="dash-card col-span-2">
      <div class="flex items-center justify-between pr-6">
        <div class="dash-title">공지 및 알림</div>
        <div class="flex gap-1 items-center cursor-pointer">
          <div class="text-gray-200 text-xs dark:text-dark-font-200">전체보기</div>
          <img src="/images/jung/lefticon.png" alt="화살" class="w-3 h-3"/>
        </div>
      </div>
      <div class="dash-box"><Notice /></div>
    </section>
  </div>
</template>
<script setup>
import ResChart from "./dashchart/ResChart.vue";
import PayChart from "./dashchart/PayChart.vue";
import BarChart from "./dashchart/BarChart.vue";
import DonutCart from "./dashchart/DonutCart.vue";
import alarm from "./dashcard/Alarm.vue";
import Notice from "./dashcard/Notice.vue";
import UserReview from "./dashcard/UserReview.vue";
import Alarm from "./dashcard/Alarm.vue";
import CustomDateSelector from "./dashchart/CustomDateSelector.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
const isDark = ref(document.documentElement.classList.contains("dark"));
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});
onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
onBeforeUnmount(() => {
  observer.disconnect();
});
// 예약 분석용
const modew = ref("weekly");
const selectedYearRes = ref("2025");
const selectedMonthRes = ref("5");
const selectedWeekRes = ref("3");

const onReservationDateChange = ({ year, month, week }) => {
  selectedYearRes.value = year;
  selectedMonthRes.value = month;
  selectedWeekRes.value = week;
};

// 매출 분석용
const mode = ref("weekly");
const selectedYearPay = ref("2025");
const selectedMonthPay = ref("5");
const selectedWeekPay = ref("3");

const onPayDateChange = ({ year, month, week }) => {
  selectedYearPay.value = year;
  selectedMonthPay.value = month;
  selectedWeekPay.value = week;
};


//알람수 렌더링
const alertCount = ref(0)
// 오늘 날짜 렌더링
const today = format(new Date(), "yyyy. M. d (E)", { locale: ko });
// 예약분석 날짜

const legends = ["활동 중 기사", "배차 완료", "배차 대기", "취소/지연 예약"];
const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DC55F7"];
const daypayBg = computed(() =>
  isDark.value
    ? "url('/images/jung/daypay-dark.png')"
    : "url('/images/jung/daypay.png')"
);

const rescountBg = computed(() =>
  isDark.value
    ? "url('/images/jung/rescount-dark.png')"
    : "url('/images/jung/rescount.png')"
);

const usersBg = computed(() =>
  isDark.value
    ? "url('/images/jung/users-dark.png')"
    : "url('/images/jung/users.png')"
);

const userplusBg = computed(() =>
  isDark.value
    ? "url('/images/jung/userplus-dark.png')"
    : "url('/images/jung/userplus.png')"
);
const arrowright = computed(() =>
  isDark.value
    ? "url('/images/jung/lefticon-dark.png')"
    : "url('/images/jung/lefticon.png')"
);
const downIconSrc = computed(
  () =>
    isDark.value
      ? "/images/jung/down-dark.png" // 다크모드용 이미지
      : "/images/jung/down.png" // 기본 이미지
);
const resIconSrc = computed(
  () =>
    isDark.value
      ? "/images/jung/resicon-dark.png" // 다크모드용 이미지
      : "/images/jung/resicon.png" // 라이트모드 이미지
);
</script>
