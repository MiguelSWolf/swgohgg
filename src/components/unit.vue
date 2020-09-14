<template>
  <div v-if="unit" class="unit has-gear" :class="`is-gear-${unit.gear}`">
    <figure class="image is-64x64 is-mask">
      <img class="is-rounded" :src="unit.photo" />
    </figure>
    <div class="expand">
      <h2>{{ unit.name }}</h2>
      <h2>{{ formatNumber(unit.gp) }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ["unit"],
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    }
  }
};
</script>

<style lang="scss">
.has-gear {
  .image:after {
    position: absolute;
    top: -0px;
    left: -0px;
    right: -0px;
    bottom: -0px;
    /* background: red; */
    content: "";
    display: block;
  }
  &.is-gear-1 .image:after {
    background-image: url(../assets/units/gear-icon-g1.svg);
  }
  &.is-gear-2 .image:after {
    background-image: url(../assets/units/gear-icon-g2.svg);
  }
  &.is-gear-3 .image:after {
    background-image: url(../assets/units/gear-icon-g3.svg);
  }
  &.is-gear-4 .image:after {
    background-image: url(../assets/units/gear-icon-g4.svg);
  }
  &.is-gear-5 .image:after {
    background-image: url(../assets/units/gear-icon-g5.svg);
  }
  &.is-gear-6 .image:after {
    background-image: url(../assets/units/gear-icon-g6.svg);
  }
  &.is-gear-7 .image:after {
    background-image: url(../assets/units/gear-icon-g7.svg);
  }
  &.is-gear-8 .image:after {
    background-image: url(../assets/units/gear-icon-g8.svg);
  }
  &.is-gear-9 .image:after {
    background-image: url(../assets/units/gear-icon-g9.svg);
  }
  &.is-gear-10 .image:after {
    background-image: url(../assets/units/gear-icon-g10.svg);
  }
  &.is-gear-11 .image:after {
    background-image: url(../assets/units/gear-icon-g11.svg);
  }
  &.is-gear-12 .image:after {
    background-image: url(../assets/units/gear-icon-g12.svg);
  }
  &.is-gear-13 .image:after {
    background-image: url(../assets/units/gear-icon-g13.png);
    background-size: 84px auto;
    background-position-y: 5px;
    background-position-x: 3px;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -6px;
  }
}
.unit {
  position: relative;
  .expand {
    display: none;
    position: absolute;
    bottom: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
    z-index: 2;
  }
  &:hover .expand {
    display: inline;
  }
}
</style>
