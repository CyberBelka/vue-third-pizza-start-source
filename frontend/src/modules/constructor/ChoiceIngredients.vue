<script setup>
import { toRef } from "vue";
import { INGREDIENTS_MAX_COUNT } from "../../common/constants";
import AppDrag from "../../common/components/AppDrag.vue";
import AppCounter from "../../common/components/AppCounter.vue";

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

        <app-counter
          :value="getValue(ingredientType.value)"
          :max-count="INGREDIENTS_MAX_COUNT"
          @update="setValue(ingredientType.value, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients {
  &__sauce {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    margin-bottom: 14px;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-right: 16px;
      margin-bottom: 10px;
    }
  }

  &__input {
    margin-right: 24px;
    margin-bottom: 10px;
  }

  &__filling {
    width: 100%;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-bottom: 16px;
    }
  }

  &__list {
    @include clear-list;

    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__item {
    width: 100px;
    min-height: 40px;
    margin-right: 17px;
    margin-bottom: 35px;
  }

  &__counter {
    width: 54px;
    margin-top: 10px;
    margin-left: 36px;
  }
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}
</style>
