<script setup>
import { ref } from "vue";
</script>
<template>
  <div class="my-[30px] mx-[32px] font-bold font-[16px]">예약관리</div>
  <div class="flex flex-col gap-[27px] w-2/2 max-w-[1700px] mx-[32px]">
    <!-- 1. 헤더 카드박스 -->
    <ul class="flex gap-[20px] w-full">
      <!-- 1-1. 금일 신규 예약 건수 -->
      <li class="gap-[10px] w-1/4 bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]">
        <div class="w-full flex flex-col px-[30px] py-[26px]">
          <p class="w-2/2 text-[13px] text-gray">금일 신규 예약 건수</p>
          <p class="flex items-end gap-[10px] w-full">
            <span class="font-bold text-lg">142 건</span
            ><span class="text-[13px] text-manager-green pb-[2px]">+ 12</span>
          </p>
        </div>
      </li>
      <!-- 1-2. 미배차 예약 건수 -->
      <li class="gap-[10px] w-1/4 bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]">
        <div class="w-full flex flex-col px-[30px] py-[26px]">
          <p class="w-2/2 text-[13px] text-gray">미배차 예약 건수 / 전체 예약 건수</p>
          <p class="flex items-end gap-[10px] w-full">
            <span class="font-bold text-lg">200</span
            ><span class="text-[13px] pb-[2px] text-manager-orange">- 12</span> /
            <span class="font-bold text-lg">342 건</span>
          </p>
        </div>
      </li>
      <!-- 1-3. 금일 픽업 건수 -->
      <li class="gap-[10px] w-1/4 bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]">
        <div class="w-full flex flex-col px-[30px] py-[26px]">
          <p class="w-2/2 text-[13px] text-gray">금일 픽업 건수</p>
          <p class="flex items-end gap-[10px] w-full">
            <span class="font-bold text-lg">300 건</span
            ><span class="text-[13px] text-manager-green pb-[2px]">+ 12</span>
          </p>
        </div>
      </li>
      <!-- 1-4. 금일 배차 완료 건수 -->
      <li class="gap-[10px] w-1/4 bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]">
        <div class="w-full flex flex-col px-[30px] py-[26px]">
          <p class="w-2/2 text-[13px] text-gray">금일 배차 완료 건수</p>
          <p class="flex items-end gap-[10px] w-full">
            <span class="font-bold text-lg">187 건</span
            ><span class="text-[13px] text-manager-green pb-[2px]">+ 2</span>
          </p>
        </div>
      </li>
    </ul>
    <!-- 2. 날짜검색 및 선택박스 -->
    <div
      class="flex justify-between px-[20px] py-[10px] w-2/2 bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]">
      <!-- 2-1. 날짜 검색 및 다음 날 픽업날짜 체크박스 -->
      <div class="flex items-center gap-[20px]">
        <!-- 2-1-1. 날짜 검색 -->
        <div class="dateBox flex gap-[10px]">
          <input type="date" class="border-none outline-none text-center align-middle" />
          <span class="text-[16px]">~</span>
          <input type="date" class="border-none outline-none text-center align-middle" />
        </div>
        <!-- 2-1-2. 다음 날 픽업날짜 목록보기 -->
        <div class="flex items-center gap-[10px]">
          <input type="checkbox" id="tomorrowPickUp" class="w-5 h-5" />
          <label for="tomorrowPickUp" class="text-gray">내일 픽업 날짜만 보기</label>
        </div>
      </div>
      <!-- 2-2. 상태(selectBox) 필터링 -->
      <div class="flex gap-[10px]">
        <!-- 2-2-1. 상태필터 -->
        <select>
          <option value="all">전체</option>
          <option value="pickupWait">픽업대기</option>
          <option value="deliveryWait">배송대기</option>
          <option value="delivery">배송중</option>
          <option value="complete">완료</option>
        </select>
        <!-- 2-2-2. 리스트 순서 필터 -->
        <select>
          <option value="new">최신순</option>
          <option value="name">이름순</option>
          <option value="number">예약번호순</option>
          <option value="old">오래된순</option>
        </select>
        <!-- 2-2-3. 지역필터 -->
        <select>
          <option value="all">전체지역</option>
          <option value="center">중구</option>
          <option value="south">남구</option>
          <option value="north">북구</option>
          <option value="east">동구</option>
          <option value="west">서구</option>
          <option value="dalseo">달서구</option>
          <option value="suseong">수성구</option>
        </select>
        <!-- 2-2-4. 배차필터 -->
        <select>
          <option value="all">전체</option>
          <option value="wait">배차대기</option>
          <option value="one">1호차</option>
          <option value="two">2호차</option>
          <option value="three">3호차</option>
        </select>
      </div>
    </div>
    <!-- 3.검색상자, 예약목록 리스트, 페이지네이션 -->
    <div class="w-2/2 flex flex-col align-center bg-white rounded-[10px]">
      <!-- 3-1. 검색상자 -->
      <div class="flex justify-between w-full p-[20px]">
        <div class="font-bold font-[16px]">예약목록</div>
        <div class="searchbar flex align-center searchBox w-1/3 max-w-[500px]">
          <div class="w-5, h-5 mx-[10px]"><img class="w-full h-full" src="/images/lee/searchicon.png" alt="" /></div>
          <input type="text" placeholder="고객명 또는 주소로 검색하세요." class="placeholder:text-[14px] py-[5px]" />
        </div>
      </div>
      <!-- 3-2. 예약목록 리스트 -->
      <table class="w-full">
        <!-- 3-2-1. 예약목록 구분 -->
        <thead class="bg-[#F9FAFB] w-2/2 border-t border-b border-gray pr-[65px]">
          <tr class="w-2/2 pl-[20px] pr-[65px]">
            <th class="pl-[20px] py-2"><input type="checkbox" /></th>
            <th class="text-[13px] text-gray">예약번호</th>
            <th class="text-[13px] text-gray">고객명</th>
            <th class="text-[13px] text-gray">연락처</th>
            <th class="text-[13px] text-gray">주소</th>
            <th class="text-[13px] text-gray">예약일자</th>
            <th class="text-[13px] text-gray">픽업일자</th>
            <th class="text-[13px] text-gray">상태</th>
            <th class="text-[13px] text-gray">배차상태</th>
            <th class="pr-[65px] text-[13px] text-gray">액션</th>
          </tr>
        </thead>
        <!-- 3-2-2. 예약목록 내용 -->
        <tbody class="bg-white align-middle text-center">
          <tr>
            <td class="pl-[20px] py-1 align-middle text-[14px]"><input type="checkbox" /></td>
            <td class="align-middle text-[14px]">1</td>
            <td class="align-middle text-[14px]">홍은경</td>
            <td class="align-middle text-[14px]">01012345678</td>
            <td class="py-2 align-middle text-[14px]">
              대구 달서구 조암로6길 20 <br />
              월성 푸르지오 아파트 110동 0000호
            </td>
            <td class="align-middle text-[14px]">2024년 5월 7일</td>
            <td class="align-middle text-[14px]">2024년 5월 8일</td>
            <td class="align-middle text-[14px]">대기</td>
            <td class="align-middle text-[14px]">배차하기</td>
            <td class="pr-[65px] align-middle text-[14px]">상세</td>
          </tr>
        </tbody>
      </table>
      <!-- 3-3. 페이지네이션 -->
      <div class="flex justify-center items-center rounded-[10px] p-4">
        <div class="flex gap-2">
          <button class="px-2 py-1 border rounded-[10px] text-[14px]">이전</button>
          <button class="px-2 py-1 text-[14px]">1</button>
          <button class="px-2 py-1 border rounded-[10px] text-[14px]">다음</button>
        </div>
      </div>
    </div>
    <!-- 4. 배차하기 및 기사배정 버튼 -->
    <div class="flex flex-row-reverse gap-6">
      <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">기사배정</button>
      <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">배차하기</button>
    </div>
  </div>
</template>
<style scoped>
.dateBox {
  padding: 5px 10px;
  border: 1px solid rgba(217, 217, 217, 1) !important;
  border-radius: 10px;
  color: rgba(118, 118, 118, 1);
}
select {
  border: 1px solid rgba(217, 217, 217, 1) !important;
  border-radius: 10px;
  width: 100px;
  font-size: 14px;
  color: rgba(118, 118, 118, 1);
}
.searchBox {
  border: 1px solid #d9d9d9;
  border-radius: 10px;
}
.searchbar {
  display: flex;
  align-items: center;
}
thead {
  border-top: 1px solid #767676;
  border-bottom: 1px solid #767676;
}
tbody td {
  border-bottom: 1px solid #d9d9d9;
}
</style>
