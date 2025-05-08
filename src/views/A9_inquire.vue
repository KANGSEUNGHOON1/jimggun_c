<script setup>
import { ref, onMounted } from 'vue';

// 입력 값 저장할 ref들
const name = ref('');
const email = ref('');
const phone = ref('');

// onMounted에서 로컬스토리지 불러오기
onMounted(() => {
  const userDataRaw = localStorage.getItem('userDatas');
  if (userDataRaw) {
    try {
      const userList = JSON.parse(userDataRaw);
      const user = userList[0] || {};
      name.value = user.name || '';
      email.value = user.email || '';
      phone.value = user.phone || '';
    } catch (e) {
      console.error('userdatas 파싱 오류:', e);
    }
  }
});

// 문의하기 확인 모달
const showConfirmModal = ref(false);
// 문의하기 접수 완료 모달
const confirmModal = ref(false);

// 문의하기 버튼 클릭시
function submitInquiry() {
  showConfirmModal.value = true;
}

// 첫번째 모달 확인버튼 클릭 시 다음 모달 등장
const confirmModal1 = () => {
  confirmModal.value = true;
  showConfirmModal.value = false;
};
</script>

<template>
  <!-- 문의하기 전체 레이아웃 -->
  <div class="inquire-wrap">
    <div class="inquire-container inner">
      <!-- 문의하기 왼쪽 영역 -->
      <div class="inquire-left">
        <!-- 1-1. 문의하기 타이틀 -->
        <h2 class="inquire-title">문의하기</h2>
        <!-- 1-2. 문의하기 정보 -->
        <div class="inquire-info">
          <p class="inquire-text">
            <span>짐꾼은 항상 주인 곁에 있습니다.</span>
            <span>문의주시면 검토 후 빠른 답변 드리겠습니다.</span>
          </p>
          <div class="inquire-call">
            <div class="iq-telecom">
              <div class="img-box">
                <img src="/images/lee/telecom.png" alt="전화기" />
              </div>
              <p>
                <span>상담전화</span>
                <span>1234-5678 (평일 : 09:00 - 18:00)</span>
              </p>
            </div>
            <div class="iq-kakao">
              <div class="img-box">
                <img src="/images/kang/kakao.png" alt="카카오" />
              </div>
              <p>
                <span>카카오톡 문의</span>
                <span>24시간 연중무휴</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 2. 문의하기 오른쪽 영역 -->
      <div class="inquire-right">
        <form class="inquire-form" @submit.prevent="submitInquiry">
          <!-- 2-1. 문의유형 -->
          <div class="inquire-group">
            <label for="category" class="category-title"><span>1. 문의유형</span></label>
            <div class="a9group1">
              <select name="category" id="category" required>
                <option value="">선택하세요</option>
                <option value="reservation">예약 관련</option>
                <option value="service">서비스 관련</option>
                <option value="payment">결제 관련</option>
                <option value="cancellation">취소/환불</option>
                <option value="etc">기타 문의</option>
              </select>
            </div>
          </div>
          <!-- 2-2. 이름 -->
          <div class="inquire-group a9group2">
            <label for="name"><span>2. 이름</span></label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <!-- 2-3. 이메일 -->
          <div class="inquire-group a9group2">
            <label for="name"><span>3. 이메일</span></label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <!-- 2-4. 연락처 -->
          <div class="inquire-group a9group2">
            <label for="name"><span>4. 연락처</span></label>
            <input type="phone" id="phone" v-model="phone" required />
          </div>
          <!-- 2-5. 문의내용 -->
          <div class="inquire-group a9group3">
            <label for="name"><span>5. 문의내용</span></label>
            <textarea id="content" rows="4"></textarea>
          </div>
          <!-- 2-6. 첨부파일 -->
          <div class="inquire-group a9group4">
            <label for="name"><span>6. 첨부파일</span></label>
            <div class="file-box">
              <input type="file" id="file" required />
            </div>
          </div>
          <!-- 2-7. 개인정보 동의 -->
          <div class="a9group5">
            <div class="radio-wrap">
              <span>개인정보 수집 및 이용 동의 안내</span>
              <div class="radio-check">
                <label class="radio-label1">
                  <span>동의함</span>
                  <input type="radio" name="agree" required />
                </label>
                <label class="radio-label2">
                  <span>동의안함</span>
                  <input type="radio" name="agree" required />
                </label>
              </div>
            </div>
          </div>
          <!-- 2-8. 문의하기 버튼 -->
          <button type="submit" class="inquire-btn">문의하기</button>
        </form>
      </div>
    </div>
    <!-- 3. 문의하기 확인 모달 -->
    <div class="inquire-modal" v-if="showConfirmModal">
      <div class="modal-content">
        <p>문의를 접수하시겠습니까?</p>
        <button class="inquire-confirm" @click="confirmModal1">확인</button>
        <button class="modal-close" @click="showConfirmModal = false">닫기</button>
      </div>
    </div>
    <!-- 4. 문의하기 접수 완료 모달 -->
    <div class="inquire-modal1" v-if="confirmModal">
      <div class="modal-content1">
        <p>접수가 완료되었습니다.</p>
        <router-link to="/cs">확인</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/variables';
.inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}
.inquire-wrap {
  width: 100%;
  background-color: $sub-color;
  .inquire-container {
    width: 100%;
    display: flex;
    // margin-top: 100px;
    padding-top: 100px;
    padding-bottom: 50px;
    @media screen and (max-width : 768px){
      flex-direction: column !important;
      gap: 70px !important;
    }
    // 1. 문의하기 왼쪽 영역
    .inquire-left {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      gap: 60px;

      // 1-1. 문의하기 타이틀
      .inquire-title {
        width: 100%;
        font-size: $title-font-L + 4px;
        font-weight: bold;
        text-align: center;
      }
      // 1-2. 문의하기 정보
      .inquire-info {
        display: flex;
        flex-direction: column;
        gap: 60px;
        .inquire-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
          span {
            font-size: $text-font-XL;
            font-weight: bold;
            color: $font-light-gray;
          }
        }
        .inquire-call {
          display: flex;
          flex-direction: column;
          // align-items: center;
          gap: 40px;
          .iq-telecom {
            display: flex;
            align-items: center;
            gap: 20px;
            .img-box {
              width: 50px;
              height: 50px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p {
              display: flex;
              flex-direction: column;
              gap: 8px;
              span {
                color: $font-light-gray;
                font-size: $text-font-L;
                font-weight: bold;
              }
            }
          }
          .iq-kakao {
            display: flex;
            align-items: center;
            gap: 20px;
            .img-box {
              width: 50px;
              height: 50px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p {
              display: flex;
              flex-direction: column;
              gap: 8px;
              span {
                color: $font-light-gray;
                font-size: $text-font-L;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    // 2.문의하기 오른쪽 영역
    .inquire-right {
      width: 100%;
      position: relative;
      flex: 1;

      .inquire-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // align-items: center;
        gap: 25px;
        // from 그룹 전체
        .inquire-group {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          label {
            span {
              font-weight: bold;
              font-size: $text-font-M;
              color: $font-light-gray;
            }
          }
          input {
            width: 100%;
            max-width: 500px;
            border-radius: 10px;
            outline: none;
            border: none;
            color: $font-light-gray;
            font-size: $text-font-S;
            padding: 10px;
            height: 45px;
          }
          // 2-1. 문의유형
          .a9group1 {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 500px;
            background-color: $white;
            border-radius: 10px;
            #category {
              width: 100%;
              max-width: 480px;
              border: none;
              outline: none;
              padding: 14px 5px;
              font-size: $text-font-M;
              color: $font-light-gray;
              border-radius: 10px;
            }
          }
        }
        // 2-5. 문의내용
        .a9group3 {
          width: 100%;
          // background-color: $white;
          textarea {
            border: none;
            outline: none;
            resize: none;
            border-radius: 10px;
            color: $font-light-gray;
            font-size: $text-font-S;
            font-weight: 500;
            height: 150px;
            padding: 10px;
          }
        }
        // 2-6. 첨부파일
        .a9group4 {
          .file-box {
            background-color: $white;
            border-radius: 10px;
          }
        }
        // 2-7. 개인정보 동의
        .a9group5 {
          width: 100%;
          max-width: 500px;
          .radio-wrap {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 25px;
            span {
              color: $font-light-gray;
              font-size: $text-font-S;
            }
            .radio-check {
              display: flex;
              align-items: center;
              gap: 15px;
              .radio-label1 {
                display: flex;
                align-items: center;
                gap: 3px;
              }
              .radio-label2 {
                display: flex;
                align-items: center;
                gap: 3px;
              }
            }
          }
        }
        // 2-8. 문의하기 버튼
        .inquire-btn {
          width: 100%;
          max-width: 240px;
          background-color: $primary-color;
          border-radius: 10px;
          font-weight: bold;
          border: none;
          color: #fff;
          padding: 6px 12px;
          font-size: 14px;
          margin-top: 20px;
          cursor: pointer;
          &:hover {
            background-color: $primary-hover;
          }
        }
      }
    }
  }
  // 3. 문의하기 모달 영역
  .inquire-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    .modal-content {
      background-color: white;

      padding: 40px 30px;
      border-radius: 8px;
      text-align: center;
      .modal-content p {
        color: $font-primary;
        font-family: $font-family;
      }
      button {
        padding: 10px 20px;
        margin-top: 30px;
        background-color: $primary-color;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .modal-close {
        margin-left: 5px;
      }
    }
  }
  // 4. 문의하기 접수 완료 모달
  .inquire-modal1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    .modal-content1 {
      background-color: white;

      padding: 40px 30px;
      border-radius: 8px;
      text-align: center;
      .modal-content p {
        color: $font-primary;
        font-family: $font-family;
      }
      a {
        display: block;
        padding: 10px 20px;
        margin-top: 30px;
        background-color: $primary-color;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
