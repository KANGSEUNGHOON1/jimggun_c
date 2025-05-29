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
            class="tab-text flex-1 text-center cursor-pointer py-[14px] mx-auto text-[20px] border-b"
            :class="{
              'bg-[#FF6F00] text-[#fff] border-b-[#FF6F00]': activeTab === 'home',
              'bg-[#fff] text-[#767676] border-b-input': activeTab !== 'home',
            }">
            홈
          </h2>
          <h2
            @click="activeTab = 'todayWork'"
            class="tab-text flex-1 text-center cursor-pointer py-[14px] mx-auto text-[20px] border-b border-input"
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
          <div class="banner w-full mt-[35px] mx-auto max-w-[702px] h-80 p-6 bg-[#FFF] rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-[#E5E5EC] flex flex-col justify-between text-[#111] font-['Pretendard']">
            <!-- 상단: 날짜 + 온도 -->
            <div class="date-line flex justify-between items-center">
              <div class="text-xl font-bold">{{ formattedDate }}</div>
              <div class="flex items-center gap-2">
                <div class="text-xl font-medium">24.2ºC</div>
                <img class="w-9 h-9" src="/images/kang/sunny.png" alt="날씨" />
              </div>
            </div>

            <!-- 중단: 프로필 + 설명 -->
            <div class="flex items-center gap-4 flex-nowrap">
              <!-- 아이콘 -->
              <div class="w-24 min-w-[96px] h-24 bg-[#FDF3E7] rounded-full shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-[#E5E5EC] flex items-center justify-center shrink-0">
                <img class="w-16 h-16 object-contain" src="/images/kang/truckicon.png" alt="아이콘" />
              </div>

              <!-- 텍스트 -->
              <div class="flex flex-col justify-center min-w-0 flex-grow">
                <div class="flex items-baseline gap-2 flex-wrap">
                  <div class="text-4xl font-bold whitespace-nowrap">홍은경</div>
                  <div class="text-3xl font-bold text-[#505050] whitespace-nowrap">기사님</div>
                </div>
                <div class="mt-1 text-base font-medium text-[#767676]">실시간 교통정보, 중요한 알림을 확인하세요</div>
              </div>
            </div>

            <!-- 하단: 수당 정보 -->
            <div class="w-full flex flex-col items-end mt-4">
              <div class="text-xl font-bold">이 달의 추가 수당</div>
              <div class="flex items-end gap-2">
                <div class="total-incentive text-5xl font-bold text-[#FF6F00]">₩ {{ totalMonthlyPay.toLocaleString() }}</div>
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
              <span class="text-[#FF6F00]">{{ remainingFiltered }}건</span>
              <span class="text-[#767676]">만 더 하면 임무완료! 힘내세요!</span>
            </div>

            <!-- 하단: 진행 바 + 수치 -->
            <div class="flex items-center justify-between">
              <!-- 진행 바 -->
              <div class="gauge-bar w-full max-w-[559px] h-3 bg-[#FDF3E7] rounded-full outline outline-1 outline-[#E5E5EC] relative overflow-hidden">
                <div class="absolute top-0 left-0 h-full bg-[#FF6F00] rounded-full" :style="{ width: progressRate + '%' }"></div>
              </div>

              <!-- 진행 수치 -->
              <div class="ml-4 text-xl font-bold">
                <span class="text-[#FF6F00]">{{ completedFiltered }}</span>
                <span class="text-[#767676]"> / {{ totalFiltered }}</span>
              </div>
            </div>
          </div>
          <!--건수 표시 박스 3개-->
          <div class="summary-cards w-full mx-auto mt-[35px] h-20 flex gap-10 px-4 md:px-0 justify-center">
            <!-- 전체 건수 -->
            <div class="summary-card w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-8">
              <div class="summary-count-text flex justify-start items-start gap-1">
                <div class="text-[#505050] text-[20px] font-medium font-['Pretendard']">전체 건수</div>
              </div>
              <div class="flex items-center">
                <span class="text-[#FF6F00] text-[24px] font-bold font-['Pretendard']">{{ totalFiltered }}</span>
                <span class="text-[#111] text-[20px] font-bold font-['Pretendard']">건</span>
              </div>
            </div>

            <!-- 남은 건수 -->
            <div class="summary-card w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-8">
              <div class="summary-count-text flex justify-start items-start gap-1">
                <div class="text-[#505050] text-[20px] font-medium font-['Pretendard']">남은 건수</div>
              </div>
              <div class="flex items-center">
                <span class="text-[#FF6F00] text-[24px] font-bold font-['Pretendard']">{{ remainingFiltered }}</span>
                <span class="text-[#111] text-[20px] font-bold font-['Pretendard']">건</span>
              </div>
            </div>

            <!-- 완료 -->
            <div class="summary-card w-52 h-20 bg-white rounded-[10px] shadow-[2px_4px_10px_0px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] overflow-hidden flex items-center justify-between px-8">
              <div class="summary-count-text flex justify-start items-start gap-1">
                <div class="text-[#505050] text-[20px] font-medium font-['Pretendard']">완료</div>
              </div>
              <div class="flex items-center">
                <span class="text-[#FF6F00] text-[24px] font-bold font-['Pretendard']">{{ completedFiltered }}</span>
                <span class="text-[#111] text-[20px] font-bold font-['Pretendard']">건</span>
              </div>
            </div>
          </div>
          <!--알림 사항-->
          <div class="w-full mt-[35px] max-w-[700px] mx-auto">
            <!-- 상단: 제목 + 전체보기 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-[#111] text-xl md:text-2xl pl-6 font-semibold font-['Pretendard']">알림사항</div>
              <div @click="router.push('/worker/worker-notice')" class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
                <span class="pr-6">전체보기&gt;</span>
              </div>
            </div>

            <!-- 알림 내용 -->
            <div @click="router.push('/worker/worker-notice')" class="flex gap-3 items-center px-6 py-4 outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] rounded-[10px] shadow-[0px_2px_10px_0px_rgba(17,17,17,0.1)] cursor-pointer">
              <!-- 경고 아이콘 -->
              <div class="w-9 h-9 bg-[#EF4444] rounded-full flex items-center justify-center shrink-0 relative">
                <div class="w-3.5 h-3.5 bg-white rounded-full absolute"></div>
                <span class="relative z-10 text-[#EF4444] text-xs font-bold font-['Pretendard']">!</span>
              </div>

              <!-- 텍스트 -->
              <p class="text-[#111] text-xs font-bold font-['Pretendard'] leading-[1.4]">금일 16:00부로 경부선 북대구IC 인근 산불로 인한 북대구TG 진입, 진출 차단을 알려드립니다.</p>
            </div>
          </div>
          <!--공지사항-->
          <div class="max-w-[700px] mt-[35px] w-full mx-auto">
            <!-- 제목 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-[#111] text-xl md:text-2xl pl-6 font-semibold font-['Pretendard']">공지사항</div>
              <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
                <span class="pr-6">전체보기&gt;</span>
              </div>
            </div>
            <!-- 공지 리스트 -->
            <div class="flex flex-col gap-4">
              <div class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4 cursor-pointer">
                <span class="notice-text text-base text-[#111] font-medium font-['Pretendard']">짐꾼 사칭 및 보이스피싱 주의 안내</span>
                <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.30</span>
              </div>

              <div class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4 cursor-pointer">
                <span class="notice-text text-base text-[#111] font-medium font-['Pretendard']">5월 황금 연휴 기간 물류 집중 안내</span>
                <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.28</span>
              </div>

              <div class="flex justify-between items-center bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] px-6 py-4 cursor-pointer">
                <span class="notice-text text-base text-[#111] font-medium font-['Pretendard']">업데이트 된 짐꾼 앱 기능 안내</span>
                <span class="text-xs text-[#767676] font-medium font-['Pretendard']">2025.04.11</span>
              </div>
            </div>
          </div>
          <!--이달의 안전-->
          <div class="w-full max-w-[700px] mt-[35px] pb-[140px] mx-auto">
            <!-- 제목 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-[#111] text-xl md:text-2xl pl-6 font-semibold font-['Pretendard']">이달의 안전</div>
              <div class="flex items-center gap-1 text-[#767676] text-xs font-bold font-['Pretendard'] cursor-pointer">
                <span class="pr-6">전체보기&gt;</span>
              </div>
            </div>
            <!-- 카드 3개 그리드 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <!-- 카드 1 -->
              <div class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] flex flex-col cursor-pointer">
                <img class="block w-full h-40 rounded-t-[10px] rounded-b-none object-cover" src="/images/kang/safe.png" alt="안전 이미지" />
                <div class="mt-5 pl-6 text-xs font-semibold text-[#111] font-['Pretendard']">운전 시 일어나는 안전사고 예방법</div>
                <div class="mb-5 pl-6 text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.04.30</div>
              </div>

              <!-- 카드 2 -->
              <div class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] flex flex-col cursor-pointer">
                <img class="block w-full h-40 rounded-t-[10px] rounded-b-none object-cover" src="/images/kang/safe2.jpg" alt="안전 이미지" />
                <div class="mt-5 pl-6 text-xs font-semibold text-[#111] text-left font-['Pretendard']">택배 배송 안전 수칙</div>
                <div class="mb-5 pl-6 text-xs font-semibold text-[#767676] font-['Pretendard'] mt-1">2025.03.31</div>
              </div>

              <!-- 카드 3 -->
              <div class="bg-white rounded-[10px] shadow-[2px_4px_10px_rgba(17,17,17,0.02)] outline outline-1 outline-offset-[-1px] outline-[#E5E5EC] flex flex-col cursor-pointer">
                <img class="block w-full h-40 rounded-t-[10px] rounded-b-none object-cover" src="/images/kang/safe3.jpg" alt="안전 이미지" />
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
            <button @click="listViewMode = true" class="list-view-btn absolute top-6 right-4 z-[100]">
              <img src="/images/hong/ListViewBtn.png" alt="리스트 보기" class="w-20 h-20" />
            </button>

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
                    <div class="flex items-center gap-3 text-base">
                      <span>{{ selectedPlace.phone }}</span>
                      <img src="/images/hong/phone.png" alt="" aria-hidden="true" class="w-6 h-6 cursor-pointer" />
                    </div>
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
                        <!-- 이미지가 없을 때 -->
                        <div v-if="!uploadedImages[selectedPlace.reservationId]" @click="triggerFileInput(selectedPlace.reservationId)" class="w-16 h-16 border-[2px] border-dashed border-[#E5E5EC] rounded-[10px] flex items-center justify-center cursor-pointer">
                          <span class="text-[#E5E5EC] text-3xl font-medium leading-none translate-y-[-2px]">+</span>
                        </div>

                        <!-- 이미지가 있을 때 -->
                        <img v-else-if="uploadedImages[selectedPlace.reservationId]" :src="uploadedImages[selectedPlace.reservationId]" class="w-16 h-16 rounded-[10px] object-cover cursor-pointer" @click="triggerFileInput(selectedPlace.reservationId)" />

                        <!-- input 연결도 reservationId로 -->
                        <input type="file" :ref="(el) => (imageInput[selectedPlace.reservationId] = el)" accept="image/*" class="hidden" @change="(e) => handleImageUpload(e, selectedPlace.reservationId)" />
                      </div>

                      <!-- 지도 모달: 픽업완료 버튼 -->
                      <div class="self-end">
                        <button
                          @click="handlePickupComplete"
                          :disabled="selectedPlace.completed && !selectedPlace.overrideUpload"
                          :class="['px-6 py-2 rounded-[10px] font-bold text-sm whitespace-nowrap', selectedPlace.completed && !selectedPlace.overrideUpload ? 'bg-[#E5E5EC] text-[#505050] cursor-not-allowed' : 'bg-[#FF6F00] text-white']">
                          {{ selectedPlace.completed && !selectedPlace.overrideUpload ? "픽업완료" : selectedPlace.completed && selectedPlace.overrideUpload ? "수정하기" : "픽업완료" }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 닫기 버튼 -->
                  <button @click="modalOpen = false" class="text-gray-500 text-xl absolute top-[-3px] right-0">✕</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 리스트로 보기 영역 -->
          <div v-else class="todayWorkListWrap w-full relative">
            <button @click="switchToMapView" class="list-view-btn absolute top-6 right-4 z-[100]">
              <img src="/images/hong/MapViewBtn.png" alt="지도 보기" class="w-20 h-20" />
            </button>
            <div class="list-view-wrap max-w-[768px] mx-auto px-8 py-10">
              <!-- 진행바 + 리스트 묶음 -->
              <div class="flex flex-col gap-4">
                <!-- 상단 진행바 -->
                <div>
                  <div class="w-5/6 flex justify-between">
                    <div class="text-[#FF6F00] text-lg font-bold mb-2">
                      {{ remainingFiltered }}건
                      <span class="text-[#767676] text-lg">만 더 하면 임무완료! 힘내세요!</span>
                    </div>
                    <div class="flex">
                      <div class="ml-4 font-bold text-[#FF6F00] text-lg">
                        {{ completedFiltered }}
                      </div>
                      <div class="ml-2 font-bold text-[#767676] text-lg">/ {{ totalFiltered }}</div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center mb-4">
                    <div class="w-5/6 h-2 bg-[#FDF3E7] rounded-full">
                      <div class="h-2 bg-[#FF6F00] rounded-full" style="width: 50%"></div>
                    </div>
                  </div>
                </div>

                <!-- 셀렉트 박스 두 개 -->
                <div class="max-w-[768px] flex gap-3 mt-[5px] justify-end">
                  <select v-model="selectedArea" class="border border-[#E5E5EC] px-2 py-2 rounded-[10px] text-sm text-[#505050]">
                    <option>전체 지역</option>
                    <option>중구</option>
                    <option>수성구</option>
                  </select>
                  <select v-model="selectedStatus" class="border border-[#E5E5EC] px-2 py-2 rounded-[10px] text-sm text-[#505050]">
                    <option>전체 상태</option>
                    <option>픽업 대기</option>
                    <option>픽업 완료</option>
                  </select>
                </div>

                <!-- 리스트 전체 -->
                <div class="flex flex-col gap-5 w-full max-w-[700px]">
                  <!-- 리스트 아이템 반복 -->
                  <div v-for="item in filteredMarkerData" :key="item.reservationId" class="flex items-center justify-between p-4 bg-white rounded-[10px] overflow-hidden" :class="item.completed && !item.overrideUpload ? 'outline outline-1 outline-[#E5E5EC]' : 'outline outline-1 outline-orange-500'">
                    <!-- 좌측: 아이디 + 플러스 + 테두리박스 -->
                    <div class="flex items-center gap-4">
                      <!-- 아이디 동그라미 -->
                      <div class="w-7 h-7 rounded-full flex items-center justify-center" :class="item.completed && !item.overrideUpload ? 'bg-[#E5E5EC]' : 'bg-orange-50'">
                        <span class="text-sm font-semibold font-['Pretendard']" :class="item.completed && !item.overrideUpload ? 'text-[#505050]' : 'text-orange-500'">
                          {{ item.reservationId }}
                        </span>
                      </div>

                      <!-- 리스트 업로드 영역 박스 -->
                      <div class="flex items-start gap-2">
                        <!-- 이미지 없을 때만 + 버튼 -->
                        <div v-if="!uploadedImages[item.reservationId] && !item.previewImage" @click="triggerFileInput(item.reservationId)" class="w-16 h-16 border-[2px] border-dashed border-[#E5E5EC] rounded-[10px] flex items-center justify-center cursor-pointer">
                          <span class="text-[#E5E5EC] text-3xl font-medium leading-none translate-y-[-2px]">+</span>
                        </div>

                        <!-- 이미지 있을 때 -->
                        <img v-else :src="uploadedImages[item.reservationId] || item.previewImage" class="w-16 h-16 rounded-[10px] object-cover cursor-pointer" @click="triggerFileInput(item.reservationId)" />

                        <input type="file" :ref="(el) => (imageInput[item.reservationId] = el)" accept="image/*" class="hidden" @change="(e) => handleImageUpload(e, item.reservationId)" />
                      </div>

                      <!-- 주소 -->
                      <div class="text-neutral-900 text-base font-medium font-['Pretendard'] whitespace-pre-line break-words max-w-[500px]">
                        {{ item.address }}
                      </div>
                    </div>

                    <!-- 우측: 픽업완료 버튼 -->
                    <button
                      @click="handlePickupCompleteFromList(item)"
                      :disabled="item.completed && !item.overrideUpload"
                      :class="['px-4 py-2 rounded-[10px] text-sm font-bold whitespace-nowrap', item.completed && !item.overrideUpload ? 'bg-[#E5E5EC] text-[#505050] cursor-not-allowed' : 'bg-[#FF6F00] text-white']">
                      {{ item.completed && !item.overrideUpload ? "픽업완료" : item.completed && item.overrideUpload ? "수정하기" : "픽업완료" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <!-- 사진 업로드 경고 모달 -->
  <div v-if="showImageRequiredModal" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" @click="showImageRequiredModal = false">
    <div class="bg-white w-[300px] rounded-[10px] shadow-lg p-6 text-center" @click.stop>
      <p class="text-[#111] text-base font-semibold mb-4">사진을 업로드해주세요</p>
      <button @click="showImageRequiredModal = false" class="px-4 py-2 bg-[#FF6F00] text-white rounded-[10px] font-semibold text-sm">확인</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import BottomNavBar from "@/components/BottomNavBar.vue";
import { totalMonthlyPay } from "@/stores/usePayStore";

onMounted(() => {
  if (typeof window === "undefined") return;

  if (!window.kakao || !window.kakao.maps) {
    const script = document.createElement("script");
    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);
  } else {
    window.kakao.maps.load(() => {
      initMap();
    });
  }
});
// 탭
const activeTab = ref("home");
// 오늘 날짜
const today = new Date();
const days = ["일", "월", "화", "수", "목", "금", "토"];
const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} (${days[today.getDay()]})`;
// 알림 페이지 연결
const router = useRouter();
// 선택된 장소 정보
const selectedPlace = ref(null);
// 모달 열림상태
const modalOpen = ref(false);
// 숨겨진 input 요소
const imageInput = reactive({});
// 이미지 1장만 저장
const uploadedImages = ref({});
// 이미지 재업로드 시
const overrideUpload = ref(false);
// 지도 / 리스트 전환
const listViewMode = ref(false);
// 셀렉트 박스 필터링
const selectedArea = ref("전체 지역");
const selectedStatus = ref("전체 상태");
// 필터링된 값과 진행갯수 및 게이지바 연동
const totalFiltered = computed(() => filteredMarkerData.value.length);
const completedFiltered = computed(() => filteredMarkerData.value.filter((item) => item.completed).length);
const remainingFiltered = computed(() => totalFiltered.value - completedFiltered.value);
const progressRate = computed(() => {
  return totalFiltered.value > 0 ? Math.round((completedFiltered.value / totalFiltered.value) * 100) : 0;
});
// 사진 없이 픽업완료 버튼 클릭 시 경고 모달창
const showImageRequiredModal = ref(false);

// 지도 및 마커 상태
let map = null;
let markers = [];

// 마커 더미데이터 목록
const markerData = ref([
  {
    lat: 35.855871,
    lng: 128.629024,
    title: "범어동 더샵아파트 104동 502호",
    reservationId: "1",
    address: "대구광역시 수성구 범어동 무학로 12길 3\n더샵아파트 104동 502호",
    name: "홍길동",
    phone: "010-1234-5678",
    notes: "",
    clothes: "M - 1개\nL - 1개",
    image: "marker1.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.853131,
    lng: 128.637148,
    title: "만촌동 아이파크 202동 1704호",
    reservationId: "2",
    address: "대구광역시 수성구 만촌동 무열로 52\n아이파크 202동 1704호",
    name: "이영희",
    phone: "010-2345-6789",
    notes: "",
    clothes: "S - 2개",
    image: "marker2.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.842402,
    lng: 128.638988,
    title: "지산동 동서빌라 101동 303호",
    reservationId: "3",
    address: "대구광역시 수성구 지산동 용학로 35\n동서빌라 101동 303호",
    name: "박철수",
    phone: "010-3456-7890",
    notes: "관리실에 둘게요",
    clothes: "M - 1개\nXL - 2개",
    image: "marker3.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.838892,
    lng: 128.640501,
    title: "수성동1가 한양타운 2동 405호",
    reservationId: "4",
    address: "대구광역시 수성구 수성동1가 들안로 154\n한양타운 2동 405호",
    name: "김민지",
    phone: "010-4567-8901",
    notes: "",
    clothes: "L - 1개\nS - 1개",
    image: "marker4.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.846175,
    lng: 128.646444,
    title: "두산동 효성타운 302동 803호",
    reservationId: "5",
    address: "대구광역시 수성구 두산동 상화로 76\n효성타운 302동 803호",
    name: "최지훈",
    phone: "010-5678-9012",
    notes: "CU 편의점에 둘게요",
    clothes: "M - 1개\nM - 1개",
    image: "marker5.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.858293,
    lng: 128.644984,
    title: "황금동 동아아파트 6동 906호",
    reservationId: "6",
    address: "대구광역시 수성구 황금동 황금로 85\n동아아파트 6동 906호",
    name: "정유진",
    phone: "010-6789-0123",
    notes: "",
    clothes: "S - 1개\nL - 2개",
    image: "marker6.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.847465,
    lng: 128.621293,
    title: "범물동 범물LH 101동 504호",
    reservationId: "7",
    address: "대구광역시 수성구 범물동 범안로 84\n범물LH 101동 504호",
    name: "장도현",
    phone: "010-7890-1234",
    notes: "",
    clothes: "XL - 1개",
    image: "marker7.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.845176,
    lng: 128.629401,
    title: "파동 벽산블루밍 3단지 302동 802호",
    reservationId: "8",
    address: "대구광역시 수성구 파동 파동로 128\n벽산블루밍 3단지 302동 802호",
    name: "서지수",
    phone: "010-8901-2345",
    notes: "경비실에 맡겨두겠습니다.",
    clothes: "S - 2개\nM - 1개",
    image: "marker8.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.861079,
    lng: 128.619251,
    title: "고산1동 대우푸르지오 110동 1001호",
    reservationId: "9",
    address: "대구광역시 수성구 고산1동 무학로 110\n대우푸르지오 110동 1001호",
    name: "한상우",
    phone: "010-9012-3456",
    notes: "",
    clothes: "L - 1개\nM - 1개",
    image: "marker9-1.png",
    previewImage: "/images/hong/default-photo-1.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.865111,
    lng: 128.627395,
    title: "수성동4가 금호타운 102동 506호",
    reservationId: "10",
    address: "대구광역시 수성구 수성동4가 달구벌대로 2572\n금호타운 102동 506호",
    name: "이소영",
    phone: "010-1122-3344",
    notes: "",
    clothes: "S - 1개\nS - 1개",
    image: "marker10-1.png",
    previewImage: "/images/hong/default-photo-2.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.8589,
    lng: 128.5947,
    title: "대봉동 화성오피스텔 702호",
    reservationId: "11",
    address: "대구광역시 중구 대봉동 29-16\n화성오피스텔 702호",
    name: "조윤아",
    phone: "010-7777-8888",
    notes: "공동현관 비밀번호는 1234예요.",
    clothes: "M - 2개\nL - 1개",
    image: "marker11.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.86763,
    lng: 128.582053,
    title: "대신동 오피스 8층 905호",
    reservationId: "12",
    address: "대구광역시 중구 대신동\n오피스 8층 905호",
    name: "이수진",
    phone: "010-2296-4213",
    notes: "",
    clothes: "L - 2개",
    image: "marker12.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.870602,
    lng: 128.605756,
    title: "동인동 다세대주택 12층 846호",
    reservationId: "13",
    address: "대구광역시 중구 동인동\n다세대주택 12층 846호",
    name: "박정훈",
    phone: "010-3906-5000",
    notes: "",
    clothes: "S - 3개",
    image: "marker13-1.png",
    previewImage: "/images/hong/default-photo-4.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.866615,
    lng: 128.605381,
    title: "삼덕동 오피스 4층 1905호",
    reservationId: "14",
    address: "대구광역시 중구 삼덕동\n오피스 4층 1905호",
    name: "최영희",
    phone: "010-9125-6051",
    notes: "",
    clothes: "XL - 1개",
    image: "marker14-1.png",
    previewImage: "/images/hong/default-photo-5.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.859082,
    lng: 128.588085,
    title: "공평동 빌라 4층 1440호",
    reservationId: "15",
    address: "대구광역시 중구 공평동\n빌라 4층 1440호",
    name: "정민재",
    phone: "010-9674-6128",
    notes: "엘리베이터 없어요. 죄송합니다.",
    clothes: "M - 1개",
    image: "marker15.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.87037,
    lng: 128.603334,
    title: "봉산동 아파트 1층 140호",
    reservationId: "16",
    address: "대구광역시 중구 봉산동\n아파트 1층 140호",
    name: "한지훈",
    phone: "010-8982-2265",
    notes: "택배함에 두겠습니다.",
    clothes: "XL - 1개",
    image: "marker16-1.png",
    previewImage: "/images/hong/default-photo-6.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.861556,
    lng: 128.612468,
    title: "대봉동 빌라 12층 1662호",
    reservationId: "17",
    address: "대구광역시 중구 대봉동\n빌라 12층 1662호",
    name: "양혜림",
    phone: "010-6595-9896",
    notes: "",
    clothes: "XL - 1개",
    image: "marker17-1.png",
    previewImage: "/images/hong/default-photo-7.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.872836,
    lng: 128.595713,
    title: "계산동 주택 5층 995호",
    reservationId: "18",
    address: "대구광역시 중구 계산동\n주택 5층 995호",
    name: "배윤성",
    phone: "010-5530-7426",
    notes: "문 앞에 두겠습니다.",
    clothes: "XL - 1개",
    image: "marker18-1.png",
    previewImage: "/images/hong/default-photo-3.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.872155,
    lng: 128.588931,
    title: "문화동 빌라 2층 1698호",
    reservationId: "19",
    address: "대구광역시 중구 문화동\n빌라 2층 1698호",
    name: "문지후",
    phone: "010-6462-5087",
    notes: "",
    clothes: "S - 3개",
    image: "marker19.png",
    uploadedImages: null,
    overrideUpload: false,
  },
  {
    lat: 35.8613,
    lng: 128.5785,
    title: "서성로 아파트 7층 352호",
    reservationId: "20",
    address: "대구광역시 중구 서성로\n아파트 7층 352호",
    name: "서유림",
    phone: "010-4423-6808",
    notes: "",
    clothes: "L - 2개",
    image: "marker20.png",
    uploadedImages: null,
    overrideUpload: false,
  },
]);

// 마커 생성
const createMarker = (place) => {
  if (typeof kakao === "undefined" || !kakao.maps) return;
  const position = new kakao.maps.LatLng(place.lat, place.lng);
  const marker = new kakao.maps.Marker({
    position,
    title: place.title,
    image: new kakao.maps.MarkerImage(`/images/hong/${place.image}`, new kakao.maps.Size(44, 51)),
  });
  kakao.maps.event.addListener(marker, "click", () => {
    // 이미 열린 모달이 있고, 같은 마커를 다시 클릭한 경우 → 닫기
    if (modalOpen.value && selectedPlace.value?.reservationId === place.reservationId) {
      modalOpen.value = false;
      return;
    }

    // 새로운 마커 클릭 → 정보 갱신 및 모달 열기
    selectedPlace.value = {
      ...place,
      completed: place.image.includes("-1.png"),
      overrideUpload: place.overrideUpload ?? false,
      uploadedImages: place.uploadedImages ?? "",
    };
    // reservationId에 해당하는 이미지만 불러오기
    const image = uploadedImages.value["" + place.reservationId] || place.previewImage || null;
    uploadedImages.value[place.reservationId] = image;

    // uploadedImages[place.reservationId] = image;
    uploadedImages.value[reservationId] = image;

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

// 지도 모달 함수 / 픽업 완료시 마커 이미지 변경
function handlePickupComplete() {
  // 사진 업로드 안 되어 있으면 경고 모달 띄우기
  const id = selectedPlace.value?.reservationId;
  const hasImage = uploadedImages.value[id] || selectedPlace.value?.previewImage;

  if (!hasImage) {
    showImageRequiredModal.value = true;
    return;
  }

  if (selectedPlace.value?.completed && !overrideUpload.value) return;

  const index = markerData.value.findIndex((item) => item.reservationId === id);
  if (index !== -1) {
    const original = markerData.value[index].image;
    const updated = original.includes("-1.png") ? original : original.replace(".png", "-1.png");
    markerData.value[index].image = updated;
    markerData.value[index].completed = true;
    markerData.value[index].uploadedImages = uploadedImages.value[id];

    overrideUpload.value = false;
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
// 리스트 진입 시 9,10,13,14,16,17,18번은 완료 상태로 초기화
onMounted(() => {
  ["9", "10", "13", "14", "16", "17", "18"].forEach((id) => {
    const target = markerData.value.find((item) => item.reservationId === id);
    if (target) {
      target.completed = true;
      target.overrideUpload = false;
      target.uploadedImages = target.previewImage || "/images/hong/default-photo-1.png";
      uploadedImages.value[id] = target.uploadedImages;
    }
  });

  // 지도 초기화
  if (activeTab.value === "todayWork") {
    handleTabChangeToTodayWork();
  }

  window.addEventListener("resize", resizeMapHeight);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeMapHeight); // 컴포넌트 언마운트 시 이벤트 제거
});

// watch: 탭 전환 감지
watch(activeTab, (newValue) => {
  modalOpen.value = false;

  if (newValue === "todayWork") {
    // 리스트 진입 시 초기화하지 말고 유지
    handleTabChangeToTodayWork();
  } else {
    uploadedImages.value = Object.fromEntries(
      Object.entries(uploadedImages.value).filter(
        ([key]) => ["9", "10", "13", "14", "16", "17", "18"].includes(key) // 마커 9,10,13,14,16,17,18은 초기화에서 제외
      )
    );
  }
});

// 이미지 업로드
function triggerFileInput(reservationId) {
  nextTick(() => {
    const inputRef = imageInput[reservationId];
    if (inputRef) inputRef.click();
  });
}

function handleImageUpload(event, reservationId) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const uploadedSrc = e.target.result;
    uploadedImages.value[reservationId] = uploadedSrc;

    const target = markerData.value.find((item) => item.reservationId === reservationId);
    if (target) {
      // 최초 업로드일 경우 → 픽업 완료 처리
      if (!target.completed) {
        target.completed = true;
        target.overrideUpload = false;
      }
      // 재업로드일 경우 → 수정하기 버튼으로 변경
      else {
        target.overrideUpload = true;
      }

      target.uploadedImages = uploadedSrc;

      // 만약 selectedPlace가 현재 해당 마커라면 그것도 업데이트
      if (selectedPlace && selectedPlace.reservationId === reservationId) {
        selectedPlace.completed = target.completed;
        selectedPlace.overrideUpload = target.overrideUpload;
        selectedPlace.uploadedImages = target.uploadedImages;
      }
    }
  };
  reader.readAsDataURL(file);
}

// 리스트 완료 비활성화 코드
function handlePickupCompleteFromList(item) {
  // 이미지가 없으면 버튼 막고 경고 모달 띄우기
  if (!uploadedImages.value[item.reservationId] && !item.previewImage) {
    showImageRequiredModal.value = true;
    return;
  }

  if (item.completed && !item.overrideUpload) return;

  const index = markerData.value.findIndex((i) => i.reservationId === item.reservationId);
  if (index !== -1) {
    const original = markerData.value[index].image;
    const updated = original.includes("-1.png") ? original : original.replace(".png", "-1.png");

    markerData.value[index] = {
      ...markerData.value[index],
      image: updated,
      completed: true,
      overrideUpload: false,
      uploadedImages: uploadedImages.value[item.reservationId],
    };

    clearMarkers();
    markerData.value.forEach(createMarker);
  }
}

// 내 위치 마커 생성 함수
function addCurrentLocationMarker() {
  const latitude = 35.8675;
  const longitude = 128.5936;

  const locPosition = new kakao.maps.LatLng(latitude, longitude);
  const marker = new kakao.maps.Marker({
    position: locPosition,
    image: new kakao.maps.MarkerImage(
      "/images/hong/mylocationImg.png", // 너가 쓰던 트럭+세모 마커 이미지
      new kakao.maps.Size(70, 90)
    ),
    title: "내 위치 (설정된)",
  });

  marker.setMap(map);

  // 지도 중심 이동
  map.setCenter(locPosition);
}

// 지도 보기로 되돌아가기
function switchToMapView() {
  listViewMode.value = false;
  nextTick(() => {
    initMap(); // 지도 다시 초기화
  });
}

// 셀렉트 박스 필터링
const filteredMarkerData = computed(() => {
  return markerData.value.filter((item) => {
    const areaMatch = selectedArea.value === "전체 지역" || item.address.includes(selectedArea.value);

    const statusMatch = selectedStatus.value === "전체 상태" || (selectedStatus.value === "픽업 대기" && !item.completed) || (selectedStatus.value === "픽업 완료" && item.completed);

    return areaMatch && statusMatch;
  });
});

// 리스트로 보기 버튼
</script>
<style scoped>
/* marker 숨김용 */
.markerimages {
  display: none;
}
@media screen and (max-width: 390px) {
  .home-wrap,
  .todayWorkListWrap,
  .todayWorkMapWrap,
  .list-view-wrap {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* 전체적인 텍스트 크기 조정 */
  .text-4xl {
    font-size: 1.5rem !important;
  }
  .text-3xl {
    font-size: 1.25rem !important;
  }
  .text-2xl {
    font-size: 1.125rem !important;
  }
  .text-xl {
    font-size: 1rem !important;
  }
  .text-lg {
    font-size: 0.95rem !important;
  }

  /* 탭 폰트 줄이기 */
  .tab-text {
    font-size: 18px !important;
  }

  /* 배너 영역 높이 줄이기 */
  .home-wrap .h-80 {
    height: auto !important;
  }
  /* 배너 갭 주기 */
  .banner {
    gap: 5px !important;
  }

  /* 날짜, 날씨 라인 */
  .date-line {
    margin-bottom: 8px !important;
  }

  /* 게이지 바 너비 줄이기 */
  .gauge-bar {
    max-width: 240px;
  }

  /* 카드 영역 내부 여백 줄이기 */
  .home-wrap .p-6 {
    padding: 1rem !important;
  }

  /* 건수 박스 3개 → 세로 배치 */
  .summary-cards {
    flex-direction: column !important;
    height: auto !important;
    gap: 1rem;
    padding: 0;
  }
  .summary-card {
    width: 100%;
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  .summary-count-text {
    flex-direction: row !important;
    align-items: center;
    gap: 0.25rem;
  }
  .total-incentive {
    font-size: 36px;
  }

  /* 공지사항 글자 줄이기 */
  .notice-text {
    font-size: 14px !important;
  }

  /* 이달의 안전 카드 이미지 full */
  .home-wrap img.w-full {
    width: 100% !important;
    height: auto !important;
  }

  /* 지도 모달 너비 제한 */
  .todayWorkMapWrap .w-\[768px\] {
    width: 95% !important;
    max-width: 360px;
  }

  /* 리스트 아이템 줄이기 */
  .todayWorkListWrap .flex.items-center.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .todayWorkListWrap .text-base {
    font-size: 0.875rem !important;
  }
  .todayWorkListWrap .w-16 {
    width: 64px !important;
    height: 64px !important;
  }
  .todayWorkListWrap .max-w-\[500px\] {
    max-width: 100% !important;
  }
  .todayWorkListWrap .px-8 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  /* 버튼 너비 대응 */
  .list-view-btn img {
    width: 48px !important;
    height: 48px !important;
  }
}
</style>
