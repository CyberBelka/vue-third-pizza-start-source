<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "./AppLayoutDefault.vue";

const route = useRoute();

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        // Пробуем найти компонент из свойства meta и динамически импортировать его
        const component = await import(
          /* @vite-ignore */ `./${meta.layout}.vue`
        );
        layout.value = component?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (e) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        e,
      );
      layout.value = AppLayoutDefault;
    }
  },
);
</script>