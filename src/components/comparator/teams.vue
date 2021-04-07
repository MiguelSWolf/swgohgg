<template>
  <div>
    <div
      class="card"
      style="margin-bottom: 20px"
      v-for="(team, indexTeam) in teams"
      :key="indexTeam"
    >
      <header class="card-header">
        <p
          class="card-header-title"
          @click="
            teamOpen = '';
            teamOpen = team.name;
          "
        >
          {{ team.name }}
        </p>
      </header>
      <div class="card-content" v-if="team.name == teamOpen">
        <div class="content">
          <div v-if="team.name == 'Personalizado'">
            <select-toon v-model="teamsConfig[0].lead" label="lead" />
            <select-toon v-model="teamsConfig[0].squad[0]" label="position 2" />
            <select-toon v-model="teamsConfig[0].squad[1]" label="position 3" />
            <select-toon v-model="teamsConfig[0].squad[2]" label="position 4" />
            <select-toon v-model="teamsConfig[0].squad[3]" label="position 5" />
          </div>
          <div v-if="team.message">
            <span v-html="team.message"></span><br />
            <br />
            <span v-html="callList(indexTeam)"></span>
          </div>
          <table class="table is-bordered">
            <tr>
              <th>Player</th>
              <th>Power</th>
              <th colspan="5">Positions</th>
              <th>Action</th>
            </tr>
            <tr
              v-for="(player, indexPlayer) in team.players"
              :key="player.name"
              :class="{ 'selected-player': player.selected }"
            >
              <td>
                <strong>{{ player.name }}</strong>
              </td>
              <td>
                {{ player.power | formatNumber }}
              </td>
              <template v-for="n in 5">
                <td :key="n" style="width: 170px">
                  <template
                    v-for="(option, aux) in player[`position${n}`].options"
                  >
                    <unit :unitData="option" :key="aux" />
                  </template>
                  Power: {{ player[`position${n}`].power | formatNumber }}
                </td>
              </template>
              <td>
                <button
                  class="button is-primary"
                  @click.prevent="selectTeam(indexPlayer, indexTeam)"
                >
                  {{ player.selected ? "Unselect" : "Select" }}
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import teamsConfig from "../../assets/baseData/teamsConfig.json";
import SelectToon from "./selectToon.vue";
import unit from "./unit";
export default {
  props: ["guild"],
  components: { unit, SelectToon },
  data() {
    return {
      teamsConfig: [],
      teamOpen: "Personalizado",
      teams: []
    };
  },
  methods: {
    callList: function(indexTeam) {
      let html = "";
      let players = [];
      this.teams[indexTeam].players.forEach(player => {
        if (player.selected) {
          players.push(player.name);
        }
      });
      if (players.length > 0) {
        html = "<strong>*Atenção a chamada*</strong><br />";
        html += players.join("<br />");
      }
      return html;
    },
    selectTeam: function(player, team) {
      const selected = this.teams[team].players[player].selected;
      this.teams[team].players[player].selected = !selected;
    },
    basePosition: function() {
      return {
        quantity: 1,
        power: 0,
        show: false,
        options: []
      };
    },
    mountUnit: function(characters, id) {
      let unit = characters.find(element => {
        return element.id === id;
      });
      if (!unit) unit = {};
      let unitReturn = {
        id,
        gear: unit.gear || 0,
        rarity: unit.rarity || 0,
        relic: unit.relic || 0,
        zeta: unit.zeta || 0,
        power: unit.power || 0
      };

      return unitReturn;
    },
    mountPosition: function(characters, ids, spaces) {
      if (!spaces) spaces = 1;
      let position = this.basePosition();
      let power = 0;
      ids.forEach(id => {
        let unit = this.mountUnit(characters, id);
        if (unit) {
          position.options.push(unit);
          power += unit.power;
        }
      });
      power = (power * spaces) / position.options.length;
      power = Math.round(power);
      position.power = power;
      position.show = true;
      return position;
    },
    mountTeam: function(player, teamConfig) {
      let team = {
        name: player.name,
        selected: false,
        position1: {},
        position2: {},
        position3: {},
        position4: {},
        position5: {}
      };
      team.position1 = this.mountPosition(player.characters, [teamConfig.lead]);

      let index = 2;
      teamConfig.squad.forEach(unit => {
        const ids = [unit];
        team[`position${index}`] = this.mountPosition(player.characters, ids);
        index++;
      });
      if (teamConfig.optional) {
        teamConfig.optional.forEach(optional => {
          let ids = [unit];
          optional.squad.forEach(unit => {
            ids.push(unit);
          });
          let characters = player.characters;
          let spaces = optional.spaces;
          let position = this.mountPosition(characters, ids, spaces);
          team[`position${index}`] = position;
          index += optional.spaces;
        });
      }
      let power = 0;
      for (let i = 1; i < 6; i++) {
        power += team[`position${i}`].power;
      }
      team.power = power;
      return team;
    },
    mountTeams: function() {
      let teams = [];
      this.teamsConfig.forEach(team => {
        const index = teams.length;
        teams.push({
          name: team.name,
          players: [],
          message: team.message
        });
        this.guild.players.forEach(player => {
          teams[index].players.push(this.mountTeam(player, team));
        });
        teams[index].players = teams[index].players.sort(function(a, b) {
          return b.power - a.power;
        });
      });
      this.teams = teams;
    }
  },
  watch: {
    teamsConfig: {
      handler: function() {
        this.mountTeams();
      },
      deep: true
    }
  },
  mounted() {
    this.teamsConfig = teamsConfig.teams;
    this.mountTeams();
  }
};
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.content table {
  width: auto;
}
.content table td {
  text-align: center;
}
.content table td > div {
  display: flex;
  justify-content: center;
}
.selected-player {
  background: rgb(127, 255, 127, 0.25);
}
</style>
