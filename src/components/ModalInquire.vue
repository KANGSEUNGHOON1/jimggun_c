<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

defineProps({ isOpen: Boolean });
const emit = defineEmits(['close', 'select']);

const close = () => emit('close');
const activeTab = ref('tab1'); // 기본 선택된 탭
const selectedArea = ref(null);

// 탭 변경 함수
const setTab = (tab) => {
  activeTab.value = tab;
};

const selectArea = (area) => {
  selectedArea.value = area;
  emit('select', area); // 선택된 지역 값을 emit
};
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">
        <img src="/images/kang/close.png" alt="close" />
      </button>
      <div class="inqTitle">
        <h2>출발지 조회</h2>
      </div>
      <div class="area-content">
        <div class="tabs">
          <!-- 탭 버튼 -->
          <button type="button" @click="setTab('tab1')" :class="{ active: activeTab === 'tab1' }">역공항</button>
          <button type="button" @click="setTab('tab2')" :class="{ active: activeTab === 'tab2' }">주소검색</button>
        </div>

        <!-- 탭 콘텐츠 -->
        <div class="tab-content">
          <div class="tab1" v-if="activeTab === 'tab1'">
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">서울</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('김포공항 국내선')">
                  <p>김포공항 국내선</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('서울역')">
                  <p>서울역</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('서울고속터미널')">
                  <p>서울고속터미널</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('용산역')">
                  <p>용산역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">부산</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('부산역')">
                  <p>부산역</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('부산항 국제여객터미널')">
                  <p>부산항 국제여객터미널</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('김해공항 국내선')">
                  <p>김해공항 국내선</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('김해공항 국제선')">
                  <p>김해공항 국제선</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('BEXCO')">
                  <p>BEXCO</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">제주</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('제주공항')">
                  <p>제주공항</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">강릉/양양</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('강릉역')">
                  <p>강릉역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">경주</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('경주역')">
                  <p>경주역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">여수</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('여수엑스포역')">
                  <p>여수엑스포역</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('여수종합버스터미널(금호고속)')">
                  <p>여수종합버스터미널(금호고속)</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">대구</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('대구공항 국내선')">
                  <p>대구공항 국내선</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('동대구역')">
                  <p>동대구역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">광주</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('광주 유스퀘어(금호고속)')">
                  <p>광주 유스퀘어(금호고속)</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('광주송정역')">
                  <p>광주송정역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">목포</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('목포역')">
                  <p>목포역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">경기/인천</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('김포공항 국내선')">
                  <p>김포공항 국내선</p>
                </button>
                <button type="button" class="areaSelectBox-btn" @click="selectArea('광명역')">
                  <p>광명역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">천안/아산</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('천안아산역')">
                  <p>천안아산역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">청주</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('오송역')">
                  <p>오송역</p>
                </button>
              </div>
            </div>
            <div class="areaSelectBox">
              <h3 class="areaSelectBox-title">대전</h3>
              <div class="areaSelectBox-btn-box">
                <button type="button" class="areaSelectBox-btn" @click="selectArea('대전역')">
                  <p>대전역</p>
                </button>
              </div>
            </div>
            <div class="next-btn-box">
              <button type="button" class="next-btn" @click="close">확인</button>
            </div>
          </div>
          <div v-if="activeTab === 'tab2'">
            <div class="notice-box">
              <p class="notice-text">
                • '물품보관장소'를 정확히 작성해 주세요. 부정확할 경우
                <strong>예약취소 및 추가 비용</strong>이 발생할 수 있으며,
                <strong>분실/도난/변질에 대한 책임은 짐꾼에서 부담하지 않습니다.</strong>
              </p>
              <p class="notice-text">• 주소지 배송은 같은 지역 내에서만 가능합니다.</p>
            </div>
            <div class="address-box">
              <button type="button" class="address-btn">주소검색</button>
              <input type="text" class="address-input" placeholder="기본주소" />
              <input type="text" class="address-input" placeholder="상세주소" />
            </div>
            <div class="place-box">
              <p class="place-text">물품보관 장소</p>
              <input
                type="text"
                class="place-input"
                placeholder="예) 문 앞 (공동현관 비밀번호 0000#), 경비실, 택배함 등"
              />
            </div>
            <div class="complete-btn-box">
              <button type="button" class="complete-btn" @click="close">주소지선택 완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/variables';
// 모달창
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13;
}
.modal-content {
  background: white;
  // width: 1472px;
  width: 76.6%;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border-radius: 10px;
  font-family: $font-family;
}
.close-btn {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  img {
    width: 100%;
  }
}

// 상단 텍스트
.inqTitle {
  border-bottom: 1px solid $bg-primary;
}
h2 {
  line-height: 56px;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin-left: 16px;
}
.area-content {
  // width: 1440px;
  width: 97.8%;
  margin: auto;
}
//탭 버튼
.tabs {
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.tabs > button {
  padding: 8px 16px;
  border: none;
  background-color: #fff;
  color: $font-gray;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.tabs > button.active {
  border-bottom: 4px solid $font-gray;
  font-weight: bold;
  color: $font-primary;
}

// 탭 1

.areaSelectBox {
  width: 97.8%;
  margin: auto;
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: flex-start;
}
.areaSelectBox-title {
  margin: 24px 12px;
  font-size: 18px;
  font-weight: bold;
  color: $font-primary;
}
// 탭1 지역 선택 버튼
.areaSelectBox-btn-box {
  display: flex;
  gap: 10px;
}
.areaSelectBox-btn {
  border-radius: 50px;
  border: $input-select solid 1px;
  background-color: #fff;
  color: $font-light-gray;
  cursor: pointer;
}
.areaSelectBox-btn > p {
  padding: 6px 15px;
  font-size: 16px;
  font-weight: 500;
}
.areaSelectBox-btn:hover {
  border: $primary-color solid 1px;
  color: #fff;
  background-color: $primary-color; // #FF6F00 + 10% opacity
  p {
    font-weight: 700;
  }
}
// 탭1 확인 버튼
.next-btn-box {
  margin-top: 90px;
  border-top: solid 1px $bg-primary;
}
.next-btn {
  background: $primary-color;
  color: #fff;
  font-size: 16px;

  padding: 6px 12px;
  margin-left: 95.4%;
  margin-top: 12px;
  margin-bottom: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
// 선
.tab1:first-child {
  border-top: solid 1px $bg-primary;
}
// 탭2
// 탭2 주의사항 텍스트
.notice-box {
  padding: 25px 16px;
  text-align: left;
  border-top: solid 1px $bg-primary;
}
.notice-text {
  font-size: 16px;
  color: $font-gray;
  line-height: 32px;
}
strong {
  font-weight: bold;
  color: $font-primary;
}

// 탭2 주소
.address-box {
  width: 97.8%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-left: 12px;
  margin-bottom: 30px;
}

.address-btn {
  padding: 5px 8px;
  font-size: 14px;
  border: 1px solid $font-primary;
  border-radius: 6px;
  background-color: #fff;
  color: $font-light-gray;
  cursor: pointer;
}
.address-input {
  width: 98.3%;
  line-height: 45px;
  padding-left: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid $input-select;
}
// 탭2 물품보관장소
.place-box {
  width: 97.8%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-left: 12px;
  margin-bottom: 51px;
}
.place-text {
  font-size: 16px;
  color: $font-primary;
}
.place-input {
  width: 98.3%;
  line-height: 45px;
  padding-left: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid $input-select;
}
// 주소지선택 완료 버튼
.complete-btn-box {
  width: 100%;
  border-top: solid 1px $bg-primary;
}
.complete-btn {
  font-size: 16px;
  line-height: 20px;
  padding: 6px 12px;
  color: #fff;
  background-color: $primary-color;
  border: none;
  border-radius: 6px;
  margin: 12px auto;
  cursor: pointer;
}
//반응형
@media screen and (max-width: 1580px) {
  .next-btn {
    margin-left: 85%;
  }
}
@media screen and (max-width: 768px) {
  .modal-content {
    width: 85%;
  }
  .areaSelectBox-btn-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .next-btn {
    margin-left: 80%;
  }
}
@media screen and (max-width: 425px) {
  .modal-content {
    width: 90%;
  }
  .areaSelectBox-btn-box {
    grid-template-columns: repeat(1, 1fr);
    padding: 0px 15px;
  }
  .areaSelectBox-btn > p {
    font-size: 14px;
  }
  .areaSelectBox-title {
    margin: 18px 20px;
  }
  .notice-text {
    font-size: 14px;

    line-height: 28px;
  }
  .next-btn-box {
    margin-top: 40px;
  }
  .next-btn {
    margin-left: 75%;
    font-size: 14px;
  }
  .complete-btn {
    font-size: 14px;
  }
}
</style>
