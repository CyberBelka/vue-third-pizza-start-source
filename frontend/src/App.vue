<template>
  <app-layout>
    <home-view />
  </app-layout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import HomeView from "@/views/HomeView.vue";
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
.main__wrapper {
  padding-bottom: 30px;

  background-color: $white;
  box-shadow: $shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: $green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}
</style>
