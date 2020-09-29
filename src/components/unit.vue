<template>
  <div v-if="unit" class="unit">
    <div class="collection-char collection-char-dark-side">
      <div
        class="player-char-portrait char-portrait-full"
        :class="classComputed"
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
          <div class="char-portrait-full-zeta" v-if="hasZeta">
            {{ unit.zeta_abilities.length }}
          </div>
          <div class="char-portrait-full-relic" v-if="unit.gear > 12">7</div>
          <div class="char-portrait-full-level">{{ unit.level }}</div>
        </a>
      </div>
      <!-- <div
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
      </div> -->
      <div class="collection-char-name">
        <a class="collection-char-name-link" href="#">
          {{ unit.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    name: { default: "" },
    id: { default: 0 },
    isCounter: { default: false }
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    }
  },
  computed: {
    classComputed() {
      let classes = {
        "char-portrait-full-alignment-light-side": this.unit.isLight,
        "char-portrait-full-alignment-dark-side": this.unit.isDark
      };
      classes[`char-portrait-full-gear-t${this.unit.gear_level}`] = true;
      return classes;
    },
    player() {
      if (this.isCounter) {
        return this.attackPlayer;
      }
      return this.defencePlayer;
    },
    hasZeta() {
      return this.unit.zeta_abilities && this.unit.zeta_abilities.length > 0;
    },
    playerUnit() {
      if (this.player === undefined) return {};
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
    },
    unit() {
      return {
        ...this.baseUnit,
        ...this.playerUnit
      };
    },
    ...mapState({
      attackPlayer: state => state.playerIndexAttack,
      defencePlayer: state => state.playerIndexDefence
    })
  }
};
</script>

<style lang="scss">
.unit {
  position: relative;
  width: 104px;
  padding: 10px;
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
