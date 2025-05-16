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

        <!-- 필터 버튼 영역 -->
        <div class="flex gap-2 justify-center mb-4">
          <button
            @click="setFilter('all')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              filter === 'all' ? 'bg-[#FF6F00] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            전체
          </button>
          <button
            @click="setFilter('new')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              filter === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            NEW
          </button>
          <button
            @click="setFilter('urgent')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              filter === 'urgent' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            긴급
          </button>
        </div>

        <!-- 알림 리스트 -->
        <div class="grid gap-4 pb-[140px]">
          <div
            v-for="notice in filteredNotices"
            :key="notice.id"
            @click="openModal(notice)"
            class="bg-white pt-11 px-4 space-y-2 border-b border-zinc-300 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-2">
              <p class="text-2xl font-medium text-neutral-900">
                <span v-if="notice.isUrgent" class="text-red-500">(긴급) </span>
                <span v-if="notice.isNew" class="text-blue-500">(NEW) </span>
                {{ notice.title }}
              </p>
            </div>
            <p class="text-xl pb-11 text-neutral-500">{{ notice.date }}</p>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>

    <!-- 모달 컴포넌트 -->
    <div
      v-if="selectedNotice"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" @click.stop>
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-2">
            <span v-if="selectedNotice.isUrgent" class="text-red-500 font-bold">(긴급)</span>
            <span v-if="selectedNotice.isNew" class="text-blue-500 font-bold">(NEW)</span>
            <h2 class="text-2xl font-bold">{{ selectedNotice.title }}</h2>
          </div>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <span class="text-3xl">&times;</span>
          </button>
        </div>
        <div class="text-gray-600 mb-4">{{ selectedNotice.date }}</div>
        <div class="text-lg whitespace-pre-wrap">
          {{ selectedNotice.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import BottomNavBar from '@/components/BottomNavBar.vue';

const selectedNotice = ref(null);
const filter = ref('all');

const noticeList = [
  {
    id: 1,
    title: '대구시장배 전국철인3종경기 개최로 5월 11일(일) 신천동로, 무학로 일부의 교통이 통제됨을 알려드립니다.',
    date: '5월 10일 14:07',
    isUrgent: false,
    isNew: true,
    content:
      '안녕하세요.\n\n대구시장배 전국철인3종경기 대회 개최로 인해 5월 11일(일) 오전 6시부터 오후 2시까지 신천동로, 무학로 일부 구간이 통제됩니다.\n\n통제 구간:\n- 신천동로: 동대구역 ~ 신천동로교차로\n- 무학로: 신천동로교차로 ~ 무학로교차로\n\n이용에 참고 부탁드립니다.',
  },
  {
    id: 2,
    title: '파워풀 대구 페스티벌 기간 5월 10일(토)~5월 11일(일) 동안 국채보상로 전면 교통이 통제됨을 알려드립니다.',
    date: '5월 9일 13:11',
    isUrgent: false,
    isNew: true,
    content:
      '파워풀 대구 페스티벌 개최로 인해 국채보상로 전 구간이 통제됩니다.\n\n통제 기간: 5월 10일(토) 00:00 ~ 5월 11일(일) 23:59\n\n대체 도로 이용을 권장드립니다.',
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

const setFilter = (newFilter) => {
  filter.value = newFilter;
};

const filteredNotices = computed(() => {
  switch (filter.value) {
    case 'new':
      return noticeList.filter((notice) => notice.isNew);
    case 'urgent':
      return noticeList.filter((notice) => notice.isUrgent);
    default:
      return noticeList;
  }
});

const openModal = (notice) => {
  selectedNotice.value = notice;
};

const closeModal = () => {
  selectedNotice.value = null;
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

button {
  min-width: 80px;
}
</style>
