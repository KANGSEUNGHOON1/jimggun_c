<template>
    <!-- 배차 지연 -->
     <div class=" w-[760px] h-[100px] border  border-input dark:border-dark-200 rounded-8 flex items-center px-6 ">
        <!-- 아이콘 -->
         <div >
        <div class="bg-[url('/images/jung/warning.png')] w-11 h-11 rounded-full bg-[#FFF0F0] bg-no-repeat bg-[center_10px]"></div>
        </div>
        <!-- 텍스트 -->
         <div class="w-full ml-5 ">
            <!-- 위 -->
             <div class="flex items-center justify-between">
                <div class="font-semibold text-[15px]">배차 지연 예약 발생</div>
                <div class="text-xs text-gray-200 font-light pr-1">10분 전</div>
             </div>
            <!-- 아래 -->
             <div class="flex items-center justify-between mt-0.5">
                <div class="text-sm text-gray-300 font-light dark:text-dark-font">강남역  픽업 예약(#12345)이 30분 이상 배차되지 않고 있습니다.  </div>
                <!-- 버튼 -->
                 <div class="">
                 <button class="border rounded-md border-input px-1.5 py-1 text-[13px] text-gray-300 font-light dark:text-dark-font-100 dark:border-dark-200 ">상세보기</button>
                 <button class="ml-1 border border-gray rounded-md bg-gray text-white px-1.5 py-1 text-[13px] hover:bg-[#5E5E5E] hover:border-[#5E5E5E] dark:text-dark-100 dark:bg-dark-font-100 dark:border-dark-font-100 dark:font-medium">조치완료</button>
                 </div>
             </div>
         </div>
     </div>
    <!-- 오류 발생 -->
     <div class="mt-3 w-[760px] h-[100px] border  border-input dark:border-dark-200 rounded-8 flex items-center px-6">
        <!-- 아이콘 -->
         <div >
        <div class="bg-[url('/images/jung/alarm.png')] w-11 h-11 rounded-full bg-[#FFFCDB] bg-no-repeat bg-center"></div>
        </div>
        <!-- 텍스트 -->
         <div class="w-full ml-5 ">
            <!-- 위 -->
             <div class="flex items-center justify-between">
                <div class="font-semibold text-[15px]">결제 오류 발생</div>
                <div class="text-xs text-gray-200 font-light pr-1">25분 전</div>
             </div>
            <!-- 아래 -->
             <div class="flex items-center justify-between mt-0.5">
                <div class="text-sm text-gray-300 font-light dark:text-dark-font">사용자 이지은(#7890)의 결제 과정에서 오류가 발생했습니다.</div>
                <!-- 버튼 -->
                 <div class="">
                 <button class="border rounded-md border-input px-1.5 py-1 text-[13px] text-gray-300 font-light dark:text-dark-font-100 dark:border-dark-200 ">상세보기</button>
                 <button class="ml-1 border border-gray rounded-md bg-gray text-white px-1.5 py-1 text-[13px] hover:bg-[#5E5E5E] hover:border-[#5E5E5E] dark:text-dark-100 dark:bg-dark-font-100 dark:border-dark-font-100 dark:font-medium">조치완료</button>
                 </div>
             </div>
         </div>
     </div>
</template>

