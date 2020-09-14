<template>
  <div class="team" :class="{ 'is-expandable': showCounter }">
    <h2>{{ team.name }}</h2>
    <div class="lead">
      <unit :unit="searchUnit(team.lead)" />
    </div>
    <div class="options">
      <unit
        v-for="option in team.squadOption"
        :key="option"
        :unit="searchUnit(option)"
      />
    </div>
    <div class="counters" v-if="showCounter && team.counter.length > 0">
      <h2 class="title is-2">Counters</h2>
      <team
        :team="counter"
        :teams="teams"
        :showCounter="false"
        :ground="ground"
        v-for="counter in team.counter"
        :key="counter.name"
      />
    </div>
  </div>
</template>

<script>
import unit from "../components/unit";
export default {
  props: ["team", "ground", "teams", "showCounter"],
  components: { unit },
  methods: {
    searchUnit: function(index) {
      return this.ground.find(element => element.id == index);
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
