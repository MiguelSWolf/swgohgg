<template>
  <section class="section">
    <div style="margin-bottom: 20px">
      <div class="button is-primary" @click.prevent="addTeam">Add Team</div>
    </div>
    <div
      class="card"
      style="margin-bottom: 20px"
      v-for="(team, indexTeam) in teams"
      :key="indexTeam"
    >
      <header class="card-header">
        <p class="card-header-title">
          {{ team.name }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <table class="table is-bordered">
            <tr>
              <th colspan="5">Positions</th>
            </tr>
            <tr>
              <td :key="n" v-for="n in 5" style="width: 170px">
                <select-toon v-model="teams[indexTeam].toons[n]" label="" />
                <unit :idToon="teams[indexTeam].toons[n]" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import SelectToon from "../components/teams/selectToon.vue";
import unit from "../components/teams/unit";
export default {
  components: { unit, SelectToon },
  data() {
    return {
      teams: []
    };
  },
  methods: {
    addTeam: function() {
      this.teams.push({
        name: "Team " + (this.teams.length + 1),
        toons: [{}, {}, {}, {}, {}],
        isEditing: true
      });
    }
    // mountUnit: function(characters, id) {
    //   let unit = characters.find(element => {
    //     return element.id === id;
    //   });
    //   if (!unit) unit = {};
    //   let unitReturn = {
    //     id,
    //     gear: unit.gear || 0,
    //     rarity: unit.rarity || 0,
    //     relic: unit.relic || 0,
    //     zeta: unit.zeta || 0,
    //     power: unit.power || 0
    //   };
    //   return unitReturn;
    // },
    // mountPosition: function(characters, ids, spaces) {
    //   if (!spaces) spaces = 1;
    //   let position = this.basePosition();
    //   let power = 0;
    //   ids.forEach(id => {
    //     let unit = this.mountUnit(characters, id);
    //     if (unit) {
    //       position.options.push(unit);
    //       power += unit.power;
    //     }
    //   });
    //   power = (power * spaces) / position.options.length;
    //   power = Math.round(power);
    //   position.power = power;
    //   position.show = true;
    //   return position;
    // },
    // mountTeam: function(player, teamConfig) {
    //   let team = {
    //     name: player.name,
    //     selected: false,
    //     position1: {},
    //     position2: {},
    //     position3: {},
    //     position4: {},
    //     position5: {}
    //   };
    //   team.position1 = this.mountPosition(player.characters, [teamConfig.lead]);
    //   let index = 2;
    //   teamConfig.squad.forEach(unit => {
    //     const ids = [unit];
    //     team[`position${index}`] = this.mountPosition(player.characters, ids);
    //     index++;
    //   });
    //   if (teamConfig.optional) {
    //     teamConfig.optional.forEach(optional => {
    //       let ids = [unit];
    //       optional.squad.forEach(unit => {
    //         ids.push(unit);
    //       });
    //       let characters = player.characters;
    //       let spaces = optional.spaces;
    //       let position = this.mountPosition(characters, ids, spaces);
    //       team[`position${index}`] = position;
    //       index += optional.spaces;
    //     });
    //   }
    //   let power = 0;
    //   for (let i = 1; i < 6; i++) {
    //     power += team[`position${i}`].power;
    //   }
    //   team.power = power;
    //   return team;
    // },
    // mountTeams: function() {
    //   let teams = [];
    //   this.teamsConfig.forEach(team => {
    //     const index = teams.length;
    //     teams.push({
    //       name: team.name,
    //       players: [],
    //     });
    //     this.guild.players.forEach(player => {
    //       teams[index].players.push(this.mountTeam(player, team));
    //     });
    //     teams[index].players = teams[index].players.sort(function(a, b) {
    //       return b.power - a.power;
    //     });
    //   });
    //   this.teams = teams;
    // }
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
</style>
