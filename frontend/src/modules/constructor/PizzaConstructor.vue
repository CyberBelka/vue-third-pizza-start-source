<script setup>
import { computed } from "vue";
import AppDrop from "@/common/components/AppDrop.vue";

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

const props = defineProps({
  dough: {
    type: String,
    default: "big",
  },
  sauce: {
    type: String,
    default: "tomato",
  },
  ingredients: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["drop"]);

const pizzaIngredients = computed(() => {
  return Object.entries(props.ingredients).reduce((result, entry) => {
    const [key, value] = entry;

    if (value > 0) {
      result[key] = value;
    }

    return result;
  }, {});
});
</script>

<template>
  <div class="content__constructor">
    <app-drop @drop="emit('drop', $event.value)">
      <div class="pizza" :class="`pizza--foundation--${dough}-${sauce}`"> 
        <div class="pizza__wrapper">
          <div
            v-for="(value, key) in pizzaIngredients"
            :key="key"
            class="pizza__filling"
            :class="[
              `pizza__filling--${key}`,
              value === TWO_INGREDIENTS && 'pizza__filling--second',
              value === THREE_INGREDIENTS && 'pizza__filling--third',
            ]"
          />
        </div>
      </div>
    </app-drop>
  </div>
</template>
