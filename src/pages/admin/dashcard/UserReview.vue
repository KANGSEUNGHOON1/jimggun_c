<template>
  <div class="space-y-6 text-gray ">
    <!-- 상단 통계 -->
    <div class="grid grid-cols-3 gap-3">
      <div v-for="(item, i) in summaryItems" :key="i" class="bg-gray-100  rounded-8 h-[70px] text-center ">
        <p class="text-lg font-bold text-black mt-2.5">{{ item.value }}</p>
        <p class="text-[15px] font-medium">{{ item.label }}</p>
      </div>
    </div>

    <!-- 고객후기 타이틀 -->
    <div class="font-semibold text-black">최근 고객 후기</div>

    <!-- 후기 목록 -->
    <div class="space-y-4">
      <div v-for="(review, i) in reviews" :key="i" class="first:border-none border-t border-input pt-4">
        <!-- 별점 + 닉네임 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="flex gap-0.5">
              <template v-for="n in 5">
                <svg
                  v-if="n <= review.rating"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  :key="`filled-${i}-${n}`"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.284 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.448a1 1 0 00-.364 1.118l1.284 3.95c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.364 2.446c-.783.57-1.838-.197-1.538-1.118l1.284-3.95a1 1 0 00-.364-1.118L2.658 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.284-3.95z"/>
                </svg>
              </template>
            </div>
            <span class="font-semibold">{{ review.name }}</span>
          </div>
          <span class="text-[11px] ">{{ review.date }}</span>
        </div>
        <!-- 후기 내용 -->
        <p class="text-[13px] mt-3  leading-snug">{{ review.content }}</p>
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
    content: '예약부터 배송까지 편리했습니다. 다만 배송 시간이 조금 지연되었네요.',
    date: '2025-04-18',
  }
]
</script>
