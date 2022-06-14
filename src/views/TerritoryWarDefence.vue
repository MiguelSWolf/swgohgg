<template>
  <div class="territorywar">
    <section class="section">
      <div class="container">
        <form @submit.prevent="getGuild()">
          <div class="field is-grouped is-grouped-right">
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Your Guild ID"
                v-model="guildCode"
              />
            </p>
            <p class="control">
              <input type="submit" class="button is-info" value="Search" />
            </p>
            <p class="control">
              <a class="button is-danger" @click.prevent="clearCache">
                Reset
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
    <section class="section">
      <div class="table-container">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr>
            <th>Name</th>
            <th v-for="(team, index) in teams" :key="team.name">
              {{ team.name }} ({{ countTeams[index] }}/{{ orderTeams.length }})
            </th>
            <th>Bag Ratio</th>
            <th>Del</th>
          </tr>
          <tr v-for="row in orderTeams" :key="row.name">
            <td>
              <a target="_blank" :href="row.url">{{ row.name }} </a>
            </td>
            <td
              v-for="team in teams"
              :key="team.name"
              :class="classCell(row[team.name].marked)"
              @click="marked(team.name, row.name)"
            >
              <div class="has-text-success icon" v-if="row[team.name].ready">
                <iconCheck />
              </div>
              <div class="has-text-danger icon" v-else><iconCross /></div>
            </td>
            <td>{{ formatNumber(row.ratio) }}</td>
            <td>
              <a @click="removePlayer(row.name)" class="button is-small">
                <span class="icon is-small">
                  <iconTrash />
                </span>
              </a>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import guild from "../assets/7545.json";
import iconCheck from "../components/checkIcon";
import iconCross from "../components/crossIcon";
import iconTrash from "../components/trashIcon";

export default {
  components: { iconCheck, iconCross, iconTrash },
  data() {
    return {
      guildCode: "",
      guildData: {
        players: []
      },
      teams: [
        {
          name: "JMK",
          lead: "JEDIMASTERKENOBI",
          weight: 1,
          mandatoryUnits: {
            JEDIMASTERKENOBI: { gear: 13 },
            ANAKINKNIGHT: { gear: 13 },
            GENERALKENOBI: { gear: 13 },
            AHSOKATANO: { gear: 13 }
          },
          optionalUnits: {
            PADMEAMIDALA: { gear: 13 },
            COMMANDERAHSOKA: { gear: 13 }
          }
        },
        {
          name: "BH",
          lead: "BOSSK",
          weight: 1,
          mandatoryUnits: {
            BOSSK: { gear: 13 }
          },
          optionalUnits: {
            BOBAFETT: { gear: 13 },
            THEMANDALORIAN: { gear: 13 },
            GREEFKARGA: { gear: 12 },
            DENGAR: { gear: 13 },
            ZAMWESELL: { gear: 13 },
            CADBANE: { gear: 13 }
          }
        },
        {
          name: "CLS",
          lead: "COMMANDERLUKESKYWALKER",
          weight: 1,
          mandatoryUnits: {
            COMMANDERLUKESKYWALKER: { gear: 13 },
            HANSOLO: { gear: 13 },
            CHEWBACCALEGENDARY: { gear: 13 },
            C3POCHEWBACCA: { gear: 12 },
            C3POLEGENDARY: { gear: 13 }
          },
          optionalUnits: {}
        },
        {
          name: "Geo",
          lead: "GEONOSIANBROODALPHA",
          weight: 1,
          mandatoryUnits: {
            GEONOSIANBROODALPHA: { gear: 13 },
            SUNFAC: { gear: 12 },
            GEONOSIANSOLDIER: { gear: 12 },
            GEONOSIANSPY: { gear: 12 },
            POGGLETHELESSER: { gear: 12 }
          },
          optionalUnits: {}
        },
        {
          name: "MM",
          lead: "MONMOTHMA",
          weight: 1,
          mandatoryUnits: {
            MONMOTHMA: { gear: 13 },
            BIGGSDARKLIGHTER: { gear: 13 },
            WEDGEANTILLES: { gear: 13 },
            ADMINISTRATORLANDO: { gear: 13 }
          },
          optionalUnits: {
            CHIRRUTIMWE: { gear: 12 },
            PAO: { gear: 12 },
            CARADUNE: { gear: 12 },
            K2SO: { gear: 12 }
          }
        },
        {
          name: "Rey",
          lead: "GLREY",
          weight: 1,
          mandatoryUnits: {
            GLREY: { gear: 13 },
            EPIXPOE: { gear: 13 },
            EPIXFINN: { gear: 13 },
            AMILYNHOLDO: { gear: 13 }
          },
          optionalUnits: {
            COMMANDERAHSOKA: { gear: 13 },
            BB8: { gear: 13 }
          }
        },
        {
          name: "Conde",
          lead: "COUNTDOOKU",
          weight: 1,
          mandatoryUnits: {
            COUNTDOOKU: { gear: 13 }
          },
          optionalUnits: {
            ZAALBAR: { gear: 12 },
            ENFYSNEST: { gear: 12 },
            DROIDEKA: { gear: 12 },
            WATTAMBOR: { gear: 12 }
          }
        }
      ],
      resultTeams: [],
      teamsReady: false
    };
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    marked(team, player) {
      const indexPlayer = this.resultTeams.findIndex(row => {
        return row.name === player;
      });
      let value = this.resultTeams[indexPlayer][team].marked;
      value++;
      if (value > 2) value = 0;
      this.resultTeams[indexPlayer][team].marked = value;
      this.save();
    },
    classCell(marked) {
      return { "is-blue": marked == 1, "is-yellow": marked == 2 };
    },
    mountTeams: function() {
      this.fillDefaultValue();
      this.guildData.players.forEach(player => {
        this.teams.forEach(team => {
          const IndexPlayer = this.resultTeams.findIndex(
            row => row.name === player.data.name
          );
          let mandatoryUnitsReady = true;
          let countUnits = 5;
          for (const index in team.mandatoryUnits) {
            countUnits--;
            if (!this.unitIsReady(player, index, team.mandatoryUnits[index])) {
              mandatoryUnitsReady = false;
            }
          }
          if (mandatoryUnitsReady) {
            let optionalUnitsReady = 0;
            for (const index in team.optionalUnits) {
              if (this.unitIsReady(player, index, team.optionalUnits[index])) {
                optionalUnitsReady++;
              }
            }
            if (optionalUnitsReady >= countUnits) {
              this.resultTeams[IndexPlayer][team.name].ready = true;
              this.resultTeams[IndexPlayer].teamsReady += team.weight;
            }
          }
        });
      });
      this.teamsReady = true;
    },
    unitIsReady: function(player, idUnit, unitRequirements) {
      const unit = this.findUnit(player, idUnit);
      if (unit.gear_level >= unitRequirements.gear) {
        return true;
      }
      return false;
    },
    findUnit: function(player, id) {
      const unit = player.units.find(unit => {
        return unit.data.base_id === id;
      });
      return unit !== undefined ? unit.data : false;
    },
    removePlayer: function(name) {
      const index = this.resultTeams.findIndex(row => {
        return row.name === name;
      });
      this.resultTeams[index].show = false;
      this.save();
    },
    fillDefaultValue: function() {
      this.guildData.players.forEach(player => {
        let defaultObject = {
          show: true,
          name: player.data.name,
          teamsReady: 0,
          power: player.data.galactic_power,
          ratio: 0,
          url: `https://swgoh.gg${player.data.url}characters/`
        };
        this.teams.forEach(team => {
          defaultObject[team.name] = {
            ready: false,
            marked: 0
          };
        });
        this.resultTeams.push(defaultObject);
      });
    },
    getGuild: function() {
      this.$store.dispatch("startLoading");
      this.$http
        .get(`guild2/${this.guildCode}`)
        .then(response => {
          this.guildData = response.body;
          this.mountTeams();
          this.$store.dispatch("endLoading");
          this.save();
        })
        .catch(err => {
          console.error(err);
          alert("error!");
          this.$store.dispatch("endLoading");
        });
    },
    save() {
      localStorage.setItem(
        "territoryWarDefenceTeams",
        JSON.stringify(this.resultTeams)
      );
      localStorage.setItem(
        "territoryWarGuildCode",
        JSON.stringify(this.guildCode)
      );
    },
    clearCache() {
      this.guildCode = "";
      this.teamsReady = false;
      this.resultTeams = [];
      localStorage.setItem("territoryWarDefenceTeams", undefined);
      localStorage.setItem("territoryWarGuildCode", undefined);
    }
  },
  computed: {
    countTeams() {
      let count = [];
      this.teams.forEach(() => {
        count.push(0);
      });
      this.orderTeams.forEach(row => {
        this.teams.forEach((team, index) => {
          if (row[team.name].ready) count[index]++;
        });
      });
      return count;
    },
    isDev() {
      return Window.isDev || false;
    },
    orderTeams() {
      if (!this.teamsReady) return [];
      let cloneArray = this.resultTeams.slice(0);
      cloneArray = cloneArray.filter(row => {
        return row.show;
      });
      cloneArray.forEach(team => {
        team.ratio = (team.teamsReady * 1000000) / team.power;
      });
      return cloneArray.sort(function(a, b) {
        return b.ratio - a.ratio;
      });
    }
  },
  mounted() {
    if (this.isDev) {
      console.log("Version dev");
      this.guildData = guild;
      this.mountTeams();
    } else {
      console.log(guild);
      console.log("Version prod");
      if (localStorage.territoryWarGuildCode) {
        this.guildCode = JSON.parse(
          localStorage.getItem("territoryWarGuildCode")
        );
      }
      if (localStorage.territoryWarDefenceTeams) {
        this.resultTeams = JSON.parse(
          localStorage.getItem("territoryWarDefenceTeams")
        );
        this.teamsReady = true;
      }
    }
  }
};
</script>
