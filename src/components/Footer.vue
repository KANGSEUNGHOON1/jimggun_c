<script setup>
import { useI18n } from "vue-i18n";

const { t, locale, messages } = useI18n();
</script>

<template>
  <!-- 전체 레이아웃 -->
  <div class="footerWrap">
    <!-- 이너 -->
    <div class="footer footerInner">
      <!-- 로고 -->
      <router-link to="/" class="footerLogo">
        <img src="/public/images/jimggun_logo.png" alt="짐꾼로고" />
      </router-link>
      <!-- 푸터 콘텐츠 -->
      <div class="footercontents">
        <!-- 왼쪽 텍스트 정보 -->
        <div class="footerLeftText">
          <p>{{t("boss")}}</p>
          <p>{{t("address")}}</p>
          <p>{{t("businessNumber")}}</p>
          <p>{{t("privacyOfficer")}}</p>
          <p>{{t("email")}} : jimggun@gmail.com</p>
          <p>Copyright ⓒ JIMGGUN Corp. All Rights Reserved.</p>
        </div>
        <!-- 오른쪽 -->
        <div class="footerRightText">
          <p class="footerPhonNumber">1234-5678</p>
          <div class="footerTime">
            <p>{{t("operating")}}</p>
            <p>{{t("holiday")}}</p>
          </div>
          <div class="footerRightButtons">
            <a href="#">{{t("partnership")}}</a>
            <router-link to="/cs">{{t("cs")}}</router-link>
          </div>
          <div class="footerRightServices">
            <p>{{t("termsService")}}</p>
            <span>|</span>
            <p>{{t("privacyPolicy")}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";
// 전체 레이아웃
.footerWrap {
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  color: $font-gray;
  position: relative;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.05);
  z-index: 2;
}
// 이너
.footerInner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: $white;
}
// 푸터
.footer {
  position: relative;
  height: 296px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
// 푸터 콘텐츠
.footercontents {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 로고
.footerLogo {
  display: block;
  width: 60px;
  padding-bottom: 30px;
  img {
    width: 100%;
  }
}
//  왼쪽 텍스트
.footerLeftText {
  p {
    margin-bottom: 8px;
  }
}
// 오른쪽 영역
.footerRightText {
  text-align: right;
  .footerPhonNumber {
    font-size: $title-font-S;
    color: $font-primary;
    font-weight: 600;
  }
  .footerTime{
    display: flex;
  }
  p {
    margin-bottom: 12px;
  }
  button {
    margin-bottom: 12px;
    &:first-child {
      margin-right: 6px;
    }
  }
  span {
    margin-bottom: 12px;
  }
}
.footerRightButtons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-bottom: 12px;
  a {
    cursor: pointer;
    height: 24px;
    font-size: 12px;
    color: $font-gray;
    background-color: $white;
    padding: 3px 8px;
    border: 1px solid $bg-primary;
    text-decoration: none;
    line-height: 16px;
  }
}
.footerRightServices {
  display: flex;
  justify-content: flex-end;
  span {
    margin: 0 20px;
    color: $bg-primary;
  }
}
@media screen and (max-width: 589px) {
  .footerLeftText p {
    font-size: $text-font-XS !important;
  }
  .footerRightText .footerPhonNumber{
    font-size: 18px !important;
    margin-bottom: 8px !important;
  }
  .footerRightText p {
    font-size: $text-font-XS !important;
    margin-bottom: 8px !important;
  }
  .footerTime {
    display: flex !important;
    flex-direction: column !important;
  }
  .footerRightButtons {
    gap: 4px !important;
    margin-bottom: 8px !important;
  }
  .footerRightButtons a {
    width: 57px !important;
    font-size: 11px !important;
  }
  .footerRightServices {
    display: flex !important;
    flex-direction: column !important;
  }
  .footerRightServices p {
    font-size: 11px !important;
    margin-bottom: 5px !important;
  }
  .footerRightServices span {
    display: none !important;
  }
}
@media screen and (max-width: 390px) {
  
}
</style>
