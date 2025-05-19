<template>
  <div class="mt-[30px] ml-[32px] font-bold text-[16px]">대시보드</div>

  <div
    class="grid w-full px-[32px] pt-[24px] pb-[40px] grid-cols-[repeat(4,394px)] grid-rows-[100px_350px_300px_332px] gap-x-[20px] gap-y-[24px]">
    <!-- 첫 번째 행 -->
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div class="font-normal text-gray text-[15px]">일 매출</div>
          <div class="pt-0.5 flex items-center">
            <div class="text-xl font-bold">12,580,000</div>
            <div class="font-bold ml-1">원</div>
            <div class="p-1 ml-3">
              <img src="/images/jung/up.png" alt="up"/>
            </div>
            <div class="text-manager text-[14px] ml-0.5">12.5</div>
            <div class="text-manager font-light text-[14px] ml-0.5">%</div>
          </div>
        </div>
        <!-- 아이콘 -->
        <div
          class="bg-[url('/images/jung/daypay.png')] bg-[calc(50%+2px)_center] w-11 h-11 bg-no-repeat bg-gray-100 rounded-full "></div>
      </div>
    </section>
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div class="font-normal text-gray text-[15px]">
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
          class="bg-[url('/images/jung/rescount.png')] w-11 h-11 bg-no-repeat bg-gray-100 rounded-full bg-center"></div>
      </div>
    </section>
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div class="font-normal text-gray text-[15px]">오늘 방문자 수</div>
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
          class="bg-[url('/images/jung/users.png')] w-11 h-11 bg-no-repeat bg-gray-100 rounded-full bg-center"></div>
      </div>
    </section>
    <section class="dash-card p-6">
      <div class="w-full h-full flex justify-between items-center">
        <!-- 텍스트 -->
        <div>
          <div class="font-normal text-gray text-[15px]">오늘 회원가입 수</div>
          <div class="pt-0.5 flex items-center">
            <div class="text-xl font-bold">187</div>
            <div class="p-1 ml-3">
              <img src="/images/jung/down.png" alt="up" />
            </div>
            <div class="text-gray-200 text-[14px] ml-0.5">8.3</div>
            <div class="text-gray-200 font-light text-[14px] ml-0.5">%</div>
          </div>
        </div>
        <!-- 아이콘 -->
        <div
          class="bg-[url('/images/jung/userplus.png')] w-11 h-11 bg-no-repeat bg-gray-100 rounded-full bg-center"></div>
      </div>
    </section>
    <!-- 두 번째 행 -->
    <!-- 2-예약분석 -->
    <section class="dash-card col-span-2 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-[16px]">예약 분석</h2>
        <div class="flex text-xs">
          <button
            class="px-1.5 py-1 rounded-l border border-gray-100"
            @click="modew = 'weekly'"
            :class="
              modew === 'weekly'
                ? 'bg-gray-100 font-medium text-black'
                : 'bg-white text-gray '
            ">
            주간
          </button>
          <button
            class="px-1.5 py-1 rounded-r border border-gray-100"
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
    <section class="dash-card col-span-2 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-[16px]">매출 분석</h2>
        <div class="flex text-xs">
          <button
            class="px-1.5 py-1 rounded-l border border-gray-100"
            :class="
              mode === 'daily'
                ? 'bg-gray-100 font-medium text-black'
                : 'bg-white text-gray '
            "
            @click="mode = 'daily'">
            일간
          </button>
          <button
            class="px-1.5 py-1 rounded-r border border-gray-100"
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
    <!-- 세 번째 행 -->
    <!-- 3- 배차현황 -->
    <section class="dash-card p-6">
      <h2 class="font-bold text-[16px] mb-4">배차 현황</h2>
      <div class="h-[180px]">
        <BarChart />
      </div>

      <div
        class="flex justify-center gap-4 mt-4 text-xs text-gray-300 font-normal">
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
          <img src="/public/images/jung/resicon.png" alt="icon" />
          <div class="text-gray-200 text-xs">지난 24시간 기준</div>
        </div>
      </div>

      <div class="dash-box h-[200px] relative">
        <DonutCart />
      </div>
    </section>
    <section class="dash-card col-span-2">
      <div class="flex items-center justify-between pr-6">
        <div class="dash-title">운영 알림</div>
        <div class="flex gap-1 items-center cursor-pointer">
          <div class="text-gray-200 text-xs">모든 알림보기</div>
          <img src="/images/jung/lefticon.png" alt="화살" />
        </div>
      </div>
      <div class="dash-box"><alarm /></div>

    </section>

    <!-- 네 번째 행 -->
    <section class="dash-card col-span-2">
      <div class="flex items-center justify-between pr-6">
        <div class="dash-title">고객 소통 현황</div>
 <div class="flex gap-1 items-center cursor-pointer">
          <div class="text-gray text-xs">전체보기</div>
          <img src="/images/jung/lefticon.png" alt="화살" />
        </div>
      </div>
      <div class="dash-box"><UserReview /></div>
    </section>
    <section class="dash-card col-span-2">
      <div class="flex items-center justify-between pr-6">
        <div class="dash-title">공지 및 알림</div>
        <div class="flex gap-1 items-center cursor-pointer">
          <div class="text-gray text-xs">전체보기</div>
          <img src="/images/jung/lefticon.png" alt="화살" />
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
import { ref } from "vue";
import Alarm from "./dashcard/Alarm.vue";

const mode = ref("daily"); // 초기값: 일간
const modew = ref("weekly");

const legends = ["활동 중 기사", "배차 완료", "배차 대기", "취소/지연 예약"];
const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DC55F7"];

</script>
