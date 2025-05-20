<template>
  <div class=" text-gray  ">
    <!-- 상단 통계 -->
    <div class="grid grid-cols-3 gap-3">
      <div v-for="(item, i) in summaryItems" :key="i" class="bg-gray-100 dark:bg-dark  rounded-8 h-[70px] text-center cursor-pointer ">
        <p class="text-xl font-bold text-black mt-2.5 dark:text-white">{{ item.value }}</p>
        <p class="text-[14px] font-medium text-gray dark:text-dark-font-100 dark:opacity-90">{{ item.label }}</p>
      </div>
    </div>

    <!-- 고객후기 타이틀 -->
    <div class=" text-black font-medium pt-5 dark:text-white">최근 고객 후기</div>

    <!-- 후기 목록 -->
    <div class="space-y-4 ">
      <div v-for="(review, i) in reviews" :key="i" class="first:border-none px-2 border-t border-input pt-3 dark:border-dark">
        <!-- 별점 + 닉네임 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class=""><img src="/images/jung/review5.png" alt=""></div>
            <span class="text-gray text-[14px] font-medium dark:text-dark-font dark:opacity-90">{{ review.name }}</span>
          </div>
        </div>
        <!-- 후기 내용 -->
         <div class="flex justify-between items-end">
        <p class="text-[13px] mt-1.5  leading-snug font-light dark:text-dark-font-100 dark:opacity-90">{{ review.content }}</p>
        <span class="text-xs text-gray-200 font-light dark:text-dark-font-200">{{ review.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const summaryItems = [
  { label: '고객후기 수', value: 156 },
  { label: '미답변 문의', value: 18 },
  { label: '신고 건수', value: 7 },
]

const reviews = [
  {
    name: '김민준',
    rating: 5,
    content: '기사님이 정말 친절하셨고, 짐도 안전하게 잘 배송해 주셨어요. 다음에도 이용할게요!',
    date: '2025-04-18',
  },
  {
    name: '이서연',
    rating: 4,
    content: '배송 시간이 조금 지연되었지만 예약부터 배송까지 편리했습니다.',
    date: '2025-04-03',
  }
]
</script>
