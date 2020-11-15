<template>
  <div class="matchmaker">
    <div class="container-table">
      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <tr>
          <th>Toon</th>
          <th></th>
          <th>Arrow</th>
          <th>Triangle</th>
          <th>Circle</th>
          <th>Cross</th>
          <th>Square</th>
          <th>Rhombus</th>
        </tr>
        <template v-for="unit in unitsSorted">
          <tr :key="`${unit.defId}1`">
            <th rowspan="3">
              {{ unit.defId }}
            </th>
            <td>{{ unit.bonus[0] }}</td>
            <td>{{ statsName(unit.mods, 2) }}</td>
            <td>{{ statsName(unit.mods, 4) }}</td>
            <td>{{ statsName(unit.mods, 5) }}</td>
            <td>{{ statsName(unit.mods, 6) }}</td>
            <td>{{ statsName(unit.mods, 1) }}</td>
            <td>{{ statsName(unit.mods, 3) }}</td>
          </tr>
          <tr :key="`${unit.defId}2`">
            <td>{{ unit.bonus[1] }}</td>
            <td>{{ statsValue(unit.mods, 2) }}</td>
            <td>{{ statsValue(unit.mods, 4) }}</td>
            <td>{{ statsValue(unit.mods, 5) }}</td>
            <td>{{ statsValue(unit.mods, 6) }}</td>
            <td>{{ statsValue(unit.mods, 1) }}</td>
            <td>{{ statsValue(unit.mods, 3) }}</td>
          </tr>
          <tr :key="`${unit.defId}3`">
            <td>{{ unit.bonus[2] || "" }}</td>
            <td>{{ showSpeed(unit.mods, 2) }}</td>
            <td>{{ showSpeed(unit.mods, 4) }}</td>
            <td>{{ showSpeed(unit.mods, 5) }}</td>
            <td>{{ showSpeed(unit.mods, 6) }}</td>
            <td>{{ showSpeed(unit.mods, 1) }}</td>
            <td>{{ showSpeed(unit.mods, 3) }}</td>
          </tr>
          <tr :key="`${unit.defId}4`">
            <td colspan="8" style="min-height: 20px"></td>
          </tr>
        </template>
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
      guild: "",
      teams: [
        {
          name: "IT",
          units: [
            "VEERS",
            "COLONELSTARCK",
            "ADMIRALPIETT",
            "RANGETROOPER",
            "DEATHTROOPER"
          ]
        }
      ]
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
    findMod(mods, slot) {
      return mods.find(mod => {
        return mod.slot == slot;
      });
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
    statsName(mods, slot) {
      const mod = this.findMod(mods, slot);
      if (mod != null) {
        return this.translateAttribute(mod.primaryStat.unitStat);
      }
      return "-";
    },
    translateAttribute(statsNumber) {
      switch (statsNumber) {
        case 48:
          return "offense";
        case 5:
          return "speed";
        case 49:
          return "defense";
        case 55:
          return "health";
        case 18:
          return "tenacity";
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
        default:
          return `(${statsNumber}) is not defined`;
      }
    },
    showSpeed(mods, slot) {
      const mod = this.findMod(mods, slot);
      if (mod != null) {
        let value = "0";
        mod.secondaryStat.forEach(stat => {
          if (stat.unitStat == 5) {
            value = stat.value;
          }
        });
        return `Speed: ${value}`;
      }
      return "-";
    },
    statsValue(mods, slot) {
      const mod = this.findMod(mods, slot);
      if (mod != null) {
        return mod.primaryStat.value;
      }
      return "-";
    }
  },
  mounted() {
    players[0].roster.forEach(unit => {
      let sets = [];
      unit.mods.forEach(mod => {
        switch (mod.set) {
          case 4:
            sets.push("Speed");
            break;
          case 6:
            sets.push("Crit Damage");
            break;
          case 1:
            sets.push("Health");
            break;
          case 2:
            sets.push("Offense");
            break;
          case 3:
            sets.push("Defense");
            break;
          case 5:
            sets.push("Crit Chance");
            break;
          case 7:
            sets.push("Potency");
            break;
          case 8:
            sets.push("Tenacity");
            break;
          default:
            sets.push(mod.set);
            break;
        }
      });
      sets.sort();
      let bonus = [];
      let countSet = 0;
      let oldSet = "";
      console.log("================");
      console.log(sets);
      sets.forEach(set => {
        console.log({ set, oldSet, countSet });
        if (oldSet == set) {
          countSet++;
        } else {
          oldSet = set;
          countSet++;
        }
        if (countSet >= 2) {
          if (
            !(
              (oldSet == "Speed" ||
                oldSet == "Offense" ||
                oldSet == "Crit Damage") &&
              countSet != 4
            )
          ) {
            bonus.push(`${countSet}x ${oldSet}`);
            oldSet = "";
            countSet = 0;
          }
        }
      });
      unit.sets = sets;
      unit.bonus = bonus.sort();
      this.units.push(unit);
    });
    this.name = players[0].name;
    this.guild = players[0].guild;
  }
};
</script>
