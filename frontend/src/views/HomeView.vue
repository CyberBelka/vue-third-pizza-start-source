<script setup>
import { reactive, computed } from "vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

import dough from "@/mocks/dough.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import ChoiceDough from "../modules/constructor/ChoiceDough.vue";
import ChoiceSize from "../modules/constructor/ChoiceSize.vue";
import ChoiceSauce from "../modules/constructor/ChoiceSauce.vue";
import ChoiceIngredients from "../modules/constructor/ChoiceIngredients.vue";
import PizzaConstructor from "../modules/constructor/PizzaConstructor.vue";

const doughItems = dough.map(normalizeDough);
const ingredientItems = ingredients.map(normalizeIngredients);
const sauceItems = sauces.map(normalizeSauces);
const sizeItems = sizes.map(normalizeSize);

const pizza = reactive({
  name: "",
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauceItems[0].value,
  ingredients: ingredientItems.reduce((acc, item) => {
    acc[item.value] = 0;
    return acc;
  }, {}),
});

const addIngredient = (ingredient) => {
  pizza.ingredients[ingredient]++;
};

const updateIngredientAmount = (ingredient, count) => {
  pizza.ingredients[ingredient] = count;
};

const price = computed(() => {
  const doughPrice =
    doughItems.find((item) => item.value === pizza.dough)?.price ?? 0;

  const saucePrice =
    sauceItems.find((item) => item.value === pizza.sauce)?.price ?? 0;

  const sizeMultiplier =
    sizeItems.find((item) => item.value === pizza.size)?.multiplier ?? 1;

  const ingredientsPrice = ingredientItems
    .map((item) => pizza.ingredients[item.value] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const disableSubmit = computed(() => {
  return pizza.name.length === 0 || price.value === 0;
});
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <choice-dough
          v-model="pizza.dough"
          :dough-items="doughItems"
        ></choice-dough>

        <choice-size v-model="pizza.size" :size-items="sizeItems"></choice-size>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <choice-sauce v-model="pizza.sauce" :sauce-items="sauceItems" />

              <choice-ingredients
                :values="pizza.ingredients"
                :ingredient-items="ingredientItems"
                @update="updateIngredientAmount"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :ingredients="pizza.ingredients"
            @drop="addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.ingredients {
  &__counter {
    width: 54px;
    margin-top: 10px;
    margin-left: 36px;
  }
}
</style>
