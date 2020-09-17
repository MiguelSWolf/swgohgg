<template>
  <div v-if="unit" class="unit">
    <div class="collection-char collection-char-dark-side">
      <div
        class="player-char-portrait char-portrait-full"
        :class="
          `char-portrait-full-alignment-light-side char-portrait-full-gear-t${unit.gear_level}`
        "
      >
        <a href="#" class="char-portrait-full-link" rel="nofollow">
          <img
            class="char-portrait-full-img initial loaded"
            :src="unit.image"
            :alt="unit.name"
            width="80"
            height="80"
          />
          <div class="char-portrait-full-gear"></div>
          <template v-for="n in 7">
            <div
              class="star"
              :key="n"
              :class="`star${n} ${unit.rarity >= n ? '' : 'star-inactive'}`"
            ></div>
          </template>
          <div
            class="char-portrait-full-zeta"
            v-if="unit.zeta_abilities.length > 0"
          >
            {{ unit.zeta_abilities.length }}
          </div>
          <div class="char-portrait-full-relic" v-if="unit.gear > 12">7</div>
          <div class="char-portrait-full-level">{{ unit.level }}</div>
        </a>
      </div>
      <div
        class="collection-char-gp"
        data-toggle="tooltip"
        data-container="body"
        title=""
        data-original-title="Power 37,209 / 37,504"
      >
        <div class="collection-char-gp-progress">
          <div
            class="collection-char-gp-progress-bar"
            style="width: 99.2134%;"
          ></div>
        </div>
        <div class="collection-char-gp-label">
          <span class="collection-char-gp-label-value">99</span>
          <span class="collection-char-gp-label-percent">%</span>
        </div>
      </div>
      <div class="collection-char-name">
        <a class="collection-char-name-link" href="#">
          {{ unit.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { default: "" },
    id: { default: 0 },
    player: { default: 1 }
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    }
  },
  computed: {
    unit() {
      return {
        ...this.baseUnit,
        ...this.playerUnit
      };
    },
    playerUnit() {
      return this.$store.getters.getUnitFromPlayerById(
        this.baseUnit.id,
        this.player
      );
    },
    baseUnit() {
      if (this.name) {
        return this.$store.getters.getUnitByName(this.name);
      } else if (this.id) {
        return this.$store.getters.getUnitById(this.id);
      }
      return {};
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
