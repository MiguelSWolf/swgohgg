<template>
  <div>
    <div class="card" v-for="(team, index) in teams" :key="index">
      <h1>{{ team.name }}</h1>
      <table class="table is-bordered is-fullwidth">
        <tr v-for="player in team.players" :key="player.name">
          <th>{{ player.name }}</th>
          <template v-for="index in 5">
            <td :key="index">
              <unit :unitData="player[`position${index}`].options[0]" />
              <!-- {{ player[`position${index}`] }} -->
            </td>
          </template>
        </tr>
      </table>
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
      teamsConfig: []
    };
  },
  methods: {
    basePosition: function() {
      return {
        quantity: 1,
        show: false,
        options: []
      };
    },
    mountUnit: function(characters, id) {
      const unit = characters.find(element => {
        return element.id === id;
      });
      let unitReturn = {
        id,
        gear: unit.gear,
        rarity: unit.rarity,
        relic: unit.relic,
        zeta: unit.zeta,
        power: unit.power || 0
      };

      return unitReturn;
    },
    mountTeam: function(player, teamConfig) {
      let team = {
        name: player.name,
        position1: this.basePosition(),
        position2: this.basePosition(),
        position3: this.basePosition(),
        position4: this.basePosition(),
        position5: this.basePosition()
      };
      team.position1.options.push(
        this.mountUnit(player.characters, teamConfig.lead)
      );

      let index = 2;
      teamConfig.squad.forEach(unit => {
        team[`position${index}`].options.push(
          this.mountUnit(player.characters, unit)
        );
        index++;
      });
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
          players: [],
          open: false
        });
        this.guild.players.forEach(player => {
          teams[index].players.push(this.mountTeam(player, team));
          //   player.characters;
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
