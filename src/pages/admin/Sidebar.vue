<template>
  <div class="w-full">
    <!-- 프로필 영역 -->
    <div class="w-full h-[92px] px-[24px] py-[22px] flex items-center">
      <div class="w-[48px] h-[48px] rounded-full bg-gray mr-[10px]"></div>
      <div class="text-sm font-semibold relative">
        Psyduck
        <div class="flex mt-[4px] items-center">
          <div class="text-xs font-medium text-gray">Manager</div>
          <!-- 위치 다시 보기 -->
          <div
            class="bg-gray-100 w-[12px] h-[12px] rounded-[2px] absolute right-[-50px]"></div>
        </div>
      </div>
    </div>
    <div class="w-[172px] h-[1px] bg-input m-auto"></div>

    <!-- Sample Section -->
 <Sidebarmenu
      title="운영 현황"
      :items="[{ label: '대시 보드', route: '/admin/dashboard' }]" />

    <Sidebarmenu
      title="서비스 운영"
      :items="[
        { label: '예약 관리', route: '/admin/adminreservation' },
        { label: '기사 관리', route: '/admin/adminworker' },
      ]" />

    <Sidebarmenu
      title="정산 운영"
      :items="[{ label: '결제 관리' }, { label: '프로모션' }]" />

    <Sidebarmenu
      title="고객 운영"
      :items="[{ label: '사용자 관리' }, { label: '리뷰 관리' }]" />

    <Sidebarmenu
      title="시스템 운영"
      :items="[{ label: '관리자 설정' }]" />
  </div>
</template>

<script setup>
import Sidebarmenu from './Sidebarmenu.vue';
</script>

<style scoped></style>
