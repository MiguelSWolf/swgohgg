<template>
  <div class="matchmaker">
    <div class="container-table">
      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <tr>
          <th>Toon</th>
          <th>Square</th>
          <th>Arrow</th>
          <th>Rhombus</th>
          <th>Triangle</th>
          <th>Circle</th>
          <th>Cross</th>
        </tr>
        <tr v-for="unit in unitsSorted" :key="unit.defId">
          <td>
            {{ unit.defId }}<br />
            {{ formatNumber(unit.gp) }}
          </td>
          <td v-for="mod in unit.mods" :key="mod.id">
            {{ mod.primaryStat.value }}
            {{ statsName(mod.primaryStat.unitStat) }}
            <br />
            Speed: {{ showSpeed(mod.secondaryStat) }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import players from "../assets/swgohhelp-166159449.json";
export default {
  data() {
    return {
      units: [],
      name: "",
      guild: ""
    };
  },
  computed: {
    unitsSorted() {
      let copyUnits = this.units.slice(0).filter(unit => {
        if (unit.mods.length > 0) {
          return unit;
        }
      });
      return copyUnits.sort((a, b) => {
        return b.gp - a.gp;
      });
      // let aux = this.units.sort((a, b) => {
      //   console.log({a, b});
      //   return a-b;
      // });
      // return aux;
    }
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    slotName(slot) {
      switch (slot) {
        case 1:
          return "Square";
        case 2:
          return "Arrow";
        case 3:
          return "Rhombus";
        case 4:
          return "triangle";
        case 5:
          return "circle";
        case 6:
          return "cross";
        default:
          return "Not defined";
      }
    },
    statsName(statsNumber) {
      switch (statsNumber) {
        case 48:
          return "% offence";
        case 5:
          return "speed";
        case 49:
          return "% defence";
        case 55:
          return "% health";
        case 18:
          return "% tenacity";
        case 16:
          return "Critical Damage";
        case 56:
          return "Protection";
        case 17:
          return "Potency";
        case 53:
          return "Critical Chance";
        case 52:
          return "Accuracy";
        case 54:
          return "Critical Avoidance";
        // case : return "";
        // case : return "";
        // case : return "";
        // case : return "";
        // case : return "";
        // case : return "";
        // case : return "";
        // case : return "";
        default:
          return `(${statsNumber}) is not defined`;
      }
    },
    showSpeed(stats) {
      stats.forEach(stat => {
        if (stat.unitStat == 5) return stat.value;
      });
      return "-";
    }
  },
  mounted() {
    this.units = players[0].roster;
    this.name = players[0].name;
    this.guild = players[0].guild;
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
