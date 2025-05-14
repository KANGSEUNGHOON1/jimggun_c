<template>
  <!--전체-->
  <div class="workerHomeWrap w-full max-w-[768px] mx-auto h-screen">
    <!--탭 메뉴-->
    <div class="workerHomeTab h-full">
      <!-- 탭 버튼 -->
      <div class="flex">
        <h2 @click="activeTab = 'home'" class="flex-1 text-center cursor-pointer" :class="activeTab === 'home' ? ' text-[#FF6F00]' : 'text-[#111]'">홈</h2>
        <h2 @click="activeTab = 'todayWork'" class="flex-1 text-center cursor-pointer" :class="activeTab === 'todayWork' ? ' text-[#FF6F00]' : 'text-[#111]'">오늘 할 일</h2>
      </div>

      <!--홈 탭 내용-->
      <section v-if="activeTab === 'home'" class="home-wrap">
        <!--배너-->
        <div class="w-[702px] h-80 relative">
          <div class="w-[702px] h-80 left-0 top-0 absolute bg-orange-500 rounded-[10px] shadow-[2px_4px_10px_0px_rgba(0,0,0,0.02)] border border-gray-200"></div>
          <div class="left-[38px] top-[30px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">2025.04.28</div>
          <div class="left-[547px] top-[25px] absolute justify-start text-white text-xl font-medium font-['Pretendard']">24.2ºC</div>
          <img class="w-9 h-9 left-[638px] top-[19px] absolute" src="/images/kang/sunny.png" />
          <div class="w-24 h-24 left-[44px] top-[92px] absolute bg-orange-50 rounded-full shadow-[2px_4px_10px_0px_rgba(0,0,0,0.02)] border border-gray-200"></div>
          <img class="w-16 h-16 left-[60px] top-[107px] absolute" src="/images/kang/truckicon.png" />
          <div class="left-[166px] top-[110px] absolute text-center justify-start text-white text-4xl font-bold font-['Pretendard']">홍은경</div>
          <div class="left-[275px] top-[113px] absolute text-center justify-start text-white text-3xl font-bold font-['Pretendard']">기사님</div>
          <div class="left-[166px] top-[160px] absolute justify-start text-white text-base font-medium font-['Pretendard']">실시간 교통정보, 중요한 알림을 확인하세요</div>
          <div class="left-[511px] top-[215px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">이 달의 추가 수당</div>
          <div class="left-[420px] top-[244px] absolute justify-start text-white text-5xl font-bold font-['Pretendard']">105,000</div>
          <div class="left-[621px] top-[251px] absolute justify-start text-white text-4xl font-bold font-['Pretendard']">원</div>
        </div>
      </section>

      <!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->
      <!--오늘 할 일 탭 내용-->

      <section v-if="activeTab === 'todayWork'" class="todayWork-wrap h-full">
        <div class="todayWorkMapWrap w-full h-full" id="map">
          <div class="markerimages">
            <img src="/images/hong/marker1.png" alt="마커1" />
            <img src="/images/hong/marker2.png" alt="마커2" />
            <img src="/images/hong/marker3.png" alt="마커3" />
            <img src="/images/hong/marker4.png" alt="마커4" />
            <img src="/images/hong/marker5.png" alt="마커5" />
            <img src="/images/hong/marker6.png" alt="마커6" />
            <img src="/images/hong/marker7.png" alt="마커7" />
            <img src="/images/hong/marker8.png" alt="마커8" />
            <img src="/images/hong/marker9.png" alt="마커9" />
            <img src="/images/hong/marker10.png" alt="마커10" />
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- 모달 -->
  <div v-if="modalOpen && selectedPlace" class="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[768px] bg-white rounded-xl shadow-lg z-50 p-6">
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
        <div class="flex items-end justify-between">
          <!-- 왼쪽: 사진 label + 업로드칸 -->
          <div class="flex gap-2 items-start">
            <span class="text-gray-500 w-20">사진</span>
            <div class="w-16 h-16 border border-dashed border-gray-400 rounded-[10px] flex items-center justify-center text-gray-400 text-xl">+</div>
          </div>

          <!-- 오른쪽: 픽업완료 버튼 -->
          <button class="bg-orange-500 text-white px-6 py-2 rounded-[10px] font-bold text-sm">픽업완료</button>
        </div>

        <!-- 닫기 버튼 -->
        <button @click="modalOpen = false" class="text-gray-500 text-xl absolute top-0 right-0">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// 상태
const activeTab = ref("home");
const selectedPlace = ref(null);
const modalOpen = ref(false);

// 지도 객체
let map = null;

// 마커 더미데이터 목록
const markerData = [
  {
    lat: 35.8997,
    lng: 128.638,
    title: "대구국제공항",
    reservationId: "01",
    address: "대구 동구 공항로 221",
    name: "홍길동",
    phone: "010-1234-5678",
    notes: "",
    clothes: "M - 1개\nL - 1개",
    image: "marker1.png",
  },
  {
    lat: 35.8797,
    lng: 128.6292,
    title: "동대구역",
    reservationId: "02",
    address: "대구 동구 동대구로 550",
    name: "이영희",
    phone: "010-2345-6789",
    notes: "CU 편의점 앞에 둘게요",
    clothes: "S - 2개",
    image: "marker2.png",
  },
  {
    lat: 35.9428,
    lng: 128.5472,
    title: "칠곡그린빌3차",
    reservationId: "03",
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
    reservationId: "04",
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
    reservationId: "05",
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
    reservationId: "06",
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
    reservationId: "07",
    address: "대구 북구 침산로 70",
    name: "장도현",
    phone: "010-7890-1234",
    notes: "",
    clothes: "XL - 1개",
    image: "marker7.png",
  },
  {
    lat: 35.9022,
    lng: 128.589,
    title: "공원 앞 편의점",
    reservationId: "08",
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
    reservationId: "09",
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
];

const createMarker = (place) => {
  const position = new kakao.maps.LatLng(place.lat, place.lng);
  const marker = new kakao.maps.Marker({
    position,
    title: place.title,
    image: new kakao.maps.MarkerImage(`http://localhost:5173/images/hong/${place.image}`, new kakao.maps.Size(44, 51)),
  });
  marker.setMap(map);
  kakao.maps.event.addListener(marker, "click", () => {
    selectedPlace.value = place;
    modalOpen.value = true;
  });
};

const initMap = () => {
  if (map) return;
  const container = document.getElementById("map");
  if (!container) return;
  map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(35.8944, 128.6586),
    level: 7,
  });
  markerData.forEach(createMarker);
};

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
    kakao.maps.load(initMap);
  }
};

onMounted(() => {
  if (activeTab.value === "todayWork") {
    loadKakaoMap();
  }
});

watch(activeTab, (newValue) => {
  if (newValue === "todayWork") {
    loadKakaoMap();
  }
});
</script>
<style scoped>
/* marker 숨김용 */
.markerimages {
  display: none;
}
</style>
