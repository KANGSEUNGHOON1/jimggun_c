<template>
  <ul class="w-full text-sm cursor-pointer ">
    <li
      v-for="(notice, index) in notices"
      :key="index"
      :class="[
        'flex justify-between items-start py-2.5 ',
        index === 0 ? 'border-t border-input pt-4 dark:border-dark' : '',
        index % 2 === 1 ? 'bg-gray-100 rounded dark:bg-dark' : ''
      ] "
      
    >
      <div class="flex items-center gap-4 ml-2 text-black dark:text-dark-font-100 font-light hover:font-medium hover:text-[14px]">
        <img :src="isDark ? notice.darkIcon : notice.icon" :alt="notice.alt" class="w-5 h-5" />
        {{ notice.text }}
      </div>
      <div class="text-gray mr-2 text-[13px] font-light dark:text-dark-font-200">{{ notice.date }}</div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isDark = ref(document.documentElement.classList.contains("dark"));
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

onMounted(() => {
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});
onBeforeUnmount(() => observer.disconnect());
const notices = [
  {
    icon: '/images/jung/notice.png',
    darkIcon: '/images/jung/notice-dark.png',
    alt: '공지',
    text: '5월 연휴 기간 특별 할인 이벤트 진행 중',
    date: '2025-04-15',
  },
  {
    icon: '/images/jung/noticesetting.png',
    darkIcon: '/images/jung/noticesetting-dark.png',
    alt: '점검',
    text: '시스템 점검 예정 (04/20 02:00~04:00)',
    date: '2025-04-14',
  },
  {
    icon: '/images/jung/noticeuser.png',
    darkIcon: '/images/jung/noticeuser-dark.png',
    alt: '교육',
    text: '신규 기사 교육 일정 안내',
    date: '2025-04-10',
  },
  {
    icon: '/images/jung/notice.png',
    darkIcon: '/images/jung/notice-dark.png',
    alt: '공지',
    text: '5월 연휴 기간 특별 할인 이벤트 진행 중',
    date: '2025-04-15',
  },
  {
    icon: '/images/jung/noticesetting.png',
    darkIcon: '/images/jung/noticesetting-dark.png',
    alt: '점검',
    text: '시스템 점검 예정 (04/20 02:00~04:00)',
    date: '2025-04-14',
  },
  {
    icon: '/images/jung/noticeuser.png',
    darkIcon: '/images/jung/noticeuser-dark.png',
    alt: '교육',
    text: '신규 기사 교육 일정 안내',
    date: '2025-04-10',
  },
];
</script>
