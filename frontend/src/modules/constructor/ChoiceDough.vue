<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  doughItems: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="doughType in doughItems"
          :key="doughType.id"
          class="dough__input"
          :class="`dough__input--${doughType.value}`"
        >
          <input
            type="radio"
            name="dought"
            :value="doughType.value"
            class="visually-hidden"
            :checked="doughType.value === modelValue"
            @input="emit('update:modelValue', doughType.value)"
          />
          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
