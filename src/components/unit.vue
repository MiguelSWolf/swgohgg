<template>
  <div
    v-if="unit.name"
    class="unit"
    :class="{ 'is-counter': isCounter, 'is-full': showStats }"
  >
    <div class="collection-char">
      <div
        class="player-char-portrait char-portrait-full"
        :class="classComputed"
      >
        <a href="#" class="char-portrait-full-link" rel="nofollow">
          <img
            class="char-portrait-full-img"
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
          <div class="char-portrait-full-relic" v-if="unit.gear_level > 12">
            {{ unit.relic_tier - 2 }}
          </div>
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
    <div class="unit-stats" v-if="showStats == true">
      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <tr>
          <th>Power</th>
          <td>{{ formatNumber(unit.power) }}</td>
        </tr>
        <tr>
          <th>Speed</th>
          <td>{{ formatNumber(unit.stats[5]) }}</td>
        </tr>
        <tr>
          <th>Health</th>
          <td>{{ formatNumber(unit.stats[1]) }}</td>
        </tr>
        <tr>
          <th>Protection</th>
          <td>{{ formatNumber(unit.stats[28]) }}</td>
        </tr>
        <tr>
          <th>Potency</th>
          <td>{{ formatNumber(unit.stats[17] * 100) }}%</td>
        </tr>
        <tr>
          <th>Tenacity</th>
          <td>{{ formatNumber(unit.stats[18] * 100) }}%</td>
        </tr>
        <tr>
          <th>C. Chance</th>
          <td>{{ formatNumber(unit.stats[14]) }}%</td>
        </tr>
        <tr>
          <th>C. Damage</th>
          <td>{{ formatNumber(unit.stats[16] * 100) }}%</td>
        </tr>
        <tr>
          <th>Damage</th>
          <td>{{ formatNumber(unit.stats[6]) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    name: { default: "" },
    id: { default: 0 },
    isCounter: { default: false },
    showStats: { default: false }
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
      console.log(this.playerUnit);
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
.collection-char {
  position: relative;
  width: 104px;
  padding: 10px;
}
.unit {
  display: flex;
  .unit-stats {
    padding: 10px 0;
    margin-left: 10px;
  }
  &.is-full {
    justify-content: flex-end;
  }
  &.is-counter {
    flex-direction: row-reverse;
    .unit-stats {
      margin-left: 0px;
      margin-right: 10px;
    }
  }
}
</style>
