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
          name: "DR",
          lead: "DARTHREVAN",
          weight: 1,
          mandatoryUnits: {
            DARTHREVAN: { gear: 12 },
            DARTHMALAK: { gear: 12 },
            BASTILASHANDARK: { gear: 12 },
            HK47: { gear: 12 }
          },
          optionalUnits: {
            SITHMARAUDER: { gear: 12 },
            SITHTROOPER: { gear: 12 }
          }
        },
        {
          name: "GG",
          lead: "GRIEVOUS",
          weight: 1,
          mandatoryUnits: {
            GRIEVOUS: { gear: 13 },
            B1BATTLEDROIDV2: { gear: 12 },
            B2SUPERBATTLEDROID: { gear: 12 },
            DROIDEKA: { gear: 12 },
            MAGNAGUARD: { gear: 12 }
          },
          optionalUnits: {}
        },
        {
          name: "Padme",
          lead: "PADMEAMIDALA",
          weight: 1,
          mandatoryUnits: {
            PADMEAMIDALA: { gear: 13 },
            GENERALKENOBI: { gear: 13 },
            ANAKINKNIGHT: { gear: 13 },
            C3POLEGENDARY: { gear: 11 }
          },
          optionalUnits: {
            AHSOKATANO: { gear: 12 },
            SHAAKTI: { gear: 12 },
            BARRISSOFFEE: { gear: 12 }
          }
        },
        {
          name: "JKR",
          lead: "JEDIKNIGHTREVAN",
          weight: 1,
          mandatoryUnits: {
            JEDIKNIGHTREVAN: { gear: 12 },
            GRANDMASTERYODA: { gear: 12 },
            JOLEEBINDO: { gear: 12 },
            BASTILASHAN: { gear: 12 }
          },
          optionalUnits: {
            OLDBENKENOBI: { gear: 12 },
            HERMITYODA: { gear: 12 },
            EZRABRIDGERS3: { gear: 12 },
            GENERALKENOBI: { gear: 12 }
          }
        },
        {
          name: "GAS",
          lead: "GENERALSKYWALKER",
          weight: 1,
          mandatoryUnits: {
            GENERALSKYWALKER: { gear: 13 },
            CT5555: { gear: 13 },
            CT210408: { gear: 13 },
            CT7567: { gear: 13 },
            ARCTROOPER501ST: { gear: 13 }
          },
          optionalUnits: {}
        },
        {
          name: "SLKR",
          lead: "SUPREMELEADERKYLOREN",
          weight: 1.5,
          mandatoryUnits: {
            SUPREMELEADERKYLOREN: { gear: 13 },
            KYLOREN: { gear: 13 },
            KYLORENUNMASKED: { gear: 13 },
            FIRSTORDEREXECUTIONER: { gear: 13 },
            FIRSTORDERTROOPER: { gear: 13 }
          },
          optionalUnits: {}
        },
        {
          name: "REY",
          lead: "GLREY",
          weight: 1.5,
          mandatoryUnits: {
            GLREY: { gear: 13 },
            REYJEDITRAINING: { gear: 13 },
            REY: { gear: 13 },
            BB8: { gear: 13 },
            EPIXFINN: { gear: 13 }
          },
          optionalUnits: {}
        },
        {
          name: "JML",
          lead: "GRANDMASTERLUKE",
          weight: 1.5,
          mandatoryUnits: {
            GRANDMASTERLUKE: { gear: 13 },
            MONMOTHMA: { gear: 13 },
            JEDIKNIGHTLUKE: { gear: 13 },
            REYJEDITRAINING: { gear: 13 },
            C3POLEGENDARY: { gear: 13 }
          },
          optionalUnits: {}
        },
        {
          name: "SEE",
          lead: "SITHPALPATINE",
          weight: 1.5,
          mandatoryUnits: {
            SITHPALPATINE: { gear: 13 },
            EMPERORPALPATINE: { gear: 13 },
            ADMIRALPIETT: { gear: 13 },
            VADER: { gear: 13 },
            COUNTDOOKU: { gear: 13 }
          },
          optionalUnits: {}
        }
        // ,{
        //   name: "Nute",
        //   lead: "MONMOTHMA",
        //   mandatoryUnits: {
        //     MONMOTHMA: { gear: 12 }
        //   },
        //   optionalUnits: {
        //     GLREY: { gear: 2 },
        //     REYJEDITRAINING: { gear: 2 },
        //     REY: { gear: 2 },
        //     BB8: { gear: 2 },
        //     EPIXFINN: { gear: 2 },
        //     SUPREMELEADERKYLOREN: { gear: 2 },
        //     KYLOREN: { gear: 2 },
        //     KYLORENUNMASKED: { gear: 2 },
        //     FIRSTORDEREXECUTIONER: { gear: 2 },
        //     FIRSTORDERTROOPER: { gear: 2 },
        //     GENERALSKYWALKER: { gear: 2 },
        //     CT5555: { gear: 2 },
        //     CT210408: { gear: 2 },
        //     CT7567: { gear: 2 },
        //     ARCTROOPER501ST: { gear: 2 },
        //     OLDBENKENOBI: { gear: 2 },
        //     HERMITYODA: { gear: 2 },
        //     EZRABRIDGERS3: { gear: 2 },
        //     GENERALKENOBI: { gear: 2 },
        //     JEDIKNIGHTREVAN: { gear: 2 },
        //     GRANDMASTERYODA: { gear: 2 },
        //     JOLEEBINDO: { gear: 2 },
        //     BASTILASHAN: { gear: 2 },
        //     AHSOKATANO: { gear: 2 },
        //     SHAAKTI: { gear: 2 },
        //     BARRISSOFFEE: { gear: 2 },
        //     ANAKINKNIGHT: { gear: 2 },
        //     C3POLEGENDARY: { gear: 2 }
        //   }
        // }
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
        .get(`guild/${this.guildCode}/`)
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
        "territoryWarTeams",
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
      localStorage.setItem("territoryWarTeams", undefined);
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
      if (localStorage.territoryWarTeams) {
        this.resultTeams = JSON.parse(
          localStorage.getItem("territoryWarTeams")
        );
        this.teamsReady = true;
      }
    }
  }
};
</script>
