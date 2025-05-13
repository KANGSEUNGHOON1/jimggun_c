<template>
  <div class="mt-[30px] ml-[32px] font-bold text-[16px]">대시보드</div>

  <div
    class="grid w-full px-[32px] pt-[24px] pb-[40px] grid-cols-[repeat(4,394px)] grid-rows-[100px_350px_300px_332px] gap-x-[20px] gap-y-[24px]">
    <!-- 첫 번째 행 -->
    <section class="dash-card"></section>
    <section class="dash-card"></section>
    <section class="dash-card"></section>
    <section class="dash-card"></section>

    <!-- 두 번째 행 -->
    <!-- 2-예약분석 -->
    <section class="dash-card col-span-2 rounded-xl p-6 shadow-sm bg-white">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-[16px]">예약 분석</h2>
        <div class="flex text-sm">
          <button
            class="px-2 py-1 rounded-l border border-gray-100"
            @click="modew = 'weekly'"
            :class="
              modew === 'weekly'
                ? 'bg-gray-100 font-medium text-black'
                : 'bg-white text-gray '
            ">
            주간
          </button>
          <button
            class="px-2 py-1 rounded-r border border-gray-100"
            @click="modew = 'monthly'"
            :class="
              modew === 'monthly'
                ? 'bg-gray-100 font-medium text-black'
                : 'bg-white text-gray '
            ">
            월간
          </button>
        </div>
      </div>
      <div class="h-[258px]">
        <ResChart :mode="modew" />
      </div>
    </section>

    <!-- 2-매출분석 -->
    <section class="dash-card col-span-2 rounded-xl p-6 shadow-sm bg-white">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-[16px]">매출 분석</h2>
        <div class="flex text-sm">
          <button
            class="px-2 py-1 rounded-l border border-gray-100"
            :class="
              mode === 'daily'
                ? 'bg-gray-100 font-medium text-black'
                : 'bg-white text-gray '
            "
            @click="mode = 'daily'">
            일간
          </button>
          <button
            class="px-2 py-1 rounded-r border border-gray-100"
            :class="
              mode === 'monthly'
                ? 'bg-gray-100 font-medium text-black'
                : 'bg-white text-gray '
            "
            @click="mode = 'monthly'">
            월간
          </button>
        </div>
      </div>
      <div class="h-[258px]">
        <PayChart :mode="mode" />
      </div>
    </section>
    <!-- <section class="dash-card col-span-2">
      <div class="dash-title">매출 분석</div>
      <div class="dash-box"><PayChart/></div>
    </section> -->

    <!-- 세 번째 행 -->
    <section class="dash-card">
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <h2 class="font-bold text-[16px] mb-4">배차 현황</h2>
        <div class="h-[200px]">
          <BarChart />
        </div>

        <div class="flex justify-center gap-4 mt-4 text-sm text-gray-700">
          <div
            v-for="(label, i) in legends"
            :key="i"
            class="flex items-center gap-2">
            <span
              class="w-2.5 h-2.5 rounded-full"
              :style="{ backgroundColor: colors[i] }"></span>
            {{ label }}
          </div>
        </div>
      </div>
    </section>
    <section class="dash-card">
      <div class="dash-title">지역별 예약 분포</div>
      <div class="dash-box"><DonutCart /></div>
    </section>
    <section class="dash-card col-span-2">
      <div class="dash-title">운영 알림</div>
      <div class="dash-box"><alarm /></div>
    </section>

    <!-- 네 번째 행 -->
    <section class="dash-card col-span-2">
      <div class="dash-title">고객 소통 현황</div>
      <div class="dash-box"><Notice /></div>
    </section>
    <section class="dash-card col-span-2">
      <div class="dash-title">공지 및 알림</div>
      <div class="dash-box"><UserReview /></div>
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
import { ref } from "vue";

const mode = ref("daily"); // 초기값: 일간
const modew = ref("weekly");

const legends = ['활동 중 기사', '배차 완료', '배차 대기', '취소/지연 예약']
const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#EC4899']
</script>
