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
          <table class="table is-bordered is-fullwidth">
            <tr v-for="player in team.players" :key="player.name">
              <td>
                <strong>{{ player.name }}</strong>
                <br />
                Power: {{ player.power | formatNumber }}
              </td>
              <template v-for="n in 5">
                <td :key="n">
                  <template
                    v-for="(option, aux) in player[`position${n}`].options"
                  >
                    <unit :unitData="option" :key="aux" />
                  </template>
                  Power: {{ player[`position${n}`].power | formatNumber }}
                </td>
              </template>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import teamsConfig from "../../assets/baseData/teamsConfig.json";
import unit from "./unit";
export default {
  props: ["guild"],
  components: { unit },
  data() {
    return {
      teamsConfig: [],
      teamOpen: ""
    };
  },
  methods: {
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
        name: player.name
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
    }
  },
  computed: {
    teams() {
      let teams = [];
      this.teamsConfig.forEach(team => {
        const index = teams.length;
        teams.push({
          name: team.name,
          players: []
        });
        this.guild.players.forEach(player => {
          teams[index].players.push(this.mountTeam(player, team));
        });
        teams[index].players = teams[index].players.sort(function(a, b) {
          return b.power - a.power;
        });
      });
      return teams;
    }
  },
  mounted() {
    this.teamsConfig = teamsConfig.teams;
  }
};
</script>
