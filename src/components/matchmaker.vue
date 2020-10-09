<template>
  <div class="matchmaker">
    <div class="field is-grouped">
      <div class="control">
        <div class="field has-addons">
          <div class="control">
            <div
              class="button is-info is-large is-outlined"
              @click="simpleView = false"
            >
              Normal View
            </div>
          </div>
          <div class="control">
            <div
              class="button is-info is-large is-outlined"
              @click="simpleView = true"
            >
              Simple View
            </div>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="field">
          <div class="control">
            <div class="button is-primary is-large is-outlined">
              <export-excel :data="MatchmakerUnits">
                Export Data
              </export-excel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-multiline is-vcentered" v-if="!simpleView">
      <div
        class="column is-6-mobile is-4-tablet is-offset-4-tablet is-3-desktop is-offset-6-desktop"
      >
        <div class="title is-1" style="text-align: center">
          Your units
        </div>
      </div>
      <div class="column is-6-mobile is-4-tablet is-3-desktop">
        <div class="title is-1" style="text-align: center">
          Opponent units
        </div>
      </div>
      <template v-for="unit in MatchmakerUnits">
        <div
          class="column is-12-mobile is-4-tablet is-6-desktop"
          :key="unit.name"
        >
          <div class="title is-2" style="text-align: center">
            {{ unit.name }}
          </div>
        </div>
        <div
          class="column is-6-mobile is-4-tablet is-3-desktop"
          :key="`${unit.name}-your`"
        >
          <div
            class="is-matchmaker"
            :class="{ 'is-deleted': unit.yourPower == 0 }"
          >
            <card-unit :isCounter="true" :name="unit.name" :showPower="true" />
          </div>
        </div>
        <div
          class="column is-6-mobile is-4-tablet is-3-desktop"
          :key="`${unit.name}-counter`"
        >
          <div
            class="is-matchmaker"
            :class="{ 'is-deleted': unit.opponentPower == 0 }"
          >
            <card-unit :showPower="true" :name="unit.name" />
          </div>
        </div>
      </template>
    </div>
    <div class="container-table">
      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <tr>
          <th rowspan="2">Name</th>
          <th colspan="2">You</th>
          <th colspan="2">Opponent</th>
          <th rowspan="2">Diff</th>
        </tr>
        <tr>
          <th>Toon</th>
          <th>Sum</th>
          <th>Toon</th>
          <th>Sum</th>
        </tr>
        <tr v-for="unit in MatchmakerUnits" :key="unit.name">
          <td>{{ unit.name }}</td>
          <td>{{ formatNumber(unit.yourPower || 0) }}</td>
          <td>{{ formatNumber(unit.yourPartial || 0) }}</td>
          <td>{{ formatNumber(unit.opponentPower || 0) }}</td>
          <td>{{ formatNumber(unit.opponentPartial || 0) }}</td>
          <td
            :class="{
              'is-positive': unit.diff > 0,
              'is-negative': unit.diff < 0
            }"
          >
            {{ formatNumber(unit.diff || 0) }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import cardUnit from "../components/unit";
export default {
  data() {
    return {
      simpleView: true
    };
  },
  components: { cardUnit },
  computed: {
    MatchmakerUnits() {
      let aux = this.$store.getters.getMatchMakerUnits;
      let yourPartial = 0;
      let opponentPartial = 0;
      aux.forEach(unit => {
        yourPartial += unit.yourPower;
        unit.yourPartial = yourPartial;
        opponentPartial += unit.opponentPower;
        unit.opponentPartial = opponentPartial;
        unit.diff = yourPartial - opponentPartial;
      });
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
.is-positive {
  color: green;
}
.is-negative {
  color: red;
}
</style>
