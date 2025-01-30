<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  sizeItems: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="sizeType in sizeItems"
          :key="sizeType.id"
          class="diameter__input"
          :class="`diameter__input--${sizeType.value}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="sizeType.value"
            class="visually-hidden"
            :checked="sizeType.value === modelValue"
            @input="emit('update:modelValue', sizeType.value)"
          />
          <span>{{ sizeType.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
