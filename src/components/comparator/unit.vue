<template>
  <div v-if="unit.name">
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
            {{ unit.zeta }}
          </div>
          <div class="char-portrait-full-relic" v-if="unit.gear > 12">
            {{ unit.relic - 2 }}
          </div>
        </a>
      </div>
      <div class="collection-char-name">
        <a class="collection-char-name-link">
          {{ unit.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    unitData: { required: true }
  },
  computed: {
    classComputed() {
      let classes = {
        "char-portrait-full-alignment-light-side": this.unit.isLight,
        "char-portrait-full-alignment-dark-side": this.unit.isDark
      };
      classes[`char-portrait-full-gear-t${this.unit.gear}`] = true;
      return classes;
    },
    hasZeta() {
      return this.unit.zeta && this.unit.zeta > 0;
    },
    baseUnit() {
      if (this.unitData && this.unitData.id) {
        return this.$store.getters.getUnitById(this.unitData.id);
      }
      return {};
    },
    unit() {
      return {
        ...this.baseUnit,
        ...this.unitData
      };
    }
  }
};
</script>
