<template>
  <div>
    <app-header />
    <slot />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import AppHeader from "./AppHeader.vue";

const route = useRoute();
</script>
