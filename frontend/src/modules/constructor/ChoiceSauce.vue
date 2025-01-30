<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  sauceItems: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauceType in sauceItems"
      :key="sauceType.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauceType.value"
        :checked="sauceType.value === modelValue"
        @input="emit('update:modelValue', sauceType.value)"
      />
      <span>{{ sauceType.name }}</span>
    </label>
  </div>
</template>
