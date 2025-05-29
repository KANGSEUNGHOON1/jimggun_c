<template>
  <div
    v-for="(item, index) in visibleAlerts"
    :key="item.id"
    class="mb-3 w-[760px] h-[100px] border border-input dark:border-dark rounded-8 flex items-center px-6"
  >
    <!-- 아이콘 -->
    <div>
      <div
        class="w-11 h-11 rounded-full bg-no-repeat bg-center dark:bg-dark dark:opacity-90"
        :class="item.type === 'warning'
          ? 'bg-[url(/images/jung/warning.png)] bg-[#FFF0F0]'
          : 'bg-[url(/images/jung/alarm.png)] bg-[#FFFCDB]'"
      ></div>
    </div>

    <!-- 텍스트 -->
    <div class="w-full ml-5">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-[15px] dark:font-medium dark:opacity-90">
          {{ item.title }}
        </div>
        <div class="text-xs text-gray font-light pr-1 dark:text-dark-font-100">
          {{ item.timeAgo }}
        </div>
      </div>
      <div class="flex items-center justify-between mt-0.5">
        <div class="text-sm text-gray-300 font-light dark:text-dark-font-100 dark:opacity-90">
          {{ item.description }}
        </div>
        <div>
          <button
            class="border rounded-md border-input px-1.5 py-1 text-[13px] text-gray-300 font-light dark:text-dark-font-100 dark:opacity-90 dark:border-dark-200 "
          >
            상세보기
          </button>
          <button
            class="ml-1 border border-gray rounded-md bg-gray text-white px-1.5 py-1 text-[13px] hover:bg-[#5E5E5E] hover:border-[#5E5E5E] dark:text-dark dark:bg-dark-font-100 dark:border-dark-font-100 dark:opacity-85 dark:font-medium dark:hover:bg-dark-font-200 dark:hover:border-dark-font-200"
            @click="resolveAlert(index)"
          >
            조치완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
const emit = defineEmits(['update:alertCount'])
// 전체 더미 데이터
const allAlerts = ref([
  { id: 1, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '10분 전', description: '강남역 픽업 예약(#12345)이 30분 이상 배차되지 않고 있습니다.' },
  { id: 2, type: 'alarm', title: '결제 오류 발생', timeAgo: '25분 전', description: '사용자 이지은(#7890)의 결제 과정에서 오류가 발생했습니다.' },
  { id: 3, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '35분 전', description: '역삼역 픽업 예약(#2222)이 지연되고 있습니다.' },
  { id: 4, type: 'alarm', title: '결제 오류 발생', timeAgo: '40분 전', description: '사용자 김민수(#9921)의 결제가 실패했습니다.' },
  { id: 5, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '50분 전', description: '신촌역 픽업 예약(#8888)이 배차되지 않았습니다.' },
  { id: 6, type: 'alarm', title: '결제 오류 발생', timeAgo: '55분 전', description: '사용자 홍길동(#4521)의 카드 인증이 거절되었습니다.' },
  { id: 7, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '1시간 전', description: '합정역 예약(#1983)이 아직 배차 대기 중입니다.' },
  { id: 8, type: 'alarm', title: '결제 오류 발생', timeAgo: '1시간 전', description: '사용자 박지민(#6230)의 결제 요청이 무응답입니다.' },
  { id: 9, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '1시간 10분 전', description: '잠실역 예약(#7300)이 지연 중입니다.' },
  { id: 10, type: 'alarm', title: '결제 오류 발생', timeAgo: '1시간 30분 전', description: '사용자 최유진(#8920)의 결제가 실패했습니다.' },
  { id: 11, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '2시간 전', description: '을지로3가 예약(#6112) 지연 배차 발생 중입니다.' },
  { id: 12, type: 'alarm', title: '결제 오류 발생', timeAgo: '2시간 20분 전', description: '사용자 김지연(#2234)의 결제 도중 연결이 끊겼습니다.' },
  { id: 13, type: 'warning', title: '배차 지연 예약 발생', timeAgo: '3시간 전', description: '홍대역 예약(#9900)이 배차되지 않았습니다.' },
])
const props = defineProps({
  alertCount: Number
});

// 알람수 렌더링
watch(
  () => allAlerts.value.length,
  (newLength) => emit('update:alertCount', newLength),
  { immediate: true }
)
// 표시할 인덱스 범위
const visibleCount = ref(2)

const visibleAlerts = computed(() => allAlerts.value.slice(0, visibleCount.value))

// 조치완료 버튼 클릭 시 처리
function resolveAlert(index) {
  const resolvedItem = visibleAlerts.value[index]
  const itemIndex = allAlerts.value.findIndex(alert => alert.id === resolvedItem.id)

  if (itemIndex !== -1) {
    allAlerts.value.splice(itemIndex, 1)
  }

  // 전체 remaining 개수가 visibleCount보다 작으면 줄이기
  if (allAlerts.value.length < visibleCount.value) {
    visibleCount.value = allAlerts.value.length
  }
}

</script>



