<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";

// 플로팅 버튼들 전체
// 로그인 상태 기반 라우터 설정
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.getIsLoggedIn);
const router = useRouter();

// gotop 버튼
const smoothlyBtn = ref(null);
const topBtnWrap = ref(null);
const isFooterVisible = ref(false);

// resBtn 버튼 클릭 시 라우팅
function handleGoToReservation() {
  if (isLoggedIn.value) {
    router.push("/reservation");
  } else {
    router.push("/reslogin");
  }
}

// top 버튼 부드럽게
onMounted(() => {
  smoothlyBtn.value?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 푸터요소 관찰
  const footer = document.querySelector("footer");
  if (footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible.value = entry.isIntersecting;
        });
      },
      {
        threshold: 0.01,
        rootMargin: "-100px 0px 0px 0px",
      }
    );
    observer.observe(footer);
  }
});

// 질문 별 주제 카테고리 데이터 더미
const categories = [
  { id: 'all', name: '전체' },
  { id: 'reserve', name: '예약 관련' },
  { id: 'deliver', name: '배송 관련' },
  { id: 'service', name: '서비스 관련' },
  { id: 'payment', name: '결제 관련' },
  { id: 'cancellation', name: '취소/환불' },
];

// faqs 질문 및 답변 데이터 더미
const faqs = reactive([
  {
    id: 1,
    category: 'deliver',
    question: '내 짐의 도착시간은 어떻게 되나요?',
    answer: '고객님이 설정하신 도착예정시간 이전에 배송될 예정입니다.',
    isOpen: false,
  },
  {
    id: 2,
    category: 'deliver',
    question: '배송 상태를 어떻게 확인할 수 있나요?',
    answer: '배송 상태는 마이페이지에 배송조회를 통해서 확인하실 수 있습니다.',
    isOpen: false,
  },
  {
    id: 3,
    category: 'deliver',
    question: '수화물의 위치를 실시간으로 추적할 수 있나요?',
    answer: '수화물의 위치는 자세한 실시간 위치는 기사님의 안전 및 짐꾼의 정책상 제공되지 않습니다.',
    isOpen: false,
  },
  {
    id: 4,
    category: 'deliver',
    question: '도착예정시간보다 늦게 도착하면 어떻게 해야 하나요?',
    answer: '예약일 24시간 전까지는 예약 변경이 가능합니다. 마이페이지에서 예약 내역을 확인하고 변경할 수 있습니다.',
    isOpen: false,
  },
  {
    id: 5,
    category: 'payment',
    question: '추가 요금이 발생할 수 있는 경우는 언제인가요?',
    answer: '추가요금은 거리에 따른 추가요금이 발생할 수 있습니다. 자세한 참고사항은 요금안내를 참고해주세요.',
    isOpen: false,
  },
  {
    id: 6,
    category: 'service',
    question: '운송이 불가능한 물품은 무엇인가요?',
    answer: '위험성 품목, 분실 및 도난의 우려가 있는 귀중품, 동·식물 등이 있습니다.',
    isOpen: false,
  },
  {
    id: 7,
    category: 'service',
    question: '위험물도 운송할 수 있나요?',
    answer: '위험물은 짐꾼의 정책상 운송이 불가능 합니다.',
    isOpen: false,
  },
  {
    id: 8,
    category: 'service',
    question: '수화물 파손 또는 분실 시 보상은 어떻게 되나요?',
    answer: '짐꾼에서 책정한 보상특약에 따라 보상됩니다.',
    isOpen: false,
  },
  {
    id: 9,
    category: 'service',
    question: '짐을 직접 맡길 수 있는 장소가 어디인가요?',
    answer: '예약하기 시 출발지의 적으신 주소의 문앞에서 픽업할 예정입니다.',
    isOpen: false,
  },
  {
    id: 10,
    category: 'service',
    question: '집에서 수거 서비스를 신청할 수 있나요?',
    answer:
      '짐꾼은 고객님들이 작성해주신 주소의 문앞에 있는 짐을 도착지의 문앞(또는 안내데스크 등)까지 배송해드립니다.',
    isOpen: false,
  },
  {
    id: 11,
    category: 'deliver',
    question: '운송 취소 시 환불이 가능한가요?',
    answer: '운송 중에 취소는 불가하며, 나의 짐 픽업 1일 전 취소 시 50%를 환불해주며 그 전에는 100% 환불해드립니다.',
    isOpen: false,
  },
  {
    id: 12,
    category: 'service',
    question: '특정 크기 이상의 짐도 운반이 가능한가요?',
    answer:
      '특정 크기 이상의 짐은 고객센터의 문의 후에 운반이 가능합니다. 단, 너무 큰 짐들의 경우 추가요금이 붙을 수 있습니다.',
    isOpen: false,
  },
  {
    id: 13,
    category: 'service',
    question: '식품이나 신선식품도 운반이 가능한가요?',
    answer: '아이스박스에 포장이 된 식품이나 신선식품들은 운반이 가능합니다.',
    isOpen: false,
  },
  {
    id: 14,
    category: 'deliver',
    question: '운송 중 짐의 위치를 변경할 수 있나요?',
    answer: '운송이 시작되면 도착지의 위치를 변경하기 어렵습니다.',
    isOpen: false,
  },
  {
    id: 15,
    category: 'deliver',
    question: '체크인 시간이 지났는데도 짐이 도착하지 않았어요.',
    answer: '교통상황에 따라 도착예정시간보다 조금 늦을 수 있습니다.',
    isOpen: false,
  },
  {
    id: 16,
    category: 'deliver',
    question: '역이나 공항같은 경우에도 비대면으로 이루어지나요?',
    answer: '짐꾼의 무인보관함이 있는 경우 비대면이 가능하며, 없는 경우에는 대면으로 이루어집니다.',
    isOpen: false,
  },
  {
    id: 17,
    category: 'service',
    question: '섬지역에서도 이용이 가능한가요?',
    answer: '짐꾼의 특성상 섬지역의 이용은 불가능합니다.',
    isOpen: false,
  },
  {
    id: 18,
    category: 'reserve',
    question: '내짐 사진등록은 어떻게 하나요?',
    answer:
      '예약이 완료된 후 문자나 카카오톡으로 사진을 업로드 할 수 있는 링크를 보내드립니다. 집을 문밖에 두신 후 사진을 촬영하시고, 업로드해주세요.',
    isOpen: false,
  },
  {
    id: 19,
    category: 'reserve',
    question: '캐리어나 가방 이외의 기타품목은 어떤 것까지 옮겨주나요?',
    answer:
      '기타품목으로 골프백, 아이스박스, 자전거, 피아노 등 다양한 품목들을 옮겨드립니다. 자세한 사항은 고객센터로 문의주세요.',
    isOpen: false,
  },
  {
    id: 20,
    category: 'reserve',
    question: '예약한 내용과 짐의 사이즈가 다르면 어떻게 되나요?',
    answer:
      '예약한 내용과 짐의 사이즈가 다를경우 추가요금을 요청할 수 있으며, 여러차례 연락에도 불구하고 부재중 시 서비스가 취소될 수 있습니다.(환불 x)',
    isOpen: false,
  },
  {
    id: 21,
    category: 'reserve',
    question: '주말에도 서비스 예약신청이 가능한가요?',
    answer: '당일 예약이 아닌 이상 짐꾼의 서비스 예약신청은 항상 가능합니다.',
    isOpen: false,
  },
  {
    id: 22,
    category: 'reserve',
    question: '추가요금이 붙었는데 이유가 무엇인가요?',
    answer:
      '짐꾼은 직선거리 기준 150km를 기준으로 동일권역과 타권역으로 나누고 있으며, 타권역에 해당하는 경우 추가요금이 붙을 수 있습니다. 자세한 사항은 요금안내를 참고해주세요.',
    isOpen: false,
  },
  {
    id: 23,
    category: 'reserve',
    question: '예약은 몇시까지 신청해야 하나요?',
    answer: '서비스 이용 하루 전 날 18시까지 신청을 부탁드립니다.',
    isOpen: false,
  },
  {
    id: 24,
    category: 'reserve',
    question: '예약을 취소하려면 어떻게 해야하나요?',
    answer:
      '마이페이지 - 최근 이용 내역 - 전체내역에서 인수 대기의 품목에 한해서 예약이 취소 가능합니다. 예약취소를 원할 시 예약취소 버튼을 눌러주세요',
    isOpen: false,
  },
  {
    id: 25,
    category: 'reserve',
    question: '예약을 수정하려면 어떻게 해야하나요?',
    answer:
      '마이페이지 - 최근 이용 내역 - 전체내역에서 인수 대기의 품목에 한해서 예약이 수정 가능합니다. 예약수정을 원할 시 예약수정 버튼을 눌러주세요',
    isOpen: false,
  },
  {
    id: 26,
    category: 'cancellation',
    question: '환불 요청시 처리기간은 어떻게 되나요?',
    answer: '환불 요청시 검토 후 환불 승인이 난 이후로 3영업일 이내에 결제하신 계좌로 환불됩니다.',
    isOpen: false,
  },
  {
    id: 27,
    category: 'payment',
    question: '무통장 입금 시 입금 계좌번호 안내',
    answer: '은행명 : 국민은행, 계좌번호 : 123456 00 654321, 이름 : 짐꾼',
    isOpen: false,
  },
  {
    id: 28,
    category: 'cancellation',
    question: '당일 날 서비스 예약이 가능한가요?',
    answer: '짐꾼의 특성상 당일 서비스 예약은 불가합니다.',
    isOpen: false,
  },
  {
    id: 29,
    category: 'cancellation',
    question: '환불 규정이 어떻게 되나요?',
    answer: '환불규정.pdf 다음 파일을 참고해주세요.',
    isOpen: false,
  },
]);

const activeIndex = ref(null);
const searchQuery = ref('');
const selectedCategory = ref('all');

function toggleFAQ(id) {
  activeIndex.value = activeIndex.value === id ? null : id;
}
function handleInput(event) {
  searchQuery.value = event.target.value;
}
// 필터링 된 FAQs 목록 계산

const filteredFAQs = computed(() => {
  return faqs.filter((faq) => {
    return (
      (selectedCategory.value === 'all' || faq.category === selectedCategory.value) &&
      (faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  });
});
// 페이지네이션 적용
// 페이지네이션 상태(현재페이지 저장)
const currentPage = ref(1);

// 현재 사용자가 보고 있는 페이지를 저장
const itemsPerpage = 8;

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredFAQs.value.length / itemsPerpage);
});

// 현재 페이지에 표시할 FAQ 목록(computed 사용)
const paginatedFAQs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerpage;
  const end = start + itemsPerpage;
  return filteredFAQs.value.slice(start, end);
});

// 카테고리 변경 시 페이지 초기화
function selectedCategory1(categoryId) {
  selectedCategory.value = categoryId;
  currentPage.value = 1; // 카테고리 변경 시 첫 페이지로 이동
}

// 검색어 변경 시 페이지 초기화
watch(searchQuery, () => {
  currentPage.value = 1; // 검색어 변경 시 첫 페이지로 이동
});

// 이전 버튼 클릭시
const prevPage = () => {
  activeIndex.value = null;
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 다음 버튼 클릭시
const nextPage = () => {
  activeIndex.value = null;
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

//로그인 상태에 따라서 다른 곳으로 이동하게 하는 함수
function goToInquire() {
  if (isLoggedIn.value) {
    router.push('/inquire');
  } else {
    router.push('/login');
  }
}
</script>

<template>
<!-- gotop 버튼 -->
<div class="topBtnWrap" ref="topBtnWrap" :class="{ 'footer-visible': isFooterVisible }">
    <a href="#" class="topBtn" ref="smoothlyBtn">↑</a>
    <div class="resBtn" @click="handleGoToReservation">
      <img src="/images/hong/gotopBtn-logo-w.png" alt="gotopBtn로고" />
      <span>고용하기</span>
    </div>
  </div>

  <!-- cs 전체 레이아웃 -->
  <section class="cs-container">
    <div class="cs-wrap">
      <!-- 0. 바로가기 -->
      <div class="quick-container">
        <div class="quick-bg"></div>
        <div class="quick-wrap inner">
          <h2 class="quick-title">짐꾼 고객센터</h2>
          <ul class="quick-menu">
            <li class="quick-list">
              <router-link to="/information">
                <div class="quick-img">
                  <img src="/images/lee/csphone.png" alt="핸드폰아이콘" />
                </div>
                <p class="quick-text">
                  <span class="quick-text1"><strong>이용방법</strong>이 궁금하신가요?</span>
                  <span class="quick-text2">이용안내 보러가기 ></span>
                </p>
              </router-link>
            </li>
            <li class="quick-list">
              <router-link to="/charge">
                <div class="quick-img quick-img2">
                  <img src="/images/lee/bill.png" alt="돈아이콘" />
                </div>
                <p class="quick-text">
                  <span class="quick-text1"><strong>요금</strong>이 궁금하신가요?</span>
                  <span class="quick-text2">요금안내 보러가기 ></span>
                </p>
              </router-link>
            </li>

            <li class="quick-list quick-list3">
              <a @click.prevent="goToInquire">
                <div class="quick-img">
                  <img src="/images/lee/consult.png" alt="헤드폰아이콘" />
                </div>
                <p class="quick-text">
                  <span class="quick-text1"><strong>상담</strong>이 필요하신가요?</span>
                  <span class="quick-text2">문의하러가기 ></span>
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 1. FAQ 제목 -->
      <h2 class="cs-title inner"><span>고객님들이 자주묻는 질문</span></h2>
      <!-- 2. 검색창 -->
      <div class="cs-search inner">
        <input type="text" v-model="searchQuery" @input="handleInput" placeholder="무엇이 궁금하신가요?" />
      </div>
      <!-- 3. 카테고리 탭 영역 -->
      <div class="cs-category inner">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['category-btn', { active: selectedCategory === category.id }]"
          @click="selectedCategory1(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
      <!-- 4. 자주묻는 질문들 -->
      <div class="cs-faqs inner">
        <div class="faq-list" v-for="faq in paginatedFAQs" :key="faq.id">
          <!--  4-1. 질문 -->
          <div class="faq-question" @click="toggleFAQ(faq.id)">
            <p class="question-text">{{ faq.question }}</p>
            <span class="arrow">{{ activeIndex === faq.id ? '▲' : '▼' }} </span>
          </div>
          <!-- 4-2. 답변 -->
          <div class="faq-answer" v-show="activeIndex === faq.id">
            <p class="answer-text">{{ faq.answer }}</p>
          </div>
        </div>
        <!-- 4-3. 페이지 네이션 -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">이전</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
        </div>
      </div>
      <!-- 5. 문의하기 -->
      <div class="contact-section inner">
        <p>원하는 답변을 찾지 못하셨나요?</p>
        <a @click.prevent="goToInquire">문의하기</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '/src/assets/variables';
// gotop 버튼
.topBtnWrap {
  position: fixed;
  right: 100px;
  bottom: 60px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 768px) {
    // gotop 버튼
    display: none !important;
  }

  &.footer-visible {
    transform: translateY(-250px);
  }
  .topBtn {
    color: $primary-color;
    font-size: 40px;
    text-decoration: none;
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 50%;
    background-color: $white;
    text-align: center;
    box-shadow: $info-boxShadow;
  }
  .resBtn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: $primary-color;
    text-align: center;
    box-shadow: $info-boxShadow;
    text-decoration: none;
    padding: 13.5px 0;
    span {
      display: inline-block;
      color: $white;
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
}

.inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}
a {
  text-decoration: none;
  color: $font-primary;
}
.cs-container {
  width: 100%;
  position: relative;
  // padding-bottom: 100px;
  .cs-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    // 0. 바로가기
    .quick-container {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .quick-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $sub-color;
        z-index: -1;
      }
      .quick-wrap {
        width: 100%;
        max-width: 1000px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 70px;
        @media screen and (max-width: 768px) {
          padding-bottom: 20px;
        }

        .quick-title {
          width: 100%;
          max-width: 400px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $primary-color;
          margin: 70px 0;
          color: $white;
          font-size: $text-font-L;
        }
        .quick-menu {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          // margin-top: 30px;
          // margin-bottom: 75px;
          @media screen and (max-width: 768px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
          }
          .quick-list {
            display: flex;
            align-items: center;
            width: calc(100% / 3);
            max-width: 270px;
            box-shadow: $reservation-boxShadow;
            border-radius: 10px;
            background-color: $white;
            @media screen and (max-width: 768px) {
              // flex-direction: row;
              width: 100% !important;
              max-width: 600px !important;
              // flex-direction: column;
            }
            a {
              display: flex;
              width: 100%;
              flex-direction: column;
              align-items: center;
              padding: 40px 0;
              gap: 30px;
              @media screen and (max-width: 768px) {
                flex-direction: row;
                padding: 20px 20px;
              }
              @media screen and (max-width: 450px) {
                padding: 20px 5px;
              }
              .quick-img {
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .quick-img2 {
                padding-left: 10px;
              }
              .quick-text {
                display: flex;
                flex-direction: column;
                gap: 10px;
                @media screen and (max-width: 768px) {
                  gap: 15px;
                }
                .quick-text1 {
                  font-size: $text-font-XL;
                  font-weight: 700;
                  @media screen and (max-width: 768px) {
                    font-size: $title-font-XS;
                  }
                  @media screen and (max-width: 450px) {
                    font-size: $text-font-L;
                    // padding: 20px 5px;
                  }
                  @media screen and (max-width: 390px) {
                    font-size: $text-font-M;
                  }
                }
                .quick-text2 {
                  padding-left: 5px;
                  font-size: $text-font-XS;
                  color: $font-light-gray;
                  @media screen and (max-width: 768px) {
                    font-size: $text-font-S;
                    padding: 0;
                    @media screen and (max-width: 450px) {
                      font-size: $text-font-XS;
                      // padding: 20px 5px;
                    }
                  }
                }
              }
            }
          }
          .quick-list3{
            cursor: pointer;
          }
        }
      }
    }
    // 1. cs 제목
    .cs-title {
      font-size: $title-font-M;
      font-weight: 200;
      min-width: 240px;
      text-align: center;
      margin-top: 100px;
      margin-bottom: 50px;
      span {
        // color: $primary-color;
      }
      @media screen and (max-width: 768px) {
        font-size: $title-font-S;
      }
      @media screen and (max-width: 390px) {
        font-size: $title-font-XS;
      }
    }
    // 2. 검색창
    .cs-search {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        max-width: 650px;
        width: 100%;
        padding: 10px;
        border: 1px solid $input-select;
        border-radius: 10px;
        //   font-size: 1rem;
        outline: none;
        &:focus {
          border: 1px solid $primary-hover;
        }
      }
    }
    // 3. 카테고리 탭 영역
    .cs-category {
      width: 100%;
      max-width: 650px;
      display: flex;
      gap: 20px;
      margin-top: 20px;
      padding: 0;
      @media screen and (max-width: 700px) {
        padding: 0 20px;
      }
      @media screen and (max-width: 600px) {
        gap: 5px;
      }
      @media screen and (max-width: 430px) {
        flex-wrap: wrap;
        // padding: 0;
      }
      .category-btn {
        width: calc(100% / 6);
        padding: 10px 0;
        color: $font-light-gray;
        border: 1px solid rgba(118, 118, 118, 1);
        border-radius: 10px;
        background-color: $white;
        font-weight: bold;
        cursor: pointer;
        @media screen and (max-width: 600px) {
          font-size: 11px;
        }
        @media screen and (max-width: 430px) {
          font-size: 11px;
          width: calc(100% / 4);
          margin: 5px auto;
          padding: 10px 0;
          justify-content: center;
          align-items: center;
        }
        &:hover {
          background-color: $primary-hover;
          color: $white;
          border: 1px solid $white;
        }
        &.active{
          background-color: $primary-color;
          color: $white;
          border: 1px solid $white;
        }
      }
    }
    // 4. 자주묻는 질문들
    .cs-faqs {
      background-color: white;
      margin-top: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media screen and (max-width: 430px) {
        margin-top: 20px;
      }
      .faq-list {
        display: flex;
        flex-direction: column;
        // align-items: center;
        max-width: 950px;
        width: 100%;

        // 4-1. 질문
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid $input-select;
          cursor: pointer;
          .question-text {
            color: $font-gray;
            font-weight: 500;
            padding: 10px 20px;
            margin: 13px 0;
            @media screen and (max-width: 490px) {
              font-size: $text-font-S;
            }
          }
          .arrow {
            color: $input-select;
            font-weight: 500;
            padding: 10px 20px;
          }
        }
        // 4-2. 답변
        .faq-answer {
          .answer-text {
            background-color: $sub-color;
            padding: 30px 0;
            padding-left: 60px;
            padding-right: 60px;
            font-weight: 400;
            @media screen and (max-width: 490px) {
              font-size: $text-font-S;
            }
          }
        }
      }
      // 4-3. 페이지네이션 버튼
      .pagination {
        width: 100%;
        // margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        margin-bottom: 50px;
        button {
          padding: 7px 18px;
          background-color: $white;
          border: 1px solid rgba(229, 229, 236, 1);
          cursor: pointer;
          border-radius: 10px;
          font-size: $text-font-S;
          color: $font-light-gray;
          &:disabled {
            background-color: rgba(229, 229, 236, 0.7);
            border: 1px solid rgba(229, 229, 236, 0.7);
            cursor: not-allowed;
          }
        }
      }
    }
    // 5. 문의하기
    .contact-section {
      width: 100%;
      max-width: 560px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      margin-top: 40px;
      margin-bottom: 100px;
      p {
        color: rgba(118, 118, 118, 0.5);
      }
      a {
        display: block;
        width: 130px;
        height: 45px;
        background-color: $primary-color;
        color: $white;
        border-radius: 10px;
        font-size: $text-font-M;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        line-height: 45px;
        cursor: pointer;
        &:hover {
          background-color: $primary-hover;
          color: $white;
        }
      }
    }
  }

  .category-btn.active {
    background: #4caf50;
    color: white;
    border-color: #4caf50;
  }
}
</style>
