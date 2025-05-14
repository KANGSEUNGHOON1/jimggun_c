<template>
  <!--전체-->
  <div class="workerHomeWrap w-full max-w-[768px] mx-auto">
    <!--탭 메뉴-->
    <div class="workerHomeTab">
      <!-- 탭 버튼 -->
      <div class="flex">
        <h2
          @click="activeTab = 'home'"
          class="text-center cursor-pointer my-[19px] mx-auto font-bold text-2xl"
          :class="activeTab === 'home' ? ' text-[#FF6F00]' : 'text-[#767676]'"
        >
          홈
        </h2>
        <h2
          @click="activeTab = 'todayWork'"
          class="text-center cursor-pointer my-[19px] mx-auto font-bold text-2xl"
          :class="activeTab === 'todayWork' ? ' text-[#FF6F00]' : 'text-[#767676]'"
        >
          오늘 할 일
        </h2>
      </div>

      <!--홈 탭 내용-->
      <section v-if="activeTab === 'home'" class="home-wrap mx-auto">
        <!--배너-->
        <div
          class="w-full mx-auto max-w-[702px] h-80 p-6 bg-[#FF6F00] rounded-[10px] shadow-md border border-gray-200 flex flex-col justify-between text-white font-['Pretendard']"
        >
          <!-- 상단: 날짜 + 온도 -->
          <div class="flex justify-between items-center">
            <div class="text-xl font-bold">2025.04.28</div>
            <div class="flex items-center gap-2">
              <div class="text-xl font-medium">24.2ºC</div>
              <img class="w-9 h-9" src="/images/kang/sunny.png" alt="날씨" />
            </div>
          </div>

          <!-- 중단: 프로필 + 설명 -->
          <div class="flex items-center gap-6">
            <div
              class="relative w-24 h-24 bg-[#FDF3E7] rounded-full shadow-md border border-[#E5E5EC] flex items-center justify-center"
            >
              <img class="w-16 h-16" src="/images/kang/truckicon.png" alt="아이콘" />
            </div>
            <div class="flex flex-col justify-center">
              <div class="flex items-baseline gap-2">
                <div class="text-4xl font-bold">홍은경</div>
                <div class="text-3xl font-bold">기사님</div>
              </div>
              <div class="mt-1 text-base font-medium">실시간 교통정보, 중요한 알림을 확인하세요</div>
            </div>
          </div>

          <!-- 하단: 수당 정보 -->
          <div class="flex flex-col items-end mt-4">
            <div class="text-xl font-bold">이 달의 추가 수당</div>
            <div class="flex items-end gap-2">
              <div class="text-5xl font-bold">105,000</div>
              <div class="text-4xl font-bold">원</div>
            </div>
          </div>
        </div>

        <!--1호차 게이지 영역-->
        <div
          class="w-full mx-auto mt-[30px] max-w-[697px] h-auto p-6 bg-white rounded-[10px] shadow-md border border-gray-200 flex flex-col gap-4 font-['Inter']"
        >
          <!-- 상단: 차량 이름 -->
          <div class="text-4xl font-bold text-black">1호차</div>

          <!-- 중간: 안내 문구 -->
          <div class="text-lg font-bold">
            <span class="text-[#FF6F00]">10건</span>
            <span class="text-[#767676]">만 더 하면 임무완료! 힘내세요!</span>
          </div>

          <!-- 하단: 진행 바 + 수치 -->
          <div class="flex items-center justify-between">
            <!-- 진행 바 -->
            <div
              class="w-full max-w-[559px] h-3 bg-[#FDF3E7] rounded-full border border-[#E5E5EC] relative overflow-hidden"
            >
              <div class="absolute top-0 left-0 h-full bg-[#FF6F00] rounded-full" style="width: 50%"></div>
            </div>

            <!-- 진행 수치 -->
            <div class="ml-4 text-xl font-bold">
              <span class="text-[#FF6F00]">10</span>
              <span class="text-[#767676]"> / 20</span>
            </div>
          </div>
        </div>
        <!--건수 표시 박스 3개-->
        <div class="w-full mx-auto mt-[30px] h-20 flex gap-8 px-4 md:px-0 justify-center">
          <!-- 전체 건수 -->
          <div
            class="w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-4"
          >
            <div class="flex flex-col justify-start items-start gap-1">
              <div class="text-[#505050] text-xl font-medium font-['Pretendard']">전체 건수</div>
            </div>
            <div class="flex items-center">
              <span class="text-[#FF6F00] text-2xl font-bold font-['Pretendard']">20</span>
              <span class="text-[#111] text-xl font-bold font-['Pretendard']">건</span>
            </div>
          </div>

          <!-- 남은 건수 -->
          <div
            class="w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-4"
          >
            <div class="flex flex-col justify-start items-start gap-1">
              <div class="text-[#505050] text-xl font-medium font-['Pretendard']">남은 건수</div>
            </div>
            <div class="flex items-center">
              <span class="text-[#FF6F00] text-2xl font-bold font-['Pretendard']">10</span>
              <span class="text-[#111] text-xl font-bold font-['Pretendard']">건</span>
            </div>
          </div>

          <!-- 완료 -->
          <div
            class="w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-4"
          >
            <div class="flex flex-col justify-start items-start gap-1">
              <div class="text-[#505050] text-xl font-medium font-['Pretendard']">완료</div>
            </div>
            <div class="flex items-center">
              <span class="text-[#FF6F00] text-2xl font-bold font-['Pretendard']">10</span>
              <span class="text-[#111] text-xl font-bold font-['Pretendard']">건</span>
            </div>
          </div>
        </div>
        <!--알림 사항-->
        <div class="w-full mt-[51px] max-w-[700px] mx-auto px-4 py-4">
          <!-- 상단: 제목 + 전체보기 -->
          <div class="flex justify-between items-center mb-4">
            <div class="text-[#111] text-xl md:text-2xl font-semibold font-['Pretendard']">알림사항</div>
            <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
              <span>전체보기</span>
              <span>&gt;</span>
            </div>
          </div>

          <!-- 알림 내용 -->
          <div
            class="flex items-start gap-3 outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] rounded-[10px] shadow-[0px_4px_10px_0px_rgba(17,17,17,0.1)] px-4 py-4"
          >
            <!-- 경고 아이콘 -->
            <div class="relative min-w-9 min-h-9 w-9 h-9 bg-[#EF4444] rounded-full flex items-center justify-center">
              <div class="w-3.5 h-3.5 bg-white rounded-full absolute"></div>
              <span class="relative z-10 text-[#EF4444] text-xs font-bold font-['Pretendard']">!</span>
            </div>

            <!-- 알림 텍스트 -->
            <div class="flex items-center h-8">
              <p class="text-[#111] text-xs font-bold font-['Pretendard']">
                금일 16:00부로 경부선 북대구IC 인근 산불로 인한 북대구TG 진입, 진출 차단을 알려드립니다.
              </p>
            </div>
          </div>
        </div>
        <!--공지사항-->
        <div class="max-w-[700px] mt-[62px] w-full mx-auto p-4">
          <!-- 제목 -->
          <div class="flex justify-between items-center mb-4">
            <div class="text-[#111] text-xl md:text-2xl font-semibold font-['Pretendard']">공지사항</div>
            <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
              <span>전체보기</span>
              <span>&gt;</span>
            </div>
          </div>
          <!-- 공지 리스트 -->
          <div class="flex flex-col gap-4">
            <div
              class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4"
            >
              <span class="text-base text-[#111] font-medium font-['Pretendard']"
                >짐꾼 사칭 및 보이스피싱 주의 안내</span
              >
              <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.30</span>
            </div>

            <div
              class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4"
            >
              <span class="text-base text-[#111] font-medium font-['Pretendard']"
                >5월 황금 연휴 기간 물류 집중 안내</span
              >
              <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.28</span>
            </div>

            <div
              class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4"
            >
              <span class="text-base text-[#111] font-medium font-['Pretendard']">업데이트 된 짐꾼 앱 기능 안내</span>
              <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.11</span>
            </div>
          </div>
        </div>
        <!--이달의 안전-->
        <div class="max-w-[700px] mt-[51px] mb-[140px] w-full mx-auto p-4">
          <!-- 제목 -->
          <div class="flex justify-between items-center mb-4">
            <div class="text-[#111] text-xl md:text-2xl font-semibold font-['Pretendard']">이달의 안전</div>
            <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
              <span>전체보기</span>
              <span>&gt;</span>
            </div>
          </div>
          <!-- 카드 3개 그리드 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <!-- 카드 1 -->
            <div
              class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] border-solid border-[#E5E5EC] p-3 flex flex-col items-center"
            >
              <img class="w-40 h-40 rounded-[10px] object-cover" src="/images/kang/safe.png" alt="안전 이미지" />
              <div class="mt-2 text-xs font-semibold text-[#111] text-center font-['Pretendard']">
                운전 시 일어나는 안전사고 예방법
              </div>
              <div class="text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.04.30</div>
            </div>

            <!-- 카드 2 -->
            <div
              class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] border border-[#E5E5EC] p-3 flex flex-col items-center"
            >
              <img class="w-40 h-40 rounded-[10px] object-cover" src="/images/kang/safe2.jpg" alt="안전 이미지" />
              <div class="mt-2 text-xs font-semibold text-[#111] text-center font-['Pretendard']">
                택배 배송 안전 수칙
              </div>
              <div class="text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.03.31</div>
            </div>

            <!-- 카드 3 -->
            <div
              class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] border border-[#E5E5EC] p-3 flex flex-col items-center"
            >
              <img class="w-40 h-40 rounded-[10px] object-cover" src="/images/kang/safe3.jpg" alt="안전 이미지" />
              <div class="mt-2 text-xs font-semibold text-[#111] text-center font-['Pretendard']">택배 위험 포인트</div>
              <div class="text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.02.28</div>
            </div>
          </div>
        </div>
        <!--네비게이션 바-->
        <div
          class="fixed bottom-0 left-0 w-full py-3 bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-20 overflow-hidden z-50"
        >
          <!-- 홈 아이콘 -->
          <router-link to="/worker/worker-home">
            <div class="flex flex-col items-center gap-2.5 w-14">
              <img src="/images/kang/home.png" alt="home" />
              <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">홈</div>
            </div></router-link
          >

          <!-- 알림 아이콘 -->
          <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
            <img src="/images/kang/notice.png" alt="notice" />
            <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">알림</div>
          </div>

          <!-- 마이페이지 아이콘 -->
          <router-link to="/worker/worker-mypage">
            <div class="flex flex-col items-center gap-2.5 w-14">
              <img src="/images/kang/mypage.png" alt="mypage" />
              <div class="w-20 text-center text-[#111] text-base font-medium font-['Pretendard']">마이페이지</div>
            </div></router-link
          >

          <!-- 환경설정 아이콘 -->
          <div class="flex flex-col items-center gap-2.5 w-14 cursor-pointer">
            <img src="/images/kang/settings.png" alt="settings" />
            <div class="w-full text-center text-[#111] text-base font-medium font-['Pretendard']">환경설정</div>
          </div>
        </div>
      </section>
      <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
      <!--오늘 할 일 탭 내용-->
      <section v-if="activeTab === 'todayWork'" class="todayWork-wrap">오늘 할 일</section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('home');
</script>
