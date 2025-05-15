<template>
  <ul class="w-full text-sm cursor-pointer">
    <li
      v-for="(notice, index) in notices"
      :key="index"
      :class="[
        'flex justify-between items-start py-2.5',
        index === 0 ? 'border-t border-input pt-4' : '',
        index % 2 === 1 ? 'bg-gray-100 rounded' : ''
      ]"
    >
      <div class="flex items-center gap-4 ml-2 text-gray-300">
        <img :src="notice.icon" :alt="notice.alt" class="w-5 h-5" />
        {{ notice.text }}
      </div>
      <div class="text-gray mr-2 text-[13px]">{{ notice.date }}</div>
    </li>
  </ul>
</template>

<script setup>
const notices = [
  {
    icon: '/images/jung/notice.png',
    alt: '공지',
    text: '5월 연휴 기간 특별 할인 이벤트 진행 중',
    date: '2025-04-15',
  },
  {
    icon: '/images/jung/noticesetting.png',
    alt: '점검',
    text: '시스템 점검 예정 (04/20 02:00~04:00)',
    date: '2025-04-14',
  },
  {
    icon: '/images/jung/noticeuser.png',
    alt: '교육',
    text: '신규 기사 교육 일정 안내',
    date: '2025-04-10',
  },
  {
    icon: '/images/jung/notice.png',
    alt: '공지',
    text: '5월 연휴 기간 특별 할인 이벤트 진행 중',
    date: '2025-04-15',
  },
  {
    icon: '/images/jung/noticesetting.png',
    alt: '점검',
    text: '시스템 점검 예정 (04/20 02:00~04:00)',
    date: '2025-04-14',
  },
  {
    icon: '/images/jung/noticeuser.png',
    alt: '교육',
    text: '신규 기사 교육 일정 안내',
    date: '2025-04-10',
  },
];
</script>
