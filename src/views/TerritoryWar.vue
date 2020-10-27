<template>
  <div class="territorywar">
    <section class="section">
      <!-- <div class="tabs is-large">
        <ul>
          <li :class="{ 'is-active': !showTabMatchmaker }">
            <a @click.prevent="showTabMatchmaker = false">Counters</a>
          </li>
          <li :class="{ 'is-active': showTabMatchmaker }">
            <a @click.prevent="showTabMatchmaker = true">MatchMaker</a>
          </li>
        </ul>
      </div> -->
      <div class="container">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr>
            <th>Name</th>
            <th v-for="team in teams" :key="team.name">
              {{ team.name }} ({{ team.count }}/50)
            </th>
          </tr>
          <tr v-for="row in resultTeams" :key="row.name">
            <td>
              <a :href="row.url">{{ row.name }}</a>
            </td>
            <td v-for="team in teams" :key="team.name">
              <div class="has-text-success icon" v-if="row[team.name]">
                <iconCheck />
              </div>
              <div class="has-text-danger icon" v-else><iconCross /></div>
            </td>
          </tr>
        </table>
      </div>
    </section>
    <div class="loading" v-if="loading">
      <div class="load-wrapp">
        <div class="letter-holder">
          <div class="l-1 letter">L</div>
          <div class="l-2 letter">o</div>
          <div class="l-3 letter">a</div>
          <div class="l-4 letter">d</div>
          <div class="l-5 letter">i</div>
          <div class="l-6 letter">n</div>
          <div class="l-7 letter">g</div>
          <div class="l-8 letter">.</div>
          <div class="l-9 letter">.</div>
          <div class="l-10 letter">.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guild from "../assets/7545.json";
import iconCheck from "../components/checkIcon";
import iconCross from "../components/crossIcon";

export default {
  name: "Home",
  components: { iconCheck, iconCross },
  data() {
    return {
      guildCode: 7545,
      teams: [
        {
          name: "DR",
          count: 0,
          lead: "DARTHREVAN",
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
          count: 0,
          lead: "GRIEVOUS",
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
          count: 0,
          lead: "PADMEAMIDALA",
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
          count: 0,
          lead: "JEDIKNIGHTREVAN",
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
          count: 0,
          lead: "GENERALSKYWALKER",
          mandatoryUnits: {
            GENERALSKYWALKER: { gear: 13 },
            CT5555: { gear: 13 },
            CT210408: { gear: 13 },
            CT7567: { gear: 13 },
            ARCTROOPER501ST: { gear: 13 }
          },
          optionalUnits: {}
        }
      ],
      resultTeams: [],
      loading: false
    };
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    mountTeams: function(data) {
      this.fillDefaultValue(data);
      data.players.forEach(player => {
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
              team.count++;
              this.resultTeams[IndexPlayer][team.name] = true;
            }
          }
        });
      });
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
    fillDefaultValue: function(data) {
      data.players.forEach(player => {
        let defaultObject = {
          name: player.data.name,
          url: `https://swgoh.gg/${player.data.url}characters/`
        };
        this.teams.forEach(team => {
          defaultObject[team.name] = false;
        });
        this.resultTeams.push(defaultObject);
      });
    },
    getGuild: function() {
      this.loading = true;
      this.$http
        .get(`guild/${this.guildCode}/`)
        .then(response => {
          this.mountTeams(response.body);
          this.loading = true;
        })
        .catch(err => {
          console.error(err);
          alert("error!");
          this.loading = false;
        });
    }
  },
  computed: {
    isDev() {
      return Window.isDev || false;
    }
  },
  mounted() {
    if (this.isDev) {
      console.log("Version dev");
      this.mountTeams(guild);
    } else {
      console.log("Version prod");
      this.getGuild();
    }
  }
};
</script>
<style lang="scss">
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.listTeams {
  .options {
    display: flex;
    .unit {
      transform: scale(0.85);
    }
  }
}
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .letter {
    animation-name: loadingAnnimation;
    animation-duration: 1.6s;
    animation-iteration-count: infinite;
    animation-direction: linear;
    float: left;
    font-size: 22px;
    color: #333;
  }

  .load-wrapp {
    width: 320px;
    height: 100px;
    padding: 20px 20px 20px;
    border-radius: 5px;
    text-align: center;
    background-color: #e5e5e5;
  }

  .letter-holder {
    padding: 16px;
    display: flex;
    justify-content: center;
  }
  .l-1 {
    animation-delay: 0.48s;
  }
  .l-2 {
    animation-delay: 0.6s;
  }
  .l-3 {
    animation-delay: 0.72s;
  }
  .l-4 {
    animation-delay: 0.84s;
  }
  .l-5 {
    animation-delay: 0.96s;
  }
  .l-6 {
    animation-delay: 1.08s;
  }
  .l-7 {
    animation-delay: 1.2s;
  }
  .l-8 {
    animation-delay: 1.32s;
  }
  .l-9 {
    animation-delay: 1.44s;
  }
  .l-10 {
    animation-delay: 1.56s;
  }
}

@keyframes loadingAnnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
