<template>
  <div class="matchmaker">
    <div class="columns is-mobile is-multiline">
      <div class="column is-6">
        <div class="title is-1" style="text-align: center">
          Your units
        </div>
      </div>
      <div class="column is-6">
        <div class="title is-1" style="text-align: center">
          Opponent units
        </div>
      </div>
      <template v-for="unit in MatchmakerUnits">
        <div class="column is-12" :key="unit.name">
          <div class="title is-2" style="text-align: center">
            {{ unit.name }}
          </div>
        </div>
        <div class="column is-6" :key="`${unit.name}-your`">
          <div
            class="is-matchmaker"
            :class="{ 'is-deleted': unit.yourPower == 0 }"
          >
            <card-unit :isCounter="true" :name="unit.name" :showPower="true" />
          </div>
        </div>
        <div class="column is-6" :key="`${unit.name}-counter`">
          <div
            class="is-matchmaker"
            :class="{ 'is-deleted': unit.opponentPower == 0 }"
          >
            <card-unit :showPower="true" :name="unit.name" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import cardUnit from "../components/unit";
export default {
  components: { cardUnit },
  computed: {
    MatchmakerUnits() {
      const aux = this.$store.getters.getMatchMakerUnits;
      return aux;
    }
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    }
  }
};
</script>
<style lang="scss">
.is-matchmaker {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  &.is-deleted {
    filter: grayscale(100%);
  }
  .collection-char {
    height: 126px;
  }
  .collection-char-name {
    display: none;
  }
}
</style>
