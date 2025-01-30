<script setup>
import { toRef } from "vue";
import { INGREDIENTS_MAX_COUNT } from "../../common/constants";
import AppDrag from "../../common/components/AppDrag.vue";

const props = defineProps({
  values: {
    type: Object,
    default: () => ({}),
  },
  ingredientItems: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update"]);

const values = toRef(props, "values");

const getValue = (ingredient) => {
  return values.value[ingredient] ?? 0;
};

const setValue = (ingredient, count) => {
  emit("update", ingredient, Number(count));
};

const decrement = (ingredient) => {
  setValue(ingredient, getValue(ingredient) - 1);
};

const increment = (ingredient) => {
  setValue(ingredient, getValue(ingredient) + 1);
};

const inputValue = (ingredient, count) => {
  return setValue(ingredient, Math.min(INGREDIENTS_MAX_COUNT, Number(count)));
};
</script>

<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredientType in ingredientItems"
        :key="ingredientType.id"
        class="ingredients__item"
      >
        <app-drag
          :data-transfer="ingredientType"
          :draggable="getValue(ingredientType.value) < INGREDIENTS_MAX_COUNT"
        >
          <span class="filling" :class="`filling--${ingredientType.value}`">{{
            ingredientType.name
          }}</span>
        </app-drag>

        <div class="counter ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="getValue(ingredientType.value) === 0"
            @click="decrement(ingredientType.value)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="getValue(ingredientType.value)"
            @input="inputValue(ingredientType.value, $event.target.value)"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="getValue(ingredientType.value) === INGREDIENTS_MAX_COUNT"
            @click="increment(ingredientType.value)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
