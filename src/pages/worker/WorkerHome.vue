<template>
  <!--배경색-->
  <div class="bg-white md:bg-[#FDF3E7] min-h-screen flex flex-col">
    <!--전체-->
    <div class="workerHomeWrap w-full max-w-[768px] mx-auto h-screen bg-white flex-1">
      <!--탭 메뉴-->
      <div class="workerHomeTab h-full">
        <!-- 탭 버튼 -->
        <div class="flex">
          <h2
            @click="activeTab = 'home'"
            class="flex-1 text-center cursor-pointer py-[14px] mx-auto text-xl border-b"
            :class="{
              'bg-[#FF6F00] text-[#fff] border-b-[#FF6F00]': activeTab === 'home',
              'bg-[#fff] text-[#767676] border-b-input': activeTab !== 'home',
            }">
            홈
          </h2>
          <h2
            @click="activeTab = 'todayWork'"
            class="flex-1 text-center cursor-pointer py-[14px] mx-auto text-xl border-b border-input"
            :class="{
              'bg-[#FF6F00] text-[#fff] border-b-[#FF6F00]': activeTab === 'todayWork',
              'bg-[#fff] text-[#767676] border-b-input': activeTab !== 'todayWork',
            }">
            오늘 할 일
          </h2>
        </div>

        <!--홈 탭 내용-->
        <section v-if="activeTab === 'home'" class="home-wrap mx-auto">
          <!--배너-->
          <div class="w-full mt-[35px] mx-auto max-w-[702px] h-80 p-6 bg-[#FFF] rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-[#E5E5EC] flex flex-col justify-between text-[#111] font-['Pretendard']">
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
              <div class="relative w-24 h-24 bg-[#FDF3E7] rounded-full shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-[#E5E5EC] flex items-center justify-center">
                <img class="w-16 h-16" src="/images/kang/truckicon.png" alt="아이콘" />
              </div>
              <div class="flex flex-col justify-center">
                <div class="flex items-baseline gap-2">
                  <div class="text-4xl font-bold text-[#FF6F00]">홍은경</div>
                  <div class="text-3xl font-bold text-[#767676]">기사님</div>
                </div>
                <div class="mt-1 text-base font-medium text-[#505050]">실시간 교통정보, 중요한 알림을 확인하세요</div>
              </div>
            </div>

            <!-- 하단: 수당 정보 -->
            <div class="flex flex-col items-end mt-4">
              <div class="text-xl font-bold">이 달의 추가 수당</div>
              <div class="flex items-end gap-2">
                <div class="text-5xl font-bold text-[#FF6F00]">139,120</div>
                <div class="text-4xl font-bold">원</div>
              </div>
            </div>
          </div>

          <!--1호차 게이지 영역-->
          <div class="w-full mx-auto mt-[35px] max-w-[697px] h-auto p-6 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-[#E5E5EC] flex flex-col gap-4 font-['Inter']">
            <!-- 상단: 차량 이름 -->
            <div class="text-4xl font-bold text-[#111]">1호차</div>

            <!-- 중간: 안내 문구 -->
            <div class="text-lg font-bold">
              <span class="text-[#FF6F00]">10건</span>
              <span class="text-[#767676]">만 더 하면 임무완료! 힘내세요!</span>
            </div>

            <!-- 하단: 진행 바 + 수치 -->
            <div class="flex items-center justify-between">
              <!-- 진행 바 -->
              <div class="w-full max-w-[559px] h-3 bg-[#FDF3E7] rounded-full outline outline-1 outline-[#E5E5EC] relative overflow-hidden">
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
          <div class="w-full mx-auto mt-[35px] h-20 flex gap-10 px-4 md:px-0 justify-center">
            <!-- 전체 건수 -->
            <div class="w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-8">
              <div class="flex flex-col justify-start items-start gap-1">
                <div class="text-[#505050] text-xl font-medium font-['Pretendard']">전체 건수</div>
              </div>
              <div class="flex items-center">
                <span class="text-[#FF6F00] text-2xl font-bold font-['Pretendard']">20</span>
                <span class="text-[#111] text-xl font-bold font-['Pretendard']">건</span>
              </div>
            </div>

            <!-- 남은 건수 -->
            <div class="w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-8">
              <div class="flex flex-col justify-start items-start gap-1">
                <div class="text-[#505050] text-xl font-medium font-['Pretendard']">남은 건수</div>
              </div>
              <div class="flex items-center">
                <span class="text-[#FF6F00] text-2xl font-bold font-['Pretendard']">10</span>
                <span class="text-[#111] text-xl font-bold font-['Pretendard']">건</span>
              </div>
            </div>

            <!-- 완료 -->
            <div class="w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-8">
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
          <div class="w-full mt-[35px] max-w-[700px] mx-auto">
            <!-- 상단: 제목 + 전체보기 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-[#111] text-xl md:text-2xl pl-4 font-semibold font-['Pretendard']">알림사항</div>
              <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
                <span>전체보기</span>
                <span>&gt;</span>
              </div>
            </div>

            <!-- 알림 내용 -->
            <div class="flex items-start gap-3 outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] rounded-[10px] shadow-[0px_2px_10px_0px_rgba(17,17,17,0.1)] px-4 py-4">
              <!-- 경고 아이콘 -->
              <div class="relative min-w-9 min-h-9 w-9 h-9 bg-[#EF4444] rounded-full flex items-center justify-center">
                <div class="w-3.5 h-3.5 bg-white rounded-full absolute"></div>
                <span class="relative z-10 text-[#EF4444] text-xs font-bold font-['Pretendard']">!</span>
              </div>

              <!-- 알림 텍스트 -->
              <div class="flex items-center h-8">
                <p class="text-[#111] text-xs font-bold font-['Pretendard']">금일 16:00부로 경부선 북대구IC 인근 산불로 인한 북대구TG 진입, 진출 차단을 알려드립니다.</p>
              </div>
            </div>
          </div>
          <!--공지사항-->
          <div class="max-w-[700px] mt-[35px] w-full mx-auto">
            <!-- 제목 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-[#111] text-xl md:text-2xl pl-4 font-semibold font-['Pretendard']">공지사항</div>
              <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
                <span>전체보기</span>
                <span>&gt;</span>
              </div>
            </div>
            <!-- 공지 리스트 -->
            <div class="flex flex-col gap-4">
              <div class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4">
                <span class="text-base text-[#111] font-medium font-['Pretendard']">짐꾼 사칭 및 보이스피싱 주의 안내</span>
                <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.30</span>
              </div>

              <div class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4">
                <span class="text-base text-[#111] font-medium font-['Pretendard']">5월 황금 연휴 기간 물류 집중 안내</span>
                <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.28</span>
              </div>

              <div class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4">
                <span class="text-base text-[#111] font-medium font-['Pretendard']">업데이트 된 짐꾼 앱 기능 안내</span>
                <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.11</span>
              </div>
            </div>
          </div>
          <!--이달의 안전-->
          <div class="w-full max-w-[700px] mt-[35px] pb-[140px] mx-auto">
            <!-- 제목 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-[#111] text-xl md:text-2xl pl-4 font-semibold font-['Pretendard']">이달의 안전</div>
              <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
                <span>전체보기</span>
                <span>&gt;</span>
              </div>
            </div>
            <!-- 카드 3개 그리드 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <!-- 카드 1 -->
              <div class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] flex flex-col">
                <img class="w-[210px] h-40 rounded-[10px] object-cover" src="/images/kang/safe.png" alt="안전 이미지" />
                <div class="mt-5 pl-6 text-xs font-semibold text-[#111] font-['Pretendard']">운전 시 일어나는 안전사고 예방법</div>
                <div class="mb-5 pl-6 text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.04.30</div>
              </div>

              <!-- 카드 2 -->
              <div class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] flex flex-col">
                <img class="w-[210px] h-40 rounded-[10px] object-cover" src="/images/kang/safe2.jpg" alt="안전 이미지" />
                <div class="mt-5 pl-6 text-xs font-semibold text-[#111] text-left font-['Pretendard']">택배 배송 안전 수칙</div>
                <div class="mb-5 pl-6 text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.03.31</div>
              </div>

              <!-- 카드 3 -->
              <div class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] flex flex-col">
                <img class="w-[210px] h-40 rounded-[10px] object-cover" src="/images/kang/safe3.jpg" alt="안전 이미지" />
                <div class="mt-5 pl-6 text-xs font-semibold text-[#111] font-['Pretendard']">택배 위험 포인트</div>
                <div class="mb-5 pl-6 text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.02.28</div>
              </div>
            </div>
          </div>
          <!--네비게이션 바-->
          <BottomNavBar />
        </section>
        <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->

        <!--오늘 할 일 탭 내용-->
        <section v-if="activeTab === 'todayWork'" class="todayWork-wrap h-full">
          <!-- 지도로 보기 영역 -->
          <div v-if="!listViewMode" class="todayWorkMapWrap w-full" id="map" style="height: 100%; overflow: hidden; position: relative">
            <!-- 리스트로 보기 버튼 -->
            <button @click="listViewMode = true" class="list-view-btn absolute top-4 right-4 z-[100]">
              <img src="/images/hong/ListViewBtn.png" alt="리스트 보기" class="w-20 h-20" />
            </button>
            <!-- 숨김 마커 이미지들 -->
            <div class="markerimages">
              <img src="/images/hong/marker1-1.png" alt="마커1" />
              <img src="/images/hong/marker2-1.png" alt="마커2" />
              <img src="/images/hong/marker3.png" alt="마커3" />
              <img src="/images/hong/marker3-1.png" alt="마커3-1" />
              <img src="/images/hong/marker4.png" alt="마커4" />
              <img src="/images/hong/marker4-1.png" alt="마커4-1" />
              <img src="/images/hong/marker5.png" alt="마커5" />
              <img src="/images/hong/marker5-1.png" alt="마커5-1" />
              <img src="/images/hong/marker6.png" alt="마커6" />
              <img src="/images/hong/marker6-1.png" alt="마커6-1" />
              <img src="/images/hong/marker7-1.png" alt="마커7" />
              <img src="/images/hong/marker8.png" alt="마커8" />
              <img src="/images/hong/marker8-1.png" alt="마커8-1" />
              <img src="/images/hong/marker9.png" alt="마커9" />
              <img src="/images/hong/marker9-1.png" alt="마커9-1" />
              <img src="/images/hong/marker10.png" alt="마커10" />
              <img src="/images/hong/marker10-1.png" alt="마커10-1" />
            </div>
            <!-- 모달 -->
            <div v-if="modalOpen && selectedPlace" class="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[768px] bg-white rounded-xl [box-shadow:0px_-4px_8px_rgba(0,0,0,0.1)] z-50 p-6">
              <!-- 상단 정보 -->
              <div class="flex justify-between mb-4">
                <!-- 왼쪽 컬럼 -->
                <div class="flex flex-col gap-4 w-1/2 text-sm text-black">
                  <div class="flex gap-2">
                    <span class="text-gray-500 w-20">예약번호</span>
                    <span class="text-base">{{ selectedPlace.reservationId }}</span>
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-500 w-20">주소</span>
                    <span class="whitespace-pre-line text-base">{{ selectedPlace.address }}</span>
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-500 w-20">수화물</span>
                    <span class="whitespace-pre-line text-base">{{ selectedPlace.clothes }}</span>
                  </div>
                </div>

                <!-- 오른쪽 컬럼 -->
                <div class="flex flex-col gap-4 w-1/2 text-sm text-black relative">
                  <div class="flex gap-2">
                    <span class="text-gray-500 w-20">이름</span>
                    <span class="text-base">{{ selectedPlace.name }}</span>
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-500 w-20">전화</span>
                    <span class="text-base">{{ selectedPlace.phone }}</span>
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-500 w-20">요청사항</span>
                    <span class="text-base">{{ selectedPlace.notes || "-" }}</span>
                  </div>

                  <!-- 전체 사진 행 -->
                  <div class="flex w-full items-center gap-2">
                    <!-- 사진 라벨 (위 정렬 고정) -->
                    <span class="text-gray-500 w-20 shrink-0">사진</span>

                    <!-- 오른쪽 영역 (업로드박스 + 버튼) -->
                    <div class="flex justify-between w-full">
                      <!-- 왼쪽: 업로드 영역 -->
                      <div class="flex items-start gap-2">
                        <div v-if="!uploadedImage" @click="triggerFileInput" class="w-16 h-16 border border-dashed border-gray-400 rounded-[10px] flex items-center justify-center text-gray-400 text-xl cursor-pointer">+</div>

                        <img v-else :src="uploadedImage" @click="triggerFileInput" class="w-16 h-16 rounded-[10px] object-cover cursor-pointer" />

                        <input type="file" ref="imageInput" accept="image/*" class="hidden" @change="handleImageUpload" />
                      </div>

                      <!-- 오른쪽: 픽업완료 버튼만 하단 정렬 -->
                      <div class="self-end">
                        <button
                          :disabled="selectedPlace.completed && !overrideUpload"
                          @click="handlePickupComplete"
                          :class="['px-6 py-2 rounded-[10px] font-bold text-sm whitespace-nowrap', selectedPlace.completed && !overrideUpload ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-[#FF6F00] text-white']">
                          {{ selectedPlace.completed && !overrideUpload ? "픽업완료" : selectedPlace.completed && overrideUpload ? "수정하기" : "픽업완료" }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 닫기 버튼 -->
                  <button @click="modalOpen = false" class="text-gray-500 text-xl absolute top-0 right-0">✕</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 리스트로 보기 영역 -->
          <div v-else class="todayWorkListWrap w-full relative">
            <button @click="switchToMapView" class="list-view-btn absolute top-4 right-4 z-[100]">
              <img src="/images/hong/MapViewBtn.png" alt="지도 보기" class="w-20 h-20" />
            </button>
            <div class="list-view-wrap max-w-[768px] mx-auto px-8 py-9">
              <!-- 상단 진행바 -->
              <div class="w-5/6 flex justify-space-between">
                <div class="text-[#767676] text-lg font-bold mb-2">10건만 더 하면 임무완료! 힘내세요!</div>
                <div class="flex">
                  <div class="ml-4 font-bold text-[#FF6F00] text-base">10</div>
                  <div class="ml-4 font-bold text-[#767676] text-base">/ 20</div>
                </div>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="w-5/6 h-2 bg-[#FDF3E7] rounded-full">
                  <div class="h-2 bg-[#FF6F00] rounded-full" style="width: 50%"></div>
                </div>
              </div>

              <!-- 리스트 전체 -->
              <div class="flex flex-col gap-5">
                <!-- 리스트들 -->
                <div v-for="item in markerData" :key="item.reservationId" class="w-[700px] h-20 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-orange-500 overflow-hidden">
                  <div class="w-24 h-7 px-3 py-[5px] left-[585px] top-[25px] absolute bg-orange-500 rounded-[10px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
                    <div class="justify-start text-white text-sm font-semibold font-['Pretendard']">픽업완료</div>
                  </div>
                  <div class="w-80 h-14 left-[25px] top-[12px] absolute overflow-hidden">
                    <div class="left-[132px] top-[11px] absolute justify-center text-neutral-900 text-sm font-medium font-['Pretendard']">{{ item.address }}</div>
                    <div class="w-14 h-14 left-[52px] top-0 absolute rounded-[10px] border border-gray-200"></div>
                    <div class="left-[68px] top-[4px] absolute justify-center text-gray-200 text-4xl font-medium font-['Pretendard']">+</div>
                    <div class="w-7 h-7 left-0 top-[14px] absolute bg-orange-50 rounded-full"></div>
                    <div class="w-3 h-6 left-[9px] top-[17px] absolute justify-start text-orange-500 text-xl font-semibold font-['Pretendard']">{{ item.reservationId }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from "vue";
import BottomNavBar from "@/components/BottomNavBar.vue";

// 탭
const activeTab = ref("home");
// 선택된 장소 정보
const selectedPlace = ref(null);
// 모달 열림상태
const modalOpen = ref(false);
// 숨겨진 input 요소
const imageInput = ref(null);
// 이미지 1장만 저장
const uploadedImage = ref(null);
// 이미지 재업로드 시
const overrideUpload = ref(false);
// 지도 / 리스트 전환
const listViewMode = ref(false);

// 지도 및 마커 상태
let map = null;
let markers = [];

// 마커 더미데이터 목록
const markerData = ref([
  {
    lat: 35.8997,
    lng: 128.638,
    title: "대구국제공항",
    reservationId: "1",
    address: "대구 동구 공항로 221",
    name: "홍길동",
    phone: "010-1234-5678",
    notes: "",
    clothes: "M - 1개\nL - 1개",
    image: "marker1-1.png",
    previewImage: "/images/hong/default-photo-1.png",
  },
  {
    lat: 35.8797,
    lng: 128.6292,
    title: "동대구역",
    reservationId: "2",
    address: "대구 동구 동대구로 550",
    name: "이영희",
    phone: "010-2345-6789",
    notes: "CU 편의점 앞에 둘게요",
    clothes: "S - 2개",
    image: "marker2-1.png",
    previewImage: "/images/hong/default-photo-2.png",
  },
  {
    lat: 35.9428,
    lng: 128.5472,
    title: "칠곡그린빌3차",
    reservationId: "3",
    address: "대구 북구 구암로 55",
    name: "박철수",
    phone: "010-3456-7890",
    notes: "관리실에 둘게요",
    clothes: "M - 1개\nXL - 2개",
    image: "marker3.png",
  },
  {
    lat: 35.8961,
    lng: 128.5904,
    title: "북구문화회관",
    reservationId: "4",
    address: "대구 북구 옥산로 15",
    name: "김민지",
    phone: "010-4567-8901",
    notes: "",
    clothes: "L - 1개\nS - 1개",
    image: "marker4.png",
  },
  {
    lat: 35.8777,
    lng: 128.6002,
    title: "칠성시장 남문",
    reservationId: "5",
    address: "대구 북구 칠성남로 5",
    name: "최지훈",
    phone: "010-5678-9012",
    notes: "",
    clothes: "M - 1개\nM - 1개",
    image: "marker5.png",
  },
  {
    lat: 35.8889,
    lng: 128.5943,
    title: "북구 건강센터",
    reservationId: "6",
    address: "대구 북구 팔달로 35",
    name: "정유진",
    phone: "010-6789-0123",
    notes: "",
    clothes: "S - 1개\nL - 2개",
    image: "marker6.png",
  },
  {
    lat: 35.8944,
    lng: 128.6086,
    title: "침산동 사무실",
    reservationId: "7",
    address: "대구 북구 침산로 70",
    name: "장도현",
    phone: "010-7890-1234",
    notes: "",
    clothes: "XL - 1개",
    image: "marker7-1.png",
    previewImage: "/images/hong/default-photo-3.png",
  },
  {
    lat: 35.9022,
    lng: 128.589,
    title: "공원 앞 편의점",
    reservationId: "8",
    address: "대구 북구 동암로 123",
    name: "서지수",
    phone: "010-8901-2345",
    notes: "",
    clothes: "S - 2개\nM - 1개",
    image: "marker8.png",
  },
  {
    lat: 35.9444,
    lng: 128.5673,
    title: "대구은행 칠곡지점",
    reservationId: "9",
    address: "대구 북구 칠곡중앙대로 77",
    name: "한상우",
    phone: "010-9012-3456",
    notes: "",
    clothes: "L - 1개\nM - 1개",
    image: "marker9.png",
  },
  {
    lat: 35.8948,
    lng: 128.5831,
    title: "스마트주차장",
    reservationId: "10",
    address: "대구 북구 구암동 777",
    name: "이소영",
    phone: "010-1122-3344",
    notes: "",
    clothes: "S - 1개\nS - 1개",
    image: "marker10.png",
  },
]);

// 마커 생성
const createMarker = (place) => {
  const position = new kakao.maps.LatLng(place.lat, place.lng);
  const marker = new kakao.maps.Marker({
    position,
    title: place.title,
    image: new kakao.maps.MarkerImage(`/images/hong/${place.image}`, new kakao.maps.Size(44, 51)),
  });
  kakao.maps.event.addListener(marker, "click", () => {
    selectedPlace.value = {
      ...place,
      completed: place.image.includes("-1.png"),
    };
    // 이미지 우선순위 적용
    uploadedImage.value = place.uploadedImage || place.previewImage || null;

    // 버튼 상태 초기화 (다시 클릭했을 때 항상 false)
    overrideUpload.value = false;

    modalOpen.value = true;
  });

  marker.setMap(map);
  markers.push(marker);
};

// 기존 마커 제거
const clearMarkers = () => {
  markers.forEach((m) => m.setMap(null));
  markers = [];
};

// 픽업 완료시 마커 이미지 변경
function handlePickupComplete() {
  if (selectedPlace.value?.completed && !overrideUpload.value) return; // override가 false일 때만 리턴
  const index = markerData.value.findIndex((item) => item.reservationId === selectedPlace.value.reservationId);
  if (index !== -1) {
    const original = markerData.value[index].image;
    const updated = original.includes("-1.png") ? original : original.replace(".png", "-1.png");
    markerData.value[index].image = updated;
    markerData.value[index].completed = true;
    markerData.value[index].uploadedImage = uploadedImage.value;

    overrideUpload.value = false; // 다시 비활성화로 되돌림
    modalOpen.value = false;

    clearMarkers();
    markerData.value.forEach(createMarker);
  }
}
// 지도 높이 조절 함수
function resizeMapHeight() {
  const tabEl = document.querySelector(".workerHomeTab > .flex");
  const mapEl = document.getElementById("map");

  if (tabEl && mapEl) {
    const tabHeight = tabEl.offsetHeight;
    const windowHeight = window.innerHeight;
    const mapHeight = windowHeight - tabHeight;

    mapEl.style.height = `${mapHeight}px`;

    // 혹시 부모가 100% 이상이면 강제로 제거
    mapEl.style.minHeight = "unset";
    mapEl.style.maxHeight = "unset";
    mapEl.style.overflow = "hidden";

    // 카카오 지도 내부 레이아웃도 다시 계산
    if (map && map.relayout) {
      map.relayout();
    }
  }
}

// 지도 초기화
const initMap = () => {
  const container = document.getElementById("map");
  if (!container) return;
  map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(35.8944, 128.6586),
    level: 7,
  });
  // 지도 높이 조절
  resizeMapHeight();

  clearMarkers();
  markerData.value.forEach(createMarker);

  // 내 위치 마커 추가
  addCurrentLocationMarker();
};

// 카카오맵 SDK 로딩 및 지도 실행
const loadKakaoMap = () => {
  const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_KEY;
  if (!kakaoApiKey) return;
  const scriptId = "kakao-map-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
    script.onload = () => kakao.maps.load(initMap);
    document.head.appendChild(script);
  } else {
    kakao.maps.load(initMap); // 이미 로드된 경우
  }
};

// 탭 전환 시 실행할 비동기 함수
async function handleTabChangeToTodayWork() {
  await nextTick(); // DOM 렌더 완료 후 실행

  if (typeof kakao !== "undefined" && kakao.maps) {
    kakao.maps.load(() => {
      initMap();
      resizeMapHeight(); // 지도 로딩 이후에만 높이 조절
    });
  } else {
    loadKakaoMap();
  }
}
// onMounted: 첫 진입이 todayWork일 경우 지도 로딩
onMounted(() => {
  if (activeTab.value === "todayWork") {
    handleTabChangeToTodayWork();
  }
  window.addEventListener("resize", resizeMapHeight); // 브라우저 리사이즈 시 지도 높이 재조정
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeMapHeight); // 컴포넌트 언마운트 시 이벤트 제거
});

// watch: 탭 전환 감지
watch(activeTab, (newValue) => {
  modalOpen.value = false;
  uploadedImage.value = null; // 초기화
  if (newValue === "todayWork") {
    handleTabChangeToTodayWork(); // 무조건 지도 다시 생성
  }
});

// 이미지 업로드
function triggerFileInput() {
  imageInput.value?.click();
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    // 완료된 상태일 때만 override 플래그 켜기
    if (selectedPlace.value?.completed) {
      overrideUpload.value = true;
    }
  };
  reader.readAsDataURL(file);
}

// 내 위치 마커 생성 함수
function addCurrentLocationMarker() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const locPosition = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({
        position: locPosition,
        image: new kakao.maps.MarkerImage("/images/hong/mylocationImg.png", new kakao.maps.Size(70, 90)),
        title: "내 위치",
      });

      marker.setMap(map);

      // 지도 중심도 내 위치로 이동
      map.setCenter(locPosition);
    },
    (error) => {
      console.error("위치 정보를 가져올 수 없습니다.", error);
    }
  );
}

// 맵뷰로 되돌아가기
function switchToMapView() {
  listViewMode.value = false;
  nextTick(() => {
    initMap(); // 지도 다시 초기화
  });
}

// 리스트로 보기 버튼
</script>
<style scoped>
/* marker 숨김용 */
.markerimages {
  display: none;
}
</style>
