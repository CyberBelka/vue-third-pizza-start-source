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

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.dough {
  &__input {
    position: relative;

    margin-right: 8%;
    margin-bottom: 20px;
    padding-left: 50px;

    cursor: pointer;

    b {
      @include r-s16-h19;

      &::before {
        @include p_center-v;

        width: 36px;
        height: 36px;

        content: "";
        transition: 0.3s;

        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    }

    span {
      @include l-s11-h13;

      display: block;
    }

    &--small {
      b {
        &::before {
          background-image: url("@/assets/img/dough-light.svg");
        }
      }
    }

    &--big {
      b {
        &::before {
          background-image: url("@/assets/img/dough-large.svg");
        }
      }
    }

    &:hover {
      b::before {
        box-shadow: $shadow-regular;
      }
    }

    input {
      &:checked + b::before {
        box-shadow: $shadow-large;
      }
    }
  }
}
</style>
