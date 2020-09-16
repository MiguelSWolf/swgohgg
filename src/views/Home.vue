<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <div class="columns is-mobile">
              <div class="column">
                {{ attack.name }}
              </div>
              <div class="column">
                VS.
              </div>
              <div class="column">
                {{ defence.name }}
              </div>
            </div>
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Teams</h1>
        <card-team :team="team" v-for="team in teams" :key="team.id" />
      </div>
    </section>
  </div>
</template>

<script>
import cardTeam from "../components/team";
import abilities from "../assets/baseData/abilities.json";
import counters from "../assets/baseData/counters.json";
import units from "../assets/baseData/characters.json";
import { mapState } from "vuex";

import player166159449 from "../assets/166159449.json";
import player884435532 from "../assets/884435532.json";

export default {
  name: "Home",
  components: {
    cardTeam
  },
  methods: {
    getBaseInfos: function() {
      this.$store.dispatch("setUnits", units);
      this.$store.dispatch("setAbilities", abilities);
      this.$store.dispatch("setTeams", counters);
    },
    getPlayerData: function() {
      // TODO
      // https://swgoh.gg/api/player/{ally_code}/
      // 166159449
    },
    getPlayersTest: function() {
      this.$store.dispatch("setPlayer", player166159449);
      this.$store.dispatch("setPlayer", player884435532);
    }
  },
  computed: {
    attack() {
      const aux = this.$store.getters.getPlayerAttack;
      if (!aux) return false;
      return aux.data;
    },
    defence() {
      const aux = this.$store.getters.getPlayerDefence;
      if (!aux) return false;
      return aux.data;
    },
    ...mapState({
      teams: state => state.teams
    })
  },
  mounted() {
    this.getBaseInfos();
    this.getPlayersTest();
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
