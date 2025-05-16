<script setup>
import { computed, ref, watch } from "vue";

// 예약하기 더미데이터
const reservations = ref([
  {
    id: "JR123",
    customerName: "김민수",
    phone: "010-1234-5678",
    address: "대구 수성구 달구벌대로 2451",
    detailaddress: "한신아파트 101동 502호",
    reservationDate: "2025-04-13",
    pickupDate: "2025-04-22",
    status: "pickupWait",
    dispatchStatus: "one",
    area: "suseong",
  },
  {
    id: "JR121",
    customerName: "이서연",
    phone: "010-2345-6789",
    address: "대구 남구 명덕로 104",
    detailaddress: "우방타운 203동 603호",
    reservationDate: "2025-04-20",
    pickupDate: "2025-04-23",
    status: "deliveryWait",
    dispatchStatus: "wait",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR122",
    customerName: "박지훈",
    phone: "010-3456-7890",
    address: "대구 북구 대학로 80",
    detailaddress: "현대맨션 5층 502호",
    reservationDate: "2025-04-25",
    pickupDate: "2025-04-26",
    status: "complete",
    dispatchStatus: "two",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR124",
    customerName: "최유진",
    phone: "010-4567-8901",
    address: "대구 동구 화랑로 421",
    detailaddress: "한일타운 104동 704호",
    reservationDate: "2025-04-23",
    pickupDate: "2025-04-25",
    status: "delivery",
    dispatchStatus: "three",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR125",
    customerName: "정하늘",
    phone: "010-5678-9012",
    address: "대구 달서구 상화로 123",
    detailaddress: "성서 e편한세상 201동 1102호",
    reservationDate: "2025-04-24",
    pickupDate: "2025-04-27",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "dalseo",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR120",
    customerName: "한지민",
    phone: "010-6789-0123",
    address: "대구 서구 국채보상로 105",
    detailaddress: "두류우방타운 103동 302호",
    reservationDate: "2025-04-26",
    pickupDate: "2025-04-28",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "west",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR127",
    customerName: "오준호",
    phone: "010-7890-1234",
    address: "대구 중구 동덕로 115",
    detailaddress: "명문아파트 102동 902호",
    reservationDate: "2025-04-28",
    pickupDate: "2025-04-30",
    status: "delivery",
    dispatchStatus: "two",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR126",
    customerName: "서지우",
    phone: "010-8901-2345",
    address: "대구 수성구 청호로 83",
    detailaddress: "수성푸르지오 110동 403호",
    reservationDate: "2025-04-27",
    pickupDate: "2025-04-29",
    status: "complete",
    dispatchStatus: "three",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR128",
    customerName: "장서윤",
    phone: "010-9012-3456",
    address: "대구 북구 복현로 35",
    detailaddress: "복현힐스테이트 1단지 204동 204호",
    reservationDate: "2025-04-29",
    pickupDate: "2025-05-01",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR129",
    customerName: "윤도현",
    phone: "010-0123-4567",
    address: "대구 동구 동부로 23",
    detailaddress: "동대구타워 902호",
    reservationDate: "2025-04-30",
    pickupDate: "2025-05-02",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR131",
    customerName: "배수아",
    phone: "010-1235-5678",
    address: "대구 달서구 조암로6길 20",
    detailaddress: "월성 푸르지오 아파트 110동 801호",
    reservationDate: "2025-05-01",
    pickupDate: "2025-05-03",
    status: "delivery",
    dispatchStatus: "two",
    area: "dalseo",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR130",
    customerName: "송지호",
    phone: "010-2346-6789",
    address: "대구 중구 중앙대로 403",
    detailaddress: "중앙그린빌 403호",
    reservationDate: "2025-05-02",
    pickupDate: "2025-05-04",
    status: "complete",
    dispatchStatus: "three",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR132",
    customerName: "이하은",
    phone: "010-3457-7890",
    address: "대구 서구 서대구로 123",
    detailaddress: "서대구SK뷰 107동 305호",
    reservationDate: "2025-05-03",
    pickupDate: "2025-05-05",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "west",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR134",
    customerName: "조민재",
    phone: "010-4568-8901",
    address: "대구 남구 현충로 56",
    detailaddress: "대명센트럴 2차 1002호",
    reservationDate: "2025-05-04",
    pickupDate: "2025-05-15",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR135",
    customerName: "김다인",
    phone: "010-5679-9012",
    address: "대구 수성구 지범로 128",
    detailaddress: "지산자이 201동 1003호",
    reservationDate: "2025-05-05",
    pickupDate: "2025-05-07",
    status: "delivery",
    dispatchStatus: "two",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR133",
    customerName: "문현우",
    phone: "010-6780-0123",
    address: "대구 북구 구암로 234",
    detailaddress: "침산래미안 110동 203호",
    reservationDate: "2025-05-06",
    pickupDate: "2025-05-14",
    status: "complete",
    dispatchStatus: "three",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR137",
    customerName: "배지윤",
    phone: "010-7891-1234",
    address: "대구 동구 효목로 94",
    detailaddress: "동대구아이파크 105동 406호",
    reservationDate: "2025-05-07",
    pickupDate: "2025-05-16",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR136",
    customerName: "이도윤",
    phone: "010-8902-2345",
    address: "대구 달서구 이곡로 18",
    detailaddress: "성서자이 302동 302호",
    reservationDate: "2025-05-08",
    pickupDate: "2025-05-18",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "dalseo",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR139",
    customerName: "정유진",
    phone: "010-9013-3456",
    address: "대구 중구 명륜로 10",
    detailaddress: "중앙아파트 6동 601호",
    reservationDate: "2025-05-09",
    pickupDate: "2025-05-15",
    status: "delivery",
    dispatchStatus: "two",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR138",
    customerName: "강태오",
    phone: "010-0124-4567",
    address: "대구 서구 통학로 57",
    detailaddress: "두류타운 202동 707호",
    reservationDate: "2025-05-10",
    pickupDate: "2025-05-15",
    status: "complete",
    dispatchStatus: "three",
    area: "west",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR140",
    customerName: "김민준",
    phone: "010-2345-6781",
    address: "대구 중구 동성로2가 88",
    detailaddress: "101동 1204호",
    reservationDate: "2025-05-01",
    pickupDate: "2025-05-03",
    status: "pickupWait",
    dispatchStatus: "one",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR141",
    customerName: "이서준",
    phone: "010-9876-3210",
    address: "대구 북구 연암로 40",
    detailaddress: "301동 404호",
    reservationDate: "2025-05-02",
    pickupDate: "2025-05-04",
    status: "deliveryWait",
    dispatchStatus: "wait",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR142",
    customerName: "박하윤",
    phone: "010-1234-5678",
    address: "대구 남구 이천로 60",
    detailaddress: "202동 1003호",
    reservationDate: "2025-05-03",
    pickupDate: "2025-05-05",
    status: "delivery",
    dispatchStatus: "two",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR143",
    customerName: "최지우",
    phone: "010-3344-5566",
    address: "대구 수성구 청수로 70",
    detailaddress: "302동 1801호",
    reservationDate: "2025-05-04",
    pickupDate: "2025-05-06",
    status: "complete",
    dispatchStatus: "three",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR144",
    customerName: "정우진",
    phone: "010-1111-2222",
    address: "대구 동구 아양로 27",
    detailaddress: "101동 903호",
    reservationDate: "2025-05-05",
    pickupDate: "2025-05-07",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR145",
    customerName: "한서윤",
    phone: "010-7777-8888",
    address: "대구 달서구 이곡로 38",
    detailaddress: "102동 1502호",
    reservationDate: "2025-05-06",
    pickupDate: "2025-05-08",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "dalseo",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR146",
    customerName: "윤도윤",
    phone: "010-4444-5555",
    address: "대구 북구 칠곡중앙대로 65",
    detailaddress: "201동 703호",
    reservationDate: "2025-05-07",
    pickupDate: "2025-05-09",
    status: "delivery",
    dispatchStatus: "two",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR147",
    customerName: "서지호",
    phone: "010-2222-3333",
    address: "대구 중구 국채보상로 700",
    detailaddress: "401동 1102호",
    reservationDate: "2025-05-08",
    pickupDate: "2025-05-10",
    status: "complete",
    dispatchStatus: "three",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR148",
    customerName: "배예린",
    phone: "010-1212-3434",
    address: "대구 동구 동촌로 123",
    detailaddress: "105동 405호",
    reservationDate: "2025-05-09",
    pickupDate: "2025-05-11",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR149",
    customerName: "조하람",
    phone: "010-6767-8989",
    address: "대구 수성구 수성로 250",
    detailaddress: "306동 1207호",
    reservationDate: "2025-05-10",
    pickupDate: "2025-05-12",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR150",
    customerName: "신나윤",
    phone: "010-8989-1212",
    address: "대구 달성군 화원읍 비슬로 132",
    detailaddress: "108동 1103호",
    reservationDate: "2025-05-11",
    pickupDate: "2025-05-13",
    status: "delivery",
    dispatchStatus: "two",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR151",
    customerName: "오지훈",
    phone: "010-5555-1212",
    address: "대구 남구 명덕로 115",
    detailaddress: "104동 1406호",
    reservationDate: "2025-05-12",
    pickupDate: "2025-05-14",
    status: "complete",
    dispatchStatus: "three",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR152",
    customerName: "노지아",
    phone: "010-7777-6666",
    address: "대구 서구 국채보상로 289",
    detailaddress: "209동 1505호",
    reservationDate: "2025-05-13",
    pickupDate: "2025-05-15",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "west",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR153",
    customerName: "문이안",
    phone: "010-1122-3344",
    address: "대구 수성구 용학로 50",
    detailaddress: "301동 503호",
    reservationDate: "2025-05-14",
    pickupDate: "2025-05-16",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR154",
    customerName: "장유진",
    phone: "010-6677-8899",
    address: "대구 중구 남산로 20",
    detailaddress: "201동 1104호",
    reservationDate: "2025-05-15",
    pickupDate: "2025-05-17",
    status: "delivery",
    dispatchStatus: "two",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR155",
    customerName: "이준호",
    phone: "010-8888-4444",
    address: "대구 북구 동천로 29",
    detailaddress: "401동 601호",
    reservationDate: "2025-05-16",
    pickupDate: "2025-05-18",
    status: "complete",
    dispatchStatus: "three",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR156",
    customerName: "강서진",
    phone: "010-1357-2468",
    address: "대구 달서구 본리로 22",
    detailaddress: "103동 204호",
    reservationDate: "2025-05-17",
    pickupDate: "2025-05-19",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "dalseo",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR157",
    customerName: "임도현",
    phone: "010-2468-1357",
    address: "대구 동구 해동로 67",
    detailaddress: "109동 1501호",
    reservationDate: "2025-05-18",
    pickupDate: "2025-05-20",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR158",
    customerName: "백예준",
    phone: "010-9876-5432",
    address: "대구 남구 앞산순환로 91",
    detailaddress: "303동 504호",
    reservationDate: "2025-05-19",
    pickupDate: "2025-05-21",
    status: "delivery",
    dispatchStatus: "two",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR159",
    customerName: "서하은",
    phone: "010-3333-1111",
    address: "대구 북구 구암로 89",
    detailaddress: "204동 1001호",
    reservationDate: "2025-05-20",
    pickupDate: "2025-05-22",
    status: "complete",
    dispatchStatus: "three",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR160",
    customerName: "홍지안",
    phone: "010-5566-7788",
    address: "대구 수성구 범안로 124",
    detailaddress: "502동 903호",
    reservationDate: "2025-05-21",
    pickupDate: "2025-05-23",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR161",
    customerName: "김하율",
    phone: "010-8888-1111",
    address: "대구 서구 달서천로 92",
    detailaddress: "304동 702호",
    reservationDate: "2025-05-22",
    pickupDate: "2025-05-24",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "west",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR162",
    customerName: "오태양",
    phone: "010-4321-6789",
    address: "대구 달성군 논공읍 비슬로 200",
    detailaddress: "403동 802호",
    reservationDate: "2025-05-23",
    pickupDate: "2025-05-25",
    status: "delivery",
    dispatchStatus: "two",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR163",
    customerName: "전지민",
    phone: "010-2233-4455",
    address: "대구 남구 중앙대로 70",
    detailaddress: "206동 505호",
    reservationDate: "2025-05-24",
    pickupDate: "2025-05-26",
    status: "complete",
    dispatchStatus: "three",
    area: "south",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR164",
    customerName: "차민재",
    phone: "010-6677-3344",
    address: "대구 북구 침산로 24",
    detailaddress: "405동 1204호",
    reservationDate: "2025-05-25",
    pickupDate: "2025-05-27",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "north",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR165",
    customerName: "정가은",
    phone: "010-9911-2233",
    address: "대구 수성구 들안로 22",
    detailaddress: "305동 1503호",
    reservationDate: "2025-05-26",
    pickupDate: "2025-05-28",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "suseong",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR166",
    customerName: "유서준",
    phone: "010-1122-7788",
    address: "대구 동구 신천동 142",
    detailaddress: "107동 603호",
    reservationDate: "2025-05-27",
    pickupDate: "2025-05-29",
    status: "delivery",
    dispatchStatus: "two",
    area: "east",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR167",
    customerName: "이소율",
    phone: "010-8855-4422",
    address: "대구 중구 중앙대로 100",
    detailaddress: "403동 401호",
    reservationDate: "2025-05-28",
    pickupDate: "2025-05-30",
    status: "complete",
    dispatchStatus: "three",
    area: "center",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR168",
    customerName: "장하린",
    phone: "010-5656-7878",
    address: "대구 서구 서대구로 99",
    detailaddress: "205동 706호",
    reservationDate: "2025-05-29",
    pickupDate: "2025-05-31",
    status: "pickupWait",
    dispatchStatus: "wait",
    area: "west",
    clothes: "L - 1개\nM - 1개",
  },
  {
    id: "JR169",
    customerName: "배지후",
    phone: "010-4321-1234",
    address: "대구 달서구 월곡로 23",
    detailaddress: "308동 1105호",
    reservationDate: "2025-05-30",
    pickupDate: "2025-06-01",
    status: "deliveryWait",
    dispatchStatus: "one",
    area: "dalseo",
    clothes: "L - 1개\nM - 1개",
  },
]);

// 필터링 관련
const searchQuery = ref("");
const statusFilter = ref("all1");
const areaFilter = ref("all2");
const dispatchStatusFilter = ref("all3");
const sortBy = ref("newRv");
const dateStatus = ref("reservation");

// btn
const modifyDispatchStatus = ref(false);
const modifyBtn = ref(true);

// 날짜를 yyyy-mm-dd 형식으로 반환하는 함수
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// 오늘 날짜
const today = new Date();

// 한 달 전 날짜
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

// 반응형 날짜 변수 선언
const startDating = ref(formatDate(oneMonthAgo));
const endDateing = ref(formatDate(today));

const dateRange = ref({
  start: startDating.value, // 시작일
  end: endDateing.value, // 종료일
});
const showTomorrowPickup = ref(false);
// 내일 날짜 계산 함수
const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
};

const filteredReservations = computed(() => {
  let result = [...reservations.value];
  // 1. 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((item) => {
      return item.customerName.toLowerCase().includes(query) || item.address.toLowerCase().includes(query);
    });
  }

  // 2. 선택박스 필터링(4가지)
  // 2-1. 상태 필터링
  if (statusFilter.value !== "all1") {
    result = result.filter((item) => item.status === statusFilter.value);
  }
  // 2-2. 리스트 순서 필터링
  switch (sortBy.value) {
    case "oldRv": // 오래된 예약순
      result.sort((a, b) => {
        return new Date(a.reservationDate) - new Date(b.reservationDate);
      });
      break;
    case "newRv": // 최신 예약순
      result.sort((a, b) => {
        return new Date(b.reservationDate) - new Date(a.reservationDate);
      });
      break;
    case "name": // 이름순
      result.sort((a, b) => a.customerName.localeCompare(b.customerName));
      break;
    case "number": // 예약번호순
      result.sort((a, b) => a.id.localeCompare(b.id));
      break;
  }
  // 2-3. 지역 필터링
  if (areaFilter.value !== "all2") {
    result = result.filter((item) => item.area === areaFilter.value);
  }
  // 2-4. 배차상태 필터링
  if (dispatchStatusFilter.value !== "all3") {
    result = result.filter((item) => item.dispatchStatus === dispatchStatusFilter.value);
  }

  // 3. 날짜 필터링
  // 3-1. 예약날짜 기준
  if (dateStatus.value === "reservation") {
    if (dateRange.value.start && dateRange.value.end) {
      result = result.filter((item) => {
        const reservationDate = new Date(item.reservationDate);
        const startDate = new Date(dateRange.value.start); // 시작일
        const endDate = new Date(dateRange.value.end); // 종료일
        return reservationDate >= startDate && reservationDate <= endDate;
      });
    }
  }
  // 3-2. 픽업날짜 기준
  if (dateStatus.value === "pickup") {
    if (dateRange.value.start && dateRange.value.end) {
      result = result.filter((item) => {
        const pickupDate = new Date(item.pickupDate);
        const startDate = new Date(dateRange.value.start); // 시작일
        const endDate = new Date(dateRange.value.end); // 종료일
        return pickupDate >= startDate && pickupDate <= endDate;
      });
    }
  }

  // 4. 내일픽업날짜 보기 체크박스 필터링
  if (showTomorrowPickup.value) {
    const tomorrow = getTomorrowDate();
    result = result.filter((item) => item.pickupDate === tomorrow);
  }

  return result;
}); // filteredReservations 끝

// 체크박스 관련
// 체크박스 관련 상태들 정의
// new Set()은 JavaScript에서 중복 없는 값들의 집합을 만들 때 사용하는 객체
// Set은 배열과 비슷하지만, 중복된 값을 자동으로 제거해주는 특징
// 값이 중복되면 자동으로 하나만 남김
const selectedItems = ref(new Set());
const showCheckboxes = ref(false);
const isAllPagesSelected = ref(false);

// 체크박스 활성화 여부 확인 함수
const isCheckboxEnabled = (dispatchStatus) => {
  return dispatchStatus === "wait";
};

// 전체 선택 상태 계산
const isAllSelected = computed({
  // computed 속성: 값을 계산하고, 자동으로 반응형으로 동작함
  // get:은 getter 함수를 정의할 때 사용.
  // 함수처럼 실행되지만, 속성처럼 사용할 수 있음.
  // Vue, Pinia, 객체에서 계산된 값을 반환할 때 자주 사용
  get: () => {
    //  getter: 외부에서 isAllSelected.value로 값을 읽을 때 실행됨
    return isAllPagesSelected.value; // 모든 페이지가 선택된 상태인지 반환 (true 또는 false)
  },
  set: (value) => {
    //  setter: 외부에서 isAllSelected.value = true 같이 값을 설정할 때 실행됨
    isAllPagesSelected.value = value; // 설정한 값을 내부 상태에도 저장

    if (value) {
      //  value가 true면 → 체크박스를 "전체 선택"한 것
      filteredReservations.value
        // .filter((item) => item.dispatchStatus === "wait") // '배차대기(wait)' 상태인 예약만 필터링
        // .forEach((item) => selectedItems.value.add(item.id)); // 그 항목들의 id를 선택 목록(Set)에 추가
        .filter((item) => {
          return (
            item.dispatchStatus === "wait" ||
            item.dispatchStatus === "one" ||
            item.dispatchStatus === "two" ||
            item.dispatchStatus === "three"
          );
        }) // '배차대기(wait)' 상태인 예약만 필터링
        .forEach((item) => selectedItems.value.add(item.id)); // 그 항목들의 id를 선택 목록(Set)에 추가
    } else {
      //  value가 false면 → 체크박스를 "전체 선택 해제"한 것
      filteredReservations.value
        // .filter((item) => item.dispatchStatus === "wait") // '배차대기(wait)' 상태인 예약만 필터링
        // .forEach((item) => selectedItems.value.delete(item.id)); // 그 항목들의 id를 선택 목록(Set)에서 제거
        .filter((item) => {
          return (
            item.dispatchStatus === "wait" ||
            item.dispatchStatus === "one" ||
            item.dispatchStatus === "two" ||
            item.dispatchStatus === "three"
          );
        })
        .forEach((item) => selectedItems.value.delete(item.id)); // 그 항목들의 id를 선택 목록(Set)에서 제거
    }
  },
});

// 개별 체크박스 토글 함수
const toggleItem = (id) => {
  //  현재 페이지에서 해당 id를 가진 예약 항목을 찾음
  const item = paginatedReservations.value.find((item) => item.id === id);

  //  배차 상태가 'wait'가 아니면 선택/해제 못 하게 함 (조건 제한)
  // if (item.dispatchStatus !== "wait") return;

  //  이미 선택된 항목이면 → 선택 해제
  //has() : Set 객체에서 사용하는 메서드
  // Set 안에 해당 값이 존재하면 true,
  if (selectedItems.value.has(id)) {
    selectedItems.value.delete(id); //  Set에서 해당 id 제거

    //  개별 항목이 해제되면 → 전체 선택 상태도 해제해야 함
    isAllPagesSelected.value = false;
  } else {
    //  선택되지 않은 항목이면 → 새로 선택
    selectedItems.value.add(id); //  Set에 해당 id 추가

    //  모든 '배차대기' 상태 항목 가져오기 (페이지 제한 없이 전체)
    const allDispatchWaitItems = filteredReservations.value.filter((item) => {
      return (
        item.dispatchStatus === "wait" ||
        item.dispatchStatus === "one" ||
        item.dispatchStatus === "two" ||
        item.dispatchStatus === "three"
      );
    });
    // const allDispatchWaitItems = filteredReservations.value.filter((item) => item.dispatchStatus === "wait");

    //  모든 '배차대기' 항목이 선택되었는지 확인
    // every()는 JavaScript의 배열 메서드로,
    // 배열 안의 모든 요소가 특정 조건을 만족하는지 확인할 때 사용
    // 배열의 모든 요소가 조건을 만족하면
    const allSelected = allDispatchWaitItems.every(
      (item) => selectedItems.value.has(item.id) //  각 항목의 id가 Set에 있는지 확인
    );

    // ✅ 모두 선택되어 있으면 → 전체 선택 상태로 표시
    isAllPagesSelected.value = allSelected;
  }
};

// 배차수정 버튼 클릭 핸들러
const handleDispatchClick = () => {
  showCheckboxes.value = true;
  modifyDispatchStatus.value = true;
  modifyBtn.value = false;

  // 배송중(delivery)과 완료(complete) 상태 항목은 표시하지 않도록 필터링
  statusFilter.value = "all1"; // 모든 상태 선택

  // 배차 수정 모드에서는 픽업대기와 배송대기 상태만 표시
  // 'pickupWait'와 'deliveryWait' 상태만 표시되도록 필터 설정
  const modifyableStatuses = ["pickupWait"];

  // 필터링 적용
  statusFilter.value = modifyableStatuses[0]; // 기본으로 'pickupWait'(픽업대기) 필터 적용

  // 페이지네이션 1페이지로 초기화
  currentPage.value = 1;
};
const cancelDispatchClick = () => {
  showCheckboxes.value = false;
  modifyDispatchStatus.value = false;
  modifyBtn.value = true;
  if (!showCheckboxes.value) {
    selectedItems.value.clear(); // 체크박스 숨길 때 선택 상태 초기화
    isAllPagesSelected.value = false; // 전체 선택 상태도 초기화
  }
};

// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
// 상태 한글 변환
const getStatusText = (status) => {
  const statusMap = {
    pickupWait: "픽업대기",
    deliveryWait: "배송대기",
    delivery: "배송중",
    complete: "완료",
  };
  return statusMap[status] || status;
};
// 배차대기 한글 변환
const getdispatchStatusText = (dispatchStatus) => {
  const dispatchMap = {
    wait: "배차대기",
    one: "1호차",
    two: "2호차",
    three: "3호차",
  };
  return dispatchMap[dispatchStatus] || dispatchStatus;
};

// 페이지네이션 적용
const currentPage = ref(1);
const itemsPerPage = ref(5);
const groupSize = 5;
const pageGroup = computed(() => Math.floor((currentPage.value - 1) / groupSize));
const totalPages = computed(() => {
  return Math.ceil(filteredReservations.value.length / itemsPerPage.value);
});
const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredReservations.value.slice(start, end);
});
const startPage = computed(() => pageGroup.value * groupSize + 1);
const endPage = computed(() => Math.min(startPage.value + groupSize - 1, totalPages.value));
const visiblePages = computed(() => {
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

// 그룹이전버튼
const prevPageGroup = () => {
  const prevStartPage = (pageGroup.value - 1) * groupSize + 1;
  if (prevStartPage >= 1) {
    currentPage.value = prevStartPage;
  }
};
const prevPage = () => {
  if (currentPage.value !== 1) {
    currentPage.value--;
  }
};

// 페이지 이동버튼
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 다음버튼
const nextPage = () => {
  if (currentPage.value !== totalPages.value) {
    currentPage.value++;
  }
};
// 그룹다음버튼
const nextPageGroup = () => {
  const nextStartPage = (pageGroup.value + 1) * groupSize + 1;
  if (nextStartPage <= totalPages.value) {
    currentPage.value = nextStartPage;
  }
};

// 필터가 변경될 때 페이지 번호를 1로 초기화
watch(
  [
    statusFilter,
    areaFilter,
    dispatchStatusFilter,
    sortBy,
    searchQuery,
    dateStatus,
    () => dateRange.value.start,
    () => dateRange.value.end,
    showTomorrowPickup,
  ],
  () => {
    pageGroup.value = 0;
    currentPage.value = 1;
  }
);

// 페이지네이션 관련 함수 수정
const getPageNumbers = computed(() => {
  const total = totalPages.value;
  const current = Math.min(currentPage.value, total); // 현재 페이지가 마지막 페이지를 초과하지 않도록 제한
  const first = ref(1);
  const range = [];

  // 첫 페이지는 항상 표시
  if (current >= 1) {
    range.push(1);
  }
  // 현재 페이지가 4일 때: 1 ... 3 4
  // 현재 페이지가 3일 때: 1 ... 2 3 4
  // 현재 페이지가 2일 때: 1 2 3 4
  // 현재 페이지가 1일 때: 1 2 ... 4
  // 현재 페이지가 1이 아닐 경우
  if (current > 1) {
    // 현재 페이지가 3보다 크면 '...' 추가
    if (current > 3) {
      range.push("...");
    }
    // 현재 페이지가 2가 아닐 경우 이전 페이지 표시
    if (current !== 2) {
      range.push(current - 1);
    }

    // 현재 페이지 표시
    range.push(current);
    // 현재 페이지의 다음페이지 출력 표시
    if (current && current !== total && current + 1 !== total) {
      range.push(current + 1);
    }
    // 현재 페이지가 마지막 페이지가 아닐 경우에만 다음 페이지 표시
    if (current < total) {
      // range.push(current + 1);
      // 현재 페이지가 마지막 페이지에서 2페이지 이상 떨어져 있으면 '...' 추가
      if (current < total - 2) {
        range.push("...");
      }
    }
  } else {
    // 현재 페이지가 1일 경우
    if (total > 1) {
      range.push(2);
      if (total > 2) {
        range.push("...");
      }
    }
  }

  // 마지막 페이지가 1이 아니고 현재 페이지가 아닐 경우 표시
  // if (total > 1 && current !== total) {
  //   range.push(total);
  // }
  // 마지막 페이지 추가 (중복 방지)
  if (!range.includes(total)) {
    range.push(total);
  }

  return range;
});

// 모달 표시 여부를 저장하는 반응형 변수 (배차 상태 변경 모달)
const dispatchChangeModal = ref(false);

// 사용자가 선택한 변경 대상 배차 상태 (기본값: 'one' → 1호차)
const selectedDispatchStatus = ref("one");

// 현재 선택된 예약 항목들 중 가장 많은 상태값을 저장 (예: 'wait', 'one', 'two', 'three')
const currentDispatchStatus = ref("wait");

// 현재 선택된 항목들의 배차 상태별 개수를 저장하는 객체
const currentDispatchCounts = ref({
  wait: 0,
  one: 0,
  two: 0,
  three: 0,
});

// 배차 상태 변경 모달을 표시하는 함수
const showDispatchChangeModal = () => {
  // 항목이 선택되지 않은 경우 경고창을 띄우고 함수 종료
  if (selectedItems.value.size === 0) {
    alert("변경할 항목을 선택해주세요.");
    return;
  }

  // 배차 상태별 선택된 항목 수를 계산할 임시 객체 초기화
  //  counts는 각 배차 상태별로 몇 개씩 선택되었는지 기록하는 객체입니다.
  //예: 사용자가 상태별로 항목을 선택했을 때, 그 개수를 셀 예정입니다.
  //totalSelected는 선택된 항목이 총 몇 개인지 저장합니다.
  const counts = { wait: 0, one: 0, two: 0, three: 0 };
  let totalSelected = 0; // 총 선택된 항목 수
  //selectedItems.value: 사용자가 선택한 예약 항목들의 ID 목록입니다.
  //reservations.value.find(...): ID에 맞는 예약 항목을 찾습니다.
  //counts[item.dispatchStatus]++: 해당 예약 항목의 배차 상태에 따라 개수를 1씩 증가시킵니다.
  //예: item.dispatchStatus가 "one"이면 counts["one"]++
  // 선택된 항목 ID들을 하나씩 확인하며 상태별 개수 카운트
  selectedItems.value.forEach((id) => {
    // ID에 해당하는 예약 항목을 찾음
    const item = reservations.value.find((item) => item.id === id);
    if (item) {
      // 해당 항목의 배차 상태에 따라 카운트 증가
      counts[item.dispatchStatus]++;
      totalSelected++;
    }
  });
  //Vue에서 currentDispatchCounts라는 전역 상태에 저장하는 것입니다.
  //추후 모달창 같은 데서 상태별 개수를 보여주기 위해 저장
  // 상태별 개수 정보를 전역 상태로 저장 (모달에서 표시 용도)
  currentDispatchCounts.value = counts;
  // 선택된 항목 중 가장 많이 분포된 배차 상태를 찾기 위한 변수 초기화
  let maxCount = 0;
  let maxStatus = "wait";

  // 상태별 개수를 순회하면서 가장 많은 상태를 찾음
  // counts 객체의 각 상태(status)를 순회합니다.
  //"어떤 상태가 제일 많이 선택되었는가?" 를 찾는 것
  // 예: counts = { pending: 3, complete: 7, canceled: 5 }
  for (const status in counts) {
    // 현재 상태의 개수가 지금까지 본 최대 개수(maxCount)보다 크다면,
    if (counts[status] > maxCount) {
      // 최대 개수를 현재 상태의 개수로 갱신합니다.
      maxCount = counts[status];

      // 가장 개수가 많은 상태를 현재 상태로 저장합니다.
      maxStatus = status;
    }
  }

  // 가장 많은 상태를 현재 상태로 설정
  currentDispatchStatus.value = maxStatus;

  // 현재 상태와 다른 값으로 변경 상태 기본값을 설정
  if (maxStatus === "one") {
    selectedDispatchStatus.value = "two"; // 1호차 → 2호차로 변경
  } else if (maxStatus === "two") {
    selectedDispatchStatus.value = "three"; // 2호차 → 3호차로 변경
  } else if (maxStatus === "three") {
    selectedDispatchStatus.value = "one"; // 3호차 → 1호차로 변경
  } else {
    // 배차 대기 상태인 경우 기본값을 1호차로 설정
    selectedDispatchStatus.value = "one";
  }

  // 배차 변경 모달을 표시
  dispatchChangeModal.value = true;
};

// 배차 변경 모달을 닫는 함수
const closeDispatchChangeModal = () => {
  dispatchChangeModal.value = false;
};

// 배차 상태 변경을 저장하고 화면 상태를 초기화하는 함수
const saveDispatchChange = () => {
  // 선택된 항목들을 하나씩 순회하며 배차 상태를 변경
  selectedItems.value.forEach((id) => {
    const item = reservations.value.find((item) => item.id === id);
    if (item) {
      // 선택된 새로운 배차 상태로 변경
      item.dispatchStatus = selectedDispatchStatus.value;
    }
  });

  // 모달 닫기
  dispatchChangeModal.value = false;

  // 선택된 체크박스 초기화
  selectedItems.value.clear(); // Set 객체이므로 clear()로 전체 해제
  isAllPagesSelected.value = false; // 전체 선택 해제

  // 배차 상태 필터를 '전체배차' 상태로 초기화 ('all3'는 전체 항목 보여주는 값으로 가정)
  dispatchStatusFilter.value = "all3";

  // 배차 수정 모드 종료
  showCheckboxes.value = false; // 체크박스 숨기기
  modifyDispatchStatus.value = false; // 수정 모드 false
  modifyBtn.value = true; // 수정 버튼 다시 활성화

  // 페이지네이션을 1페이지로 초기화
  currentPage.value = 1;
};

// 5-1. 미배차 예약 상세정보 관련 함수
const selectedItem = ref(null);

const showReservationDetails = (item) => {
  selectedItem.value = {
    ...item,
    id: item.id || "아이디 없음",
    customerName: item.customerName || "예약자명 미입력",
    phone: item.phone || "전화번호 미입력",
    address: item.address || "주소 미입력",
    detailaddress: item.detailaddress || "상세주소 미입력",
    reservationDate: item.reservationDate || "예약날짜 미입력",
    pickupDate: item.pickupDate || "픽업날짜 미입력",
    status: item.status || "상태없음",
    dispatchStatus: item.dispatchStatus || "배차정보 없음",
    area: item.area || "지역미정",
    clothes: item.clothes || "짐없음?",
  };
};
// 모달 닫기 
const closeSelectedItem = ()=>{
  selectedItem.value = null
}
</script>

<template>
  <div class="modal"></div>
  <!-- 전체 레이아웃 -->
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
      <div class="flex">
        <select v-model="dateStatus" class="">
          <option value="reservation">예약일자</option>
          <option value="pickup">픽업일자</option>
        </select>
        <div class="flex items-center gap-[20px]">
          <!-- 2-1-1. 날짜 검색 -->
          <div class="dateBox flex gap-[10px]">
            <input v-model="dateRange.start" type="date" class="border-none outline-none text-center align-middle" />
            <span class="text-[16px]">~</span>
            <input
              :min="dateRange.start"
              v-model="dateRange.end"
              type="date"
              class="border-none outline-none text-center align-middle" />
          </div>
        </div>
        <!-- 2-1-2. 다음 날 픽업날짜 목록보기 -->
        <div class="flex items-center gap-[10px]">
          <input type="checkbox" id="tomorrowPickUp" class="w-4 h-4" v-model="showTomorrowPickup" />
          <label for="tomorrowPickUp" class="text-gray">내일 픽업 날짜만 보기</label>
        </div>
      </div>
      <!-- 2-2. 상태(selectBox) 필터링 -->
      <div class="flex gap-[10px]">
        <!-- 2-2-1. 상태필터 -->
        <select v-model="statusFilter">
          <option value="all1">전체상태</option>
          <option value="pickupWait">픽업대기</option>
          <option value="deliveryWait">배송대기</option>
          <option value="delivery">배송중</option>
          <option value="complete">완료</option>
        </select>
        <!-- 2-2-2. 리스트 순서 필터 -->
        <select v-model="sortBy">
          <option value="newRv">최신예약순</option>
          <option value="name">이름순</option>
          <option value="number">예약번호순</option>
          <option value="oldRv">오래된예약순</option>
        </select>
        <!-- 2-2-3. 지역필터 -->
        <select v-model="areaFilter">
          <option value="all2">전체지역</option>
          <option value="center">중구</option>
          <option value="south">남구</option>
          <option value="north">북구</option>
          <option value="east">동구</option>
          <option value="west">서구</option>
          <option value="dalseo">달서구</option>
          <option value="suseong">수성구</option>
        </select>
        <!-- 2-2-4. 배차필터 -->
        <select v-model="dispatchStatusFilter">
          <option value="all3">전체배차</option>
          <option value="wait">배차대기</option>
          <option value="one">1호차</option>
          <option value="two">2호차</option>
          <option value="three">3호차</option>
        </select>
      </div>
    </div>
    <!-- 3.검색상자, 예약목록 리스트, 페이지네이션 -->
    <div class="w-2/2 flex flex-col align-center bg-white rounded-[10px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]">
      <!-- 3-1. 검색상자 -->
      <div class="flex justify-between w-full p-[20px]">
        <div class="flex align-center justify-center font-bold font-[16px]"><span>예약목록</span></div>
        <div class="searchbar flex align-center searchBox w-1/3 max-w-[500px] pr-2">
          <div class="w-5, h-5 mx-[10px]"><img class="w-full h-full" src="/images/lee/searchicon.png" alt="" /></div>
          <input
            v-model="searchQuery"
            @input="handleInput"
            type="text"
            placeholder="고객명 또는 주소로 검색하세요."
            class="w-full placeholder:text-[14px] py-[5px] outline-none" />
        </div>
      </div>
      <!-- 3-2. 예약목록 리스트 -->
      <table class="w-full">
        <!-- 3-2-1. 예약목록 구분 -->
        <thead class="bg-[#F9FAFB] w-2/2 border-t border-b border-gray pr-[65px]">
          <tr class="w-2/2 pl-[20px] pr-[65px]">
            <th class="pl-[20px] flex justify-center align-center" v-if="showCheckboxes">
              <div>
                <!-- :disabled="!filteredReservations.some((item) => item.dispatchStatus === 'wait')" -->
                <input class="w-4 h-4 align-middle" type="checkbox" v-model="isAllSelected" />
              </div>
            </th>

            <th v-else class="pl-[20px] flex justify-center align-center">
              <div class="w-4 h-4 align-middle"></div>
            </th>

            <th class="text-[13px] text-gray py-3">예약번호</th>
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
        <tbody v-for="item in paginatedReservations" :key="item.id" class="bg-white align-middle text-center">
          <tr>
            <td class="pl-[20px] py-1 align-middle text-[14px]">
              <!-- :disabled="!isCheckboxEnabled(item.dispatchStatus)" -->
              <!-- :class="{'opacity-50 cursor-not-allowed': !isCheckboxEnabled(item.dispatchStatus),}"  -->
              <input
                type="checkbox"
                v-if="showCheckboxes"
                :checked="selectedItems.has(item.id)"
                @change="toggleItem(item.id)"
                class="w-4 h-4 align-middle" />
            </td>
            <td class="align-middle text-[14px]">{{ item.id }}</td>
            <td class="align-middle text-[14px]">{{ item.customerName }}</td>
            <td class="align-middle text-[14px]">{{ item.phone }}</td>
            <td class="py-2 align-middle text-[14px]">
              {{ item.address }} <br />
              {{ item.detailaddress }}
            </td>
            <td class="align-middle text-[14px]">{{ item.reservationDate }}</td>
            <td class="align-middle text-[14px]">{{ item.pickupDate }}</td>
            <td class="align-middle text-[14px]">{{ getStatusText(item.status) }}</td>
            <td class="align-middle text-[14px]">{{ getdispatchStatusText(item.dispatchStatus) }}</td>
            <td class="pr-[65px] align-middle text-[14px]">
              <button @click="showReservationDetails(item)">상세</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 3-3. 페이지네이션 -->
      <div class="flex justify-center items-center rounded-[10px] p-4">
        <div class="flex gap-2">
          <!-- 3-3-1. 이전버튼(그룹단위) -->
          <button
            @click="prevPageGroup"
            :disabled="pageGroup === 0"
            class="px-2 py-1 border rounded-[10px] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
            <<
          </button>
          <!-- 3-3-2. 이전버튼(페이지단위) -->
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-2 py-1 border rounded-[10px] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
            <
          </button>
          <!-- 3-3-3. 클릭 시 페이지 이동 -->
          <button
            v-for="page in visiblePages"
            @click="goToPage(page)"
            class="w-10"
            :class="['px-3 py-1 text-[14px]', currentPage === page ? 'bg-gray-200 text-white rounded-[5px]' : '']">
            {{ page }}
          </button>
          <!-- 3-3-4. 다음버튼(페이지단위) -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 border rounded-[10px] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
            >
          </button>
          <!-- 3-3-5. 다음버튼(그룹단위) -->
          <button
            @click="nextPageGroup"
            :disabled="endPage === totalPages"
            class="px-2 py-1 border rounded-[10px] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
            >>
          </button>
        </div>
      </div>
    </div>

    <!-- 4. 배차변경 및 기사배정 버튼 -->
    <div class="flex flex-row-reverse gap-6 mb-[27px]">
      <!-- 4-1. 배차변경 클릭 전 -->
      <div class="flex gap-6" v-if="modifyDispatchStatus">
        <button @click="showDispatchChangeModal" class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">
          배차변경
        </button>
        <!-- <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">저장</button> -->
        <button @click="cancelDispatchClick" class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">
          수정완료
        </button>
      </div>
      <!-- 4-2. 배차변경 클릭 후 -->
      <div class="flex gap-6" v-if="modifyBtn">
        <button @click="handleDispatchClick" class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">
          배차수정
        </button>
        <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">기사배정</button>
      </div>
    </div>
  </div>

  <!-- 5. 모달창 -->
  <!-- 5-1. 미배차 예약 상세정보 -->
  <div v-if="selectedItem" class="w-full h-[100%] bg-[#11111166] z-10 fixed top-0 left-0">
    <div
      class="w-1/2 w-max-[1000px] rounded-[10px{{  }}] bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <h4 class="font-bold p-[30px] ml-[15px] text-[20px] border-b border-[#E5E5EC]">예약 상세 정보</h4>
      <div class="flex px-[45px] my-[30px]">
        <!-- 5-1-1. 기본정보 -->
        <div class="flex flex-col flex-1 gap-[30px]">
          <h4 class="text-[18px] font-bold">기본정보</h4>
          <div class="flex flex-col gap-[30px]">
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">예약 번호</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.id}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">고객명</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.customerName}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">연락처</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.phone}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">주소</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.address}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">상세주소</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.detailaddress}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">짐종류</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.clothes}}</span>
            </div>
          </div>
        </div>
        <!-- 5-1-2. 일정정보 -->
        <div class="flex flex-col flex-1 gap-[30px]">
          <h4 class="text-[18px] font-bold">일정정보</h4>
          <div class="flex flex-col gap-[30px]">
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">예약일자</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.reservationDate}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">픽업일자</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{selectedItem.pickupDate}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">배차상태</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{getdispatchStatusText(selectedItem.dispatchStatus)}}</span>
            </div>
            <div class="flex gap-[30px]">
              <span class="block w-[70px] h-[20px] text-center text-[#505050] font-semibold">배정기사</span>
              <span class="w-[250px] h-[20px] text-left text-[#111] font-medium">{{}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 5-1-3. 상세정보 버튼들 -->
      <div class="flex flex-row-reverse px-[45px] pt-[10px] pb-[30px] gap-6">
        <button @click="closeSelectedItem" class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">닫기</button>
        <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white">기사배정</button>
      </div>
    </div>
  </div>
  <!-- 5-2. 배차완료 예약 상세정보 -->
  <div class="none w-full h-[100%] bg-[#11111166] z-10 fixed top-0 left-0">
    <div class="w-1/2 w-max-[900px] bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <h4 class="font-bold m-[30px]">예약 상세 정보</h4>
    </div>
  </div>
  <!-- 5-3. 배차변경 모달 -->
  <div v-if="dispatchChangeModal" class="w-full h-[100%] bg-[#11111166] z-10 fixed top-0 left-0">
    <div
      class="flex flex-col align-center gap-[50px] w-[450px] rounded-[10px] bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <h4 class="font-bold p-[30px] text-center text-[22px] border-b-[1px] border-b-[#E5E5EC]">배차변경</h4>
      <p class="text-center">선택하신 총 {{ selectedItems.size }}건의 배차상태가 다음과 같이 변경됩니다.</p>
      <div class="flex flex-col align-center gap-[25px]">
        <div class="flex align-center justify-center gap-[30px]">
          <span class="text-bold">변경 전</span>
          <div class="block w-[200px]">
            <div v-if="currentDispatchCounts.wait > 0">배차대기: {{ currentDispatchCounts.wait }}건</div>
            <div v-if="currentDispatchCounts.one > 0">1호차: {{ currentDispatchCounts.one }}건</div>
            <div v-if="currentDispatchCounts.two > 0">2호차: {{ currentDispatchCounts.two }}건</div>
            <div v-if="currentDispatchCounts.three > 0">3호차: {{ currentDispatchCounts.three }}건</div>
          </div>
        </div>
        <div class="flex align-center justify-center gap-[30px]">
          <label class="text-bold">변경 후</label>
          <select v-model="selectedDispatchStatus">
            <option value="one">1호차</option>
            <option value="two">2호차</option>
            <option value="three">3호차</option>
          </select>
        </div>
      </div>
      <div class="flex align-center justify-center gap-5 mb-[40px]">
        <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white" @click="saveDispatchChange">완료</button>
        <button class="w-36 h-12 bg-neutral-500 rounded-[10px] text-white" @click="closeDispatchChangeModal">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dateBox {
  padding: 5px 0;
  margin-right: 10px;
  color: rgba(118, 118, 118, 1);
}
select {
  border: 1px solid rgba(217, 217, 217, 1) !important;
  border-radius: 10px;
  width: 100px;
  font-size: 14px;
  color: rgba(118, 118, 118, 1);
  outline: none;
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
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
tbody td {
  border-bottom: 1px solid #d9d9d9;
}
.modal {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.none {
  display: none;
}
</style>
