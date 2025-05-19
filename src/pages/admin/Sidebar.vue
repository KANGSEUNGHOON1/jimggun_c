<template>
  <div class="w-full">
    <!-- 프로필 영역 -->
    <div class="w-full h-[92px] px-[24px] py-[22px] flex items-center">
      <div class="w-[48px] h-[48px] rounded-full  bg-[url('/images/jung/duck.jpg')] bg-no-repeat bg-cover bg-center overflow-hidden ">
       
      </div>
      <div class="ml-[10px] text-sm font-semibold relative dark:text-white">
        Psyduck
        <div class="flex mt-[4px] items-center">
          <div class="text-xs font-normal text-gray dark:text-dark-font-100">Manager</div>
          <!-- 위치 다시 보기 -->
          <div
            class="bg-gray-100 dark:bg-dark cursor-pointer w-[12px] h-[12px] rounded-[2px] absolute right-[-50px] ">
          <img src="/public/images/jung/arrowdown.png" alt="버튼" >
          </div>
        </div>
      </div>
    </div>
    <div class="w-[172px] h-[1px] bg-input m-auto dark:bg-dark-200"></div>

    <!-- Sample Section -->
 <Sidebarmenu
      title="운영 현황"
      :items="[{ label: '대시 보드',
      icon: '/images/jung/sbdash.png',
      iconHover: '/images/jung/hdash.png',
      route: '/admin/dashboard' }]" />

    <Sidebarmenu
      title="서비스 운영"
      :items="[
        { label: '예약 관리',
         icon: '/images/jung/sbres.png',
         iconHover: '/images/jung/hres.png',
         route: '/admin/adminreservation' },
        { label: '기사 관리',
        icon: '/images/jung/sbworker.png',
        iconHover: '/images/jung/hworker.png',
         route: '/admin/adminworker' },
      ]" />

    <Sidebarmenu
      title="정산 운영"
      :items="[{ label: '결제 관리', 
      icon: '/images/jung/sbcard.png',
      iconHover: '/images/jung/hcard.png',},
       { label: '프로모션',
       icon: '/images/jung/sbpromotion.png',
       iconHover: '/images/jung/hpromotion.png', }]" />

    <Sidebarmenu
      title="고객 운영"
      :items="[{ label: '사용자 관리',
      icon: '/images/jung/sbuser.png',
    iconHover: '/images/jung/huser.png', },
       { label: '리뷰 관리',
        icon: '/images/jung/sbreview.png',
        iconHover: '/images/jung/hreview.png' }]" />

    <Sidebarmenu
      title="시스템 운영"
      :items="[{ label: '관리자 설정',
      icon: '/images/jung/sbsetting.png',
      iconHover: '/images/jung/hsetting.png' }]" />
  </div>
</template>

<script setup>
import Sidebarmenu from './Sidebarmenu.vue';
</script>

<style scoped></style>
