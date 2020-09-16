<template>
  <div class="home">
    <div class="list">
      <!-- <div v-for="unit in player.ground" :key="unit.id">
          <unit :unit="unit" />
      </div> -->
    </div>
    <div class="listTeams">
      <card-team :team="team" v-for="team in teams" :key="team.id" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
// import unit from "../components/unit";
import cardTeam from "../components/team";
import abilities from "../assets/baseData/abilities.json";
import counters from "../assets/baseData/counters.json";
import units from "../assets/baseData/characters.json";
import { mapState } from "vuex";
// import gears from '../assets/baseData/gears.json';

export default {
  name: "Home",
  components: {
    // unit,
    cardTeam
  },
  methods: {
    getBaseInfos: function() {
      this.$store.dispatch("setUnits", units);
      this.$store.dispatch("setAbilities", abilities);
      this.$store.dispatch("setTeams", counters);
    },
    getPlayerData: function() {
      this.loading = true;
      const headers = {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json"
      };
      const data = { allycodes: [this.code] };
      this.$http.get("data.json", data, { headers }).then(resource => {
        console.log(resource);
        this.loading = false;
      });
      // https://swgoh.gg/api/player/{ally_code}/
      // 166159449
    }
  },
  computed: mapState({
    teams: state => state.teams
  }),
  mounted() {
    this.getBaseInfos();
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
</style>
