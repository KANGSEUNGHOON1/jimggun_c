<template>
  <h2 class="my-[30px] mx-[32px] font-bold font-[16px]">기사관리</h2>
  <div
    class="w-[full] max-w-[1700px] mx-[32px] pb-[16px] bg-white rounded-[10px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]"
  >
    <!-- 헤더 -->
    <div class="flex justify-between items-center p-[20px]">
      <h2 class="font-bold text-[16px] leading-[40px]">기사목록</h2>
      <div class="flex gap-2">
        <div class="relative w-[240px] h-9">
          <!-- 검색 아이콘 이미지 -->
          <img
            src="/images/kang/search.png"
            alt="검색"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />

          <!-- 입력창 -->
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="기사명으로 검색하세요"
            class="w-full h-full pl-8 rounded-[10px] border-[1px] border-zinc-300 px-2 text-sm"
          />
        </div>
        <!-- 직급 콤보박스 -->
        <select
          v-model="selectedRank"
          class="text-gray w-32 h-9 rounded-[10px] border-[1px] border-zinc-300 px-2 text-sm"
        >
          <option value="">전체 직급</option>
          <option value="기사">기사</option>
          <option value="팀장">팀장</option>
        </select>

        <!-- 배정 지역 콤보박스 -->
        <select
          v-model="selectedRegion"
          class="text-gray w-32 h-9 rounded-[10px] border-[1px] border-zinc-300 px-2 text-sm"
        >
          <option value="">전체 배정 지역</option>
          <option value="중구">중구</option>
          <option value="남구">남구</option>
          <option value="북구">북구</option>
          <option value="서구">동구</option>
          <option value="서구">서구</option>
          <option value="달서구">달서구</option>
          <option value="수성구">수성구</option>
          <option value="달성군">달성군</option>
        </select>
      </div>
    </div>

    <!-- 테이블 -->
    <div>
      <table class="w-full text-sm text-center">
        <colgroup>
          <col style="width: 50px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 200px" />
          <col style="width: 300px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
        </colgroup>
        <thead class="bg-[#F9FAFB] text-[#767676] font-semibold h-12 border-b border-[#E5E5EC]">
          <tr>
            <th class="rounded-tl-[10px]">
              <input v-if="isEditMode" type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" />
            </th>
            <th class="cursor-pointer" @click="setSortKey('workerName')">기사명</th>
            <th class="cursor-pointer" @click="setSortKey('workerId')">기사 ID</th>
            <th>연락처</th>
            <th class="cursor-pointer" @click="setSortKey('workerAddress')">주소</th>
            <th class="cursor-pointer" @click="setSortKey('joinDate')">입사일자</th>
            <th class="cursor-pointer" @click="setSortKey('status')">업무분류</th>
            <th class="cursor-pointer" @click="setSortKey('rank')">직급</th>
            <th class="cursor-pointer" @click="setSortKey('region')">배정지역</th>
            <th class="rounded-tr-[10px]">액션</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="driver in paginatedDrivers"
            :key="driver.workerId"
            class="h-14 border-b bg-white border-[#E5E5EC] text-[#111]"
          >
            <td class="text-center">
              <input v-if="isEditMode" type="checkbox" :value="driver.workerId" v-model="selectedDrivers" />
            </td>
            <td>{{ driver.workerName }}</td>
            <td>{{ driver.workerId }}</td>
            <td>{{ driver.workerPhone }}</td>
            <td>{{ driver.workerAddress }} <br />{{ driver.workerAddressDetail }}</td>
            <td>{{ driver.joinDate }}</td>
            <td>{{ driver.status }}</td>
            <td>{{ driver.rank }}</td>
            <td>{{ driver.region }}</td>
            <td>
              <button @click="openDetail(driver)">상세</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 영역 -->
      <div class="flex justify-center items-center mt-4">
        <div class="flex gap-2">
          <!-- 이전 버튼 -->
          <button
            @click="setPage(currentPage - 1)"
            class="px-2 py-1 border rounded-[10px] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
          >
            &lt;
          </button>

          <!-- 페이지 번호들 -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="setPage(page)"
            class="w-10"
            :class="['px-3 py-1 text-[14px]', currentPage === page ? 'bg-gray-200 text-white rounded-[5px]' : '']"
          >
            {{ page }}
          </button>

          <!-- 다음 버튼 -->
          <button
            @click="setPage(currentPage + 1)"
            class="px-2 py-1 border rounded-[10px] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 버튼 영역 -->
  <div class="w-full flex justify-end mt-6 mb-10 pr-[30px]">
    <div class="flex gap-4">
      <button
        v-if="!isEditMode"
        class="w-36 h-12 bg-[#767676] hover:bg-[#5a5a5a] rounded-[10px] text-white text-base font-medium"
        @click="isModalOpen = true"
      >
        신규기사추가
      </button>

      <button
        v-if="!isEditMode"
        class="w-36 h-12 bg-[#767676] hover:bg-[#5a5a5a] rounded-[10px] text-white text-base font-medium"
        @click="isEditMode = true"
      >
        기사목록삭제
      </button>

      <!-- 수정 모드일 때 -->
      <template v-else>
        <button
          class="w-36 h-12 bg-[#767676] hover:bg-[#5a5a5a] text-white rounded-[10px] text-base font-medium"
          @click="deleteSelectedDrivers"
        >
          삭제
        </button>
        <button
          class="w-36 h-12 bg-[#767676] hover:bg-[#5a5a5a] text-white rounded-[10px] text-base font-medium"
          @click="saveChanges"
        >
          저장
        </button>
        <button
          class="w-36 h-12 bg-white border hover:bg-[#f3f4f6] text-[#111] rounded-[10px] text-base font-medium"
          @click="cancelEdit"
        >
          취소
        </button>
      </template>
    </div>
  </div>
  <!-- 기사 등록 모달 -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    @click="isModalOpen = false"
  >
    <div class="bg-white rounded-[10px] shadow-lg px-10 py-8" @click.stop>
      <h2 class="text-xl font-bold px-[30px] py-[30px] border-b border-[#E5E5EC]">신규 기사 추가</h2>
      <div class="flex gap-10 px-[30px] pt-[30px] pb-[20px]">
        <!-- 왼쪽 사진 업로드 영역 -->
        <div class="flex justify-center">
          <div class="w-32 h-32 relative cursor-pointer" @click="triggerFileInput">
            <!-- 업로드 안 된 상태 -->
            <template v-if="!newDriver.photo">
              <div
                class="w-32 h-32 border-[2px] border-dashed border-[#E5E5EC] rounded-[10px] flex items-center justify-center cursor-pointer"
              >
                <span class="text-[#E5E5EC] text-3xl font-medium leading-none translate-y-[-2px]">+</span>
              </div>
            </template>

            <!-- 미리보기 -->
            <template v-else>
              <img :src="newDriver.photo" class="w-32 h-32 object-cover rounded-[10px]" />
            </template>

            <!-- 숨겨진 input[type="file"] -->
            <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="onImageUpload" />
          </div>
        </div>
        <!--오른쪽 영역-->
        <div class="flex-1 grid grid-cols-1 gap-2">
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">이름</span
            ><input
              v-model="newDriver.workerName"
              type="text"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">기사 ID</span
            ><input
              v-model="newDriver.workerId"
              type="text"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            />
          </div>

          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">연락처</span
            ><input
              v-model="newDriver.workerPhone"
              type="text"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">주소</span
            ><input
              v-model="newDriver.workerAddress"
              type="text"
              @click="handleAddressSearch"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">상세주소</span
            ><input
              v-model="newDriver.workerAddressDetail"
              type="text"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">입사일자</span
            ><input
              v-model="newDriver.joinDate"
              type="date"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2 pr-2"
            />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">업무분류</span
            ><select
              v-model="newDriver.status"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            >
              <option value="픽업">픽업</option>
              <option value="배송">배송</option>
            </select>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">직급</span
            ><select
              v-model="newDriver.rank"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            >
              <option value="기사">기사</option>
              <option value="팀장">팀장</option>
            </select>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-24 text-[16px] text-[#505050]">배정지역</span
            ><select
              v-model="newDriver.region"
              class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
            >
              <option value="중구">중구</option>
              <option value="남구">남구</option>
              <option value="북구">북구</option>
              <option value="서구">동구</option>
              <option value="서구">서구</option>
              <option value="달서구">달서구</option>
              <option value="수성구">수성구</option>
              <option value="달성군">달성군</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 하단 버튼 영역  -->
      <div class="flex justify-end gap-2 px-[30px] py-[30px]">
        <button class="px-4 py-2 rounded-[10px] bg-[#767676] hover:bg-[#5a5a5a] text-white" @click="addNewDriver">
          신규등록
        </button>
        <button class="px-6 py-2 rounded-[10px] bg-white hover:bg-[#f3f4f6] border" @click="isModalOpen = false">
          취소
        </button>
      </div>
    </div>
  </div>

  <!-- 기사 상세 정보 모달 -->
  <div
    v-if="isDetailModalOpen"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    @click="isDetailModalOpen = false"
  >
    <div class="bg-white rounded-[10px] shadow-lg px-10 py-8" @click.stop>
      <h2 class="text-xl font-bold px-[25px] py-[25px] border-b border-[#E5E5EC]">기사 상세 정보</h2>
      <div class="flex gap-10 gap-2 px-[30px] pt-[30px] pb-[20px]">
        <!-- 왼쪽 영역-->
        <div class="flex justify-center">
          <div class="w-32 h-32 relative cursor-pointer">
            <img
              :src="selectedDriver.photo"
              class="w-32 h-32 object-cover rounded-[10px]"
              v-if="selectedDriver.photo"
            />
          </div>
        </div>
        <!-- 오른쪽 영역-->
        <div class="flex-1 grid grid-cols-1 gap-2 px-10">
          <!-- ID -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">ID :</span>
            <template v-if="isDetailEditMode">
              <input
                type="text"
                v-model="selectedDriver.workerId"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              />
            </template>
            <template v-else>
              <span>{{ selectedDriver.workerId }}</span>
            </template>
          </div>
          <!-- 이름 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">이름 :</span>
            <template v-if="isDetailEditMode">
              <input
                type="text"
                v-model="selectedDriver.workerName"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              />
            </template>
            <template v-else>
              <span>{{ selectedDriver.workerName }}</span>
            </template>
          </div>
          <!-- 전화번호 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">전화번호 :</span>
            <template v-if="isDetailEditMode">
              <input
                type="text"
                v-model="selectedDriver.workerPhone"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              />
            </template>
            <template v-else>
              <span>{{ selectedDriver.workerPhone }}</span>
            </template>
          </div>
          <!-- 주소 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">주소 :</span>
            <template v-if="isDetailEditMode">
              <input
                type="text"
                v-model="selectedDriver.workerAddress"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              />
            </template>
            <template v-else>
              <span>{{ selectedDriver.workerAddress }}</span>
            </template>
          </div>
          <!-- 상세 주소 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">상세주소 :</span>
            <template v-if="isDetailEditMode">
              <input
                type="text"
                v-model="selectedDriver.workerAddressDetail"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              />
            </template>
            <template v-else>
              <span>{{ selectedDriver.workerAddressDetail }}</span>
            </template>
          </div>
          <!-- 입사일자 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">입사일자 :</span>
            <template v-if="isDetailEditMode">
              <input
                type="date"
                v-model="selectedDriver.joinDate"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2 pr-2"
              />
            </template>
            <template v-else>
              <span>{{ selectedDriver.joinDate }}</span>
            </template>
          </div>
          <!-- 직급 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">직급 :</span>
            <template v-if="isDetailEditMode">
              <select
                v-model="selectedDriver.rank"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              >
                <option value="팀장">팀장</option>
                <option value="기사">기사</option>
              </select>
            </template>
            <template v-else>
              <span>{{ selectedDriver.rank }}</span>
            </template>
          </div>
          <!-- 지역 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">배정지역 :</span>
            <template v-if="isDetailEditMode">
              <select
                v-model="selectedDriver.region"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              >
                <option value="중구">중구</option>
                <option value="남구">남구</option>
                <option value="북구">북구</option>
                <option value="서구">동구</option>
                <option value="서구">서구</option>
                <option value="달서구">달서구</option>
                <option value="수성구">수성구</option>
                <option value="달성군">달성군</option>
              </select>
            </template>
            <template v-else>
              <span>{{ selectedDriver.region }}</span>
            </template>
          </div>
          <!-- 업무분류 -->
          <div class="flex items-center mb-2">
            <span class="w-24 font-semibold">업무분류 :</span>
            <template v-if="isDetailEditMode">
              <select
                v-model="selectedDriver.status"
                class="input border border-[#E5E5EC] w-[250px] h-[40px] rounded-[10px] pl-2"
              >
                <option value="픽업">픽업</option>
                <option value="배송">배송</option>
              </select>
            </template>
            <template v-else>
              <span>{{ selectedDriver.status }}</span>
            </template>
          </div>
        </div>
      </div>
      <!-- 메모 -->
      <div class="mt-4">
        <label class="font-semibold block mb-1">Memo</label>
        <template v-if="isDetailEditMode">
          <textarea
            v-model="selectedDriver.memo"
            rows="3"
            class="w-full border border-zinc-300 rounded-[10px] p-2 text-sm resize-none"
            placeholder="기사에 대한 메모를 입력하세요"
          ></textarea>
        </template>
        <template v-else>
          <div class="min-h-[72px] border border-zinc-200 rounded-[10px] p-2 text-sm bg-gray-50 whitespace-pre-wrap">
            {{ selectedDriver.memo || '메모가 없습니다.' }}
          </div>
        </template>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <template v-if="isDetailEditMode">
          <button
            class="px-4 py-2 bg-[#767676] hover:bg-[#5a5a5a] rounded-[10px] text-white"
            @click="saveDetailChanges"
          >
            저장
          </button>
          <button class="px-4 py-2 bg-white hover:bg-[#f3f4f6] rounded-[10px] border" @click="cancelDetailEdit">
            취소
          </button>
        </template>
        <template v-else>
          <button
            class="px-4 py-2 bg-[#767676] hover:bg-[#5a5a5a] rounded-[10px] text-white"
            @click="isDetailEditMode = true"
          >
            수정
          </button>
          <button
            class="px-4 py-2 bg-white hover:bg-[#f3f4f6] rounded-[10px] border"
            @click="isDetailModalOpen = false"
          >
            닫기
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const isEditMode = ref(false);
const selectedDrivers = ref([]);

// 더미데이터

const drivers = ref([
  {
    workerId: 'jg001',
    workerName: '김민수',
    workerPhone: '010-1234-5678',
    workerAddress: '대구 북구 대학로 80',
    workerAddressDetail: '101동 202호',
    joinDate: '2021년 4월 17일',
    status: '픽업',
    rank: '기사',
    region: '북구',
    action: '상세',
  },
  {
    workerId: 'jg002',
    workerName: '이준석',
    workerPhone: '010-2345-6789',
    workerAddress: '대구 달서구 월배로 240',
    workerAddressDetail: '103동 805호',
    joinDate: '2023년 8월 5일',
    status: '픽업',
    rank: '팀장',
    region: '달서구',
    action: '상세',
  },
  {
    workerId: 'jg003',
    workerName: '이영호',
    workerPhone: '010-3456-7890',
    workerAddress: '대구 중구 중앙대로 273',
    workerAddressDetail: '302동 401호',
    joinDate: '2020년 1월 22일',
    status: '픽업',
    rank: '기사',
    region: '중구',
    action: '상세',
  },
  {
    workerId: 'jg004',
    workerName: '김문수',
    workerPhone: '010-4567-8901',
    workerAddress: '대구 수성구 들안로 123',
    workerAddressDetail: '203동 301호',
    joinDate: '2022년 11월 13일',
    status: '픽업',
    rank: '기사',
    region: '수성구',
    action: '상세',
  },
  {
    workerId: 'jg005',
    workerName: '정우진',
    workerPhone: '010-5678-9012',
    workerAddress: '대구 동구 안심로 42',
    workerAddressDetail: '401동 101호',
    joinDate: '2024년 2월 3일',
    status: '픽업',
    rank: '기사',
    region: '동구',
    action: '상세',
  },
  {
    workerId: 'jg006',
    workerName: '한지민',
    workerPhone: '010-6789-0123',
    workerAddress: '대구 서구 평리로 201',
    workerAddressDetail: '202동 1203호',
    joinDate: '2020년 6월 25일',
    status: '픽업',
    rank: '기사',
    region: '서구',
    action: '상세',
  },
  {
    workerId: 'jg007',
    workerName: '신동엽',
    workerPhone: '010-7890-1234',
    workerAddress: '대구 남구 이천로 51',
    workerAddressDetail: '303동 902호',
    joinDate: '2021년 9월 9일',
    status: '픽업',
    rank: '기사',
    region: '남구',
    action: '상세',
  },
  {
    workerId: 'jg008',
    workerName: '오세훈',
    workerPhone: '010-8901-2345',
    workerAddress: '대구 북구 태전로 15',
    workerAddressDetail: '104동 504호',
    joinDate: '2023년 3월 12일',
    status: '픽업',
    rank: '팀장',
    region: '북구',
    action: '상세',
  },
  {
    workerId: 'jg009',
    workerName: '홍준표',
    workerPhone: '010-9012-3456',
    workerAddress: '대구 달성군 화원로 101',
    workerAddressDetail: '101동 1702호',
    joinDate: '2022년 7월 30일',
    status: '픽업',
    rank: '팀장',
    region: '달성군',
    action: '상세',
  },
  {
    workerId: 'jg010',
    workerName: '문성우',
    workerPhone: '010-1122-3344',
    workerAddress: '대구 중구 남성로 45',
    workerAddressDetail: '201동 303호',
    joinDate: '2020년 12월 18일',
    status: '픽업',
    rank: '기사',
    region: '중구',
    action: '상세',
  },
  {
    workerId: 'jg011',
    workerName: '서지훈',
    workerPhone: '010-2233-4455',
    workerAddress: '대구 수성구 상록로 32',
    workerAddressDetail: '1205호',
    joinDate: '2023년 4월 6일',
    status: '픽업',
    rank: '기사',
    region: '수성구',
    action: '상세',
  },
  {
    workerId: 'jg012',
    workerName: '류지은',
    workerPhone: '010-3344-5566',
    workerAddress: '대구 동구 율하동로 74',
    workerAddressDetail: '203동 703호',
    joinDate: '2021년 10월 15일',
    status: '배송',
    rank: '기사',
    region: '동구',
    action: '상세',
  },
  {
    workerId: 'jg013',
    workerName: '노지석',
    workerPhone: '010-4455-6677',
    workerAddress: '대구 중구 동덕로 88',
    workerAddressDetail: '302동 1004호',
    joinDate: '2020년 5월 21일',
    status: '픽업',
    rank: '기사',
    region: '중구',
    action: '상세',
  },
  {
    workerId: 'jg014',
    workerName: '임은지',
    workerPhone: '010-5566-7788',
    workerAddress: '대구 북구 학정로 57',
    workerAddressDetail: '501동 204호',
    joinDate: '2022년 11월 3일',
    status: '픽업',
    rank: '기사',
    region: '북구',
    action: '상세',
  },
  {
    workerId: 'jg015',
    workerName: '강지훈',
    workerPhone: '010-6677-8899',
    workerAddress: '대구 달서구 성서로 231',
    workerAddressDetail: '601동 906호',
    joinDate: '2024년 1월 10일',
    status: '픽업',
    rank: '기사',
    region: '달서구',
    action: '상세',
  },
  {
    workerId: 'jg016',
    workerName: '윤석열',
    workerPhone: '010-7788-9900',
    workerAddress: '대구 남구 이천로 123',
    workerAddressDetail: '301동 303호',
    joinDate: '2021년 6월 8일',
    status: '픽업',
    rank: '기사',
    region: '남구',
    action: '상세',
  },
  {
    workerId: 'jg017',
    workerName: '윤승우',
    workerPhone: '010-8899-0011',
    workerAddress: '대구 달성군 유가읍 테크노대로 5',
    workerAddressDetail: '101동 1801호',
    joinDate: '2020년 8월 30일',
    status: '픽업',
    rank: '기사',
    region: '달성군',
    action: '상세',
  },
  {
    workerId: 'jg018',
    workerName: '장서연',
    workerPhone: '010-9900-1122',
    workerAddress: '대구 북구 복현로 7',
    workerAddressDetail: '204동 704호',
    joinDate: '2022년 2월 14일',
    status: '픽업',
    rank: '기사',
    region: '북구',
    action: '상세',
  },
  {
    workerId: 'jg019',
    workerName: '조민혁',
    workerPhone: '010-1020-3040',
    workerAddress: '대구 서구 문화로 55',
    workerAddressDetail: '102동 202호',
    joinDate: '2023년 9월 25일',
    status: '픽업',
    rank: '기사',
    region: '서구',
    action: '상세',
  },
  {
    workerId: 'jg020',
    workerName: '유다연',
    workerPhone: '010-1122-3344',
    workerAddress: '대구 동구 동촌로 96',
    workerAddressDetail: '305동 503호',
    joinDate: '2020년 3월 19일',
    status: '픽업',
    rank: '기사',
    region: '동구',
    action: '상세',
  },
  {
    workerId: 'jg021',
    workerName: '문지호',
    workerPhone: '010-2234-5566',
    workerAddress: '대구 북구 구암로 90',
    workerAddressDetail: '302동 701호',
    joinDate: '2023년 8월 4일',
    status: '픽업',
    rank: '기사',
    region: '북구',
    action: '상세',
  },
  {
    workerId: 'jg022',
    workerName: '김다현',
    workerPhone: '010-9988-7766',
    workerAddress: '대구 수성구 범어로 22',
    workerAddressDetail: '101동 403호',
    joinDate: '2022년 12월 9일',
    status: '픽업',
    rank: '기사',
    region: '수성구',
    action: '상세',
  },
  {
    workerId: 'jg023',
    workerName: '박준서',
    workerPhone: '010-1122-3345',
    workerAddress: '대구 동구 화랑로 50',
    workerAddressDetail: '201동 1202호',
    joinDate: '2021년 1월 15일',
    status: '픽업',
    rank: '기사',
    region: '동구',
    action: '상세',
  },
  {
    workerId: 'jg024',
    workerName: '최서연',
    workerPhone: '010-3344-1122',
    workerAddress: '대구 달서구 본리로 10',
    workerAddressDetail: '304동 502호',
    joinDate: '2020년 10월 21일',
    status: '픽업',
    rank: '기사',
    region: '달서구',
    action: '상세',
  },
  {
    workerId: 'jg025',
    workerName: '정우성',
    workerPhone: '010-4455-6678',
    workerAddress: '대구 남구 이천로 31',
    workerAddressDetail: '203동 303호',
    joinDate: '2020년 12월 30일',
    status: '픽업',
    rank: '기사',
    region: '남구',
    action: '상세',
  },
  {
    workerId: 'jg026',
    workerName: '이예린',
    workerPhone: '010-5566-7789',
    workerAddress: '대구 달성군 현풍로 86',
    workerAddressDetail: '101동 802호',
    joinDate: '2024년 1월 2일',
    status: '배송',
    rank: '기사',
    region: '달성군',
    action: '상세',
  },
  {
    workerId: 'jg027',
    workerName: '배승현',
    workerPhone: '010-6677-8890',
    workerAddress: '대구 서구 비산동로 123',
    workerAddressDetail: '405동 1101호',
    joinDate: '2021년 9월 11일',
    status: '픽업',
    rank: '기사',
    region: '서구',
    action: '상세',
  },
  {
    workerId: 'jg028',
    workerName: '조수진',
    workerPhone: '010-7788-9901',
    workerAddress: '대구 중구 남산로 2길 7',
    workerAddressDetail: '501동 601호',
    joinDate: '2022년 6월 8일',
    status: '배송',
    rank: '기사',
    region: '중구',
    action: '상세',
  },
  {
    workerId: 'jg029',
    workerName: '오태윤',
    workerPhone: '010-8899-0012',
    workerAddress: '대구 동구 동촌로 15',
    workerAddressDetail: '202동 701호',
    joinDate: '2023년 5월 17일',
    status: '픽업',
    rank: '기사',
    region: '동구',
    action: '상세',
  },
  {
    workerId: 'jg030',
    workerName: '하예진',
    workerPhone: '010-9900-1123',
    workerAddress: '대구 북구 침산로 70',
    workerAddressDetail: '303동 201호',
    joinDate: '2020년 7월 28일',
    status: '픽업',
    rank: '기사',
    region: '북구',
    action: '상세',
  },
]);

// 페이지 관련 상태
const currentPage = ref(1);
const itemsPerPage = 8;

// 계산된 전체 페이지 수
const totalPages = computed(() => Math.ceil(filteredDrivers.value.length / itemsPerPage));

// 현재 페이지의 기사만 슬라이스
const paginatedDrivers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedDrivers.value.slice(start, end);
});

// 페이지 버튼 리스트 계산 (ex: [1, 2, 3, 4, 5])
const pageNumbers = computed(() => {
  const maxButtons = 5;
  let start = Math.max(currentPage.value - 2, 1);
  let end = Math.min(start + maxButtons - 1, totalPages.value);

  // 페이지가 끝에 가까울 때 start 다시 조정
  start = Math.max(end - maxButtons + 1, 1);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// 페이지 변경
function setPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// 필터링 기능
const searchKeyword = ref('');
const selectedRank = ref('');
const selectedRegion = ref('');
const filteredDrivers = computed(() => {
  return drivers.value.filter((driver) => {
    const nameMatch = driver.workerName.includes(searchKeyword.value.trim());
    const rankMatch = selectedRank.value ? driver.rank === selectedRank.value : true;
    const regionMatch = selectedRegion.value ? driver.region === selectedRegion.value : true;
    return nameMatch && rankMatch && regionMatch;
  });
});

watch([searchKeyword, selectedRank, selectedRegion], () => {
  currentPage.value = 1;
});

// 삭제 저장 취소 버튼
function deleteSelectedDrivers() {
  drivers.value = drivers.value.filter((driver) => !selectedDrivers.value.includes(driver.workerId));
  selectedDrivers.value = [];
}

function saveChanges() {
  isEditMode.value = false;
  selectedDrivers.value = [];
}

function cancelEdit() {
  isEditMode.value = false;
  selectedDrivers.value = [];
}

// 전체 선택 기능
const isAllSelected = computed(() => {
  const currentIds = paginatedDrivers.value.map((d) => d.workerId);
  return currentIds.length > 0 && currentIds.every((id) => selectedDrivers.value.includes(id));
});

function toggleSelectAll(event) {
  const isChecked = event.target.checked;
  const currentPageIds = paginatedDrivers.value.map((d) => d.workerId);

  if (isChecked) {
    // 현재 페이지의 기사들 중 아직 선택되지 않은 것만 추가
    selectedDrivers.value = Array.from(new Set([...selectedDrivers.value, ...currentPageIds]));
  } else {
    // 현재 페이지 기사들만 제거
    selectedDrivers.value = selectedDrivers.value.filter((id) => !currentPageIds.includes(id));
  }
}

//모달
// 모달 열기 상태
const isModalOpen = ref(false);

// 신규 기사 입력 값
const newDriver = ref({
  workerId: '',
  workerName: '',
  workerPhone: '',
  workerAddress: '',
  joinDate: '',
  status: '활동중',
  rank: '일반',
  region: '배차하기',
  photo: '', // 사진 URL
  memo: '',
  action: '상세',
});
// 기사 추가 함수
function addNewDriver() {
  if (
    newDriver.value.workerId &&
    newDriver.value.workerName &&
    newDriver.value.workerPhone &&
    newDriver.value.workerAddress &&
    newDriver.value.joinDate
  ) {
    drivers.value.unshift({ ...newDriver.value });
    isModalOpen.value = false;

    // 초기화
    newDriver.value = {
      workerId: '',
      workerName: '',
      workerPhone: '',
      workerAddress: '',
      joinDate: '',
      status: '활동중',
      rank: '일반',
      region: '배차하기',
      action: '상세',
    };
  } else {
    alert('모든 필드를 입력해 주세요.');
  }
}

// 이미지 업로드
// 숨겨진 input 엘리먼트를 참조
const fileInputRef = ref(null);

// 클릭 시 input[type="file"] 실행
function triggerFileInput() {
  fileInputRef.value?.click();
}

// 파일 업로드 처리 함수
function onImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      newDriver.value.photo = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

// 상세
const selectedDriver = ref(null);
const isDetailModalOpen = ref(false);

function openDetail(driver) {
  selectedDriver.value = driver;
  isDetailModalOpen.value = true;
}

// 모달이 열릴 때 오늘 날짜 자동 설정
watch(isModalOpen, (newVal) => {
  if (newVal) {
    const today = new Date().toISOString().split('T')[0];
    newDriver.value.joinDate = today;
  }
});

// 정렬
const sortOrder = ref('asc');
const sortKey = ref('workerName');

const sortedDrivers = computed(() => {
  return [...filteredDrivers.value].sort((a, b) => {
    let aVal = a[sortKey.value];
    let bVal = b[sortKey.value];

    // 날짜 정렬 처리
    if (sortKey.value === 'joinDate') {
      const parseDate = (str) => {
        const match = str.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
        if (!match) return new Date(0); // 잘못된 형식은 가장 오래된 날짜로 처리
        const [_, year, month, day] = match;
        return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      };
      aVal = parseDate(aVal);
      bVal = parseDate(bVal);
    }

    // 문자열 비교
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder.value === 'asc' ? aVal.localeCompare(bVal, 'ko') : bVal.localeCompare(aVal, 'ko');
    }

    return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal;
  });
});

function setSortKey(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const handleAddressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let addr = '';
      let extraAddr = '';

      // 도로명 / 지번 구분
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      // 추가 정보 (동, 건물명 등)
      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        addr += extraAddr;
      }

      // 주소 설정
      newDriver.value.workerAddress = addr;
    },
  }).open();
};

// 수정 모드
const isDetailEditMode = ref(false);
// 백업용 임시 객체
const driverBackup = ref({});

function saveDetailChanges() {
  isDetailEditMode.value = false;
}

function cancelDetailEdit() {
  // 백업된 값으로 되돌림
  selectedDriver.value = { ...driverBackup.value };
  isDetailEditMode.value = false;
}
</script>
<style setup>
td,
th {
  vertical-align: middle;
}
</style>
