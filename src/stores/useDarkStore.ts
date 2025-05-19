import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

export const useDarkStore = defineStore("dark", () => {
  const isDark = ref(false);

  // 초기화: localStorage → 다크모드 적용
  const initDark = () => {
    const stored = localStorage.getItem("isDark");
    isDark.value = stored === "true";
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  // 토글 함수
  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  // 반응형 감시로 <html> class 및 localStorage 동기화
  watch(isDark, (val) => {
    document.documentElement.classList.toggle("dark", val);
    localStorage.setItem("isDark", val.toString());
  });

  //  최초 실행 시 한 번만 적용
  onMounted(() => {
    initDark();
  });

  return { isDark, toggleDark };
});
