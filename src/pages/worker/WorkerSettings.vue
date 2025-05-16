<template>
  <!--배경색-->
  <div class="bg-white md:bg-[#FDF3E7] min-h-screen flex flex-col">
    <!--전체영역-->
    <div class="w-full max-w-[768px] mx-auto h-screen bg-white flex-1">
      <h1>환경설정</h1>
      <!--네비게이션 바-->
      <div
        class="fixed bottom-0 w-full max-w-[768px] py-3 px-[100px] bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] flex mx-auto justify-between items-center gap-20 overflow-hidden z-50"
      >
        <!-- 홈 아이콘 -->
        <router-link to="/worker/worker-home">
          <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
            <img src="/images/kang/home.png" alt="home" />
            <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">홈</div>
          </div></router-link
        >

        <!-- 알림 아이콘 -->
        <router-link to="/worker/worker-notice">
          <div class="flex flex-col items-center gap-2 w-14 cursor-pointer">
            <img src="/images/kang/notice.png" alt="notice" />
            <div class="w-12 text-center text-[#111] text-base font-medium font-['Pretendard']">알림</div>
          </div></router-link
        >

        <!-- 마이페이지 아이콘 -->
        <router-link to="/worker/worker-mypage">
          <div class="flex flex-col items-center gap-2.5 w-14 transition-transform hover:scale-105">
            <img src="/images/kang/mypage.png" alt="mypage" />
            <div class="w-20 text-center text-[#111] text-base font-medium font-['Pretendard']">마이페이지</div>
          </div></router-link
        >

        <!-- 환경설정 아이콘 -->
        <router-link to="/worker/worker-settings">
          <div class="flex flex-col items-center gap-2.5 w-14 cursor-pointer transition-transform hover:scale-105">
            <img src="/images/kang/settingsActive.png" alt="settings" />
            <div class="w-full text-center text-[#FF6F00] text-base font-medium font-['Pretendard']">환경설정</div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>
