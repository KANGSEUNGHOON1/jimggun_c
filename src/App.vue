<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isPopup = computed(() => route.query.popup === "true");
</script>

<template>
  <Header class="header" v-if="!isPopup" />

  <main>
    <router-view></router-view>
  </main>
  <footer>
    <Footer v-if="!isPopup" />
  </footer>
</template>

<style scoped>
/* main{
  text-align: center;
  padding: 20px;
} */
.header {
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 2;
}
</style>
