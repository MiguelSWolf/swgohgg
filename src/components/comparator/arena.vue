<template>
  <div>
    <table class="table is-bordered is-fullwidth">
      <tr v-for="player in players" :key="player.name">
        <td>
          <strong>{{ player.name }}</strong>
          <br />
          Power: {{ player.power | formatNumber }}
          <br />
          Rank: {{ player.rank }}
        </td>
        <template v-for="n in 5">
          <td :key="n">
            <template v-for="(option, aux) in player[`position${n}`].options">
              <unit :unitData="option" :key="aux" />
            </template>
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>
<script>
import unit from "./unit";
export default {
  props: ["guild"],
  components: { unit },
  data() {
    return {
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
    mountTeam: function(player) {
      let team = {
        name: player.name,
        rank: player.arena.rank
      };
      let power = 0;
      team.position1 = this.mountPosition(player.characters, [
        player.arena.lead
      ]);
      power += team.position1.power;

      let index = 2;
      player.arena.squad.forEach(unit => {
        const ids = [unit];
        team[`position${index}`] = this.mountPosition(player.characters, ids);
        power += team[`position${index}`].power;
        index++;
      });

      team.power = power;
      return team;
    }
  },
  computed: {
    players() {
      let players = [];
      this.guild.players.forEach(player => {
        players.push(this.mountTeam(player));
      });
      players = players.sort(function(a, b) {
        return a.rank - b.rank;
      });
      return players;
    }
  }
};
</script>
