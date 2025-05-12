<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isPopup = computed(() => {
  return route.query.popup === 'true' || route.path.startsWith('/admin') || route.path.startsWith('/worker');
});
</script>

<template>
  <Header class="header" v-if="!isPopup" />

  <main :class="{'special-content': isPopup}">
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
.special-content{
  padding: 0;
  margin: 0;
}
.special-content main{
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}
</style>
