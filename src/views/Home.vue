<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <div class="columns is-tablet">
              <div class="column is-3">
                <div class="field">
                  <input
                    class="input is-fullwidth is-large"
                    v-model="attackCode"
                  />
                </div>
                <div class="field">
                  {{ attack.name }}
                </div>
              </div>
              <div
                class="column is-1"
                style="text-align:center; line-height: 45px"
              >
                VS.
              </div>
              <div class="column is-3">
                <div class="field">
                  <input
                    class="input is-fullwidth is-large"
                    v-model="defenceCode"
                  />
                </div>
                <div class="field">
                  {{ defence.name }}
                </div>
              </div>
              <div class="column is-3">
                <input
                  class="button is-info is-large is-fullwidth"
                  value="Search"
                  @click="getPlayers"
                />
              </div>
            </div>
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Teams</h1>
        <!-- <card-team :team="team" v-for="team in teams" :key="team.id" /> -->
      </div>
    </section>
  </div>
</template>

<script>
// import cardTeam from "../components/team";
import abilities from "../assets/baseData/abilities.json";
import counters from "../assets/baseData/counters.json";
import units from "../assets/baseData/characters.json";
import { mapState } from "vuex";

import player166159449 from "../assets/166159449.json";
import player884435532 from "../assets/884435532.json";

export default {
  name: "Home",
  components: {
    // cardTeam
  },
  data() {
    return {
      attackCode: "",
      defenceCode: "",
      loading: false
    };
  },
  methods: {
    getBaseInfos: function() {
      this.$store.dispatch("setUnits", units);
      this.$store.dispatch("setAbilities", abilities);
      this.$store.dispatch("setTeams", counters);
    },
    getPlayersTest: function() {
      this.$store.dispatch("setPlayer", player166159449);
      this.attackCode = "166159449";
      this.$store.dispatch("setPlayer", player884435532);
      this.defenceCode = "884435532";
    },
    getPlayers: function() {
      this.loading = true;
      console.log("start first");
      this.$http
        .get(`https://swgoh.gg/api/player/166159449/`)
        .then(responseAttack => {
          console.log({ responseAttack: responseAttack });
          this.$store.dispatch("setPlayer", responseAttack);
          console.log("start second");
          this.$http
            .get(`https://swgoh.gg/api/player/${this.defenceCode}/`)
            .then(responseDefence => {
              console.log({ responseDefence: responseDefence });
              this.$store.dispatch("setPlayer", responseDefence);
              this.loading = false;
            })
            .catch(err => {
              console.error(err);
              this.loading = false;
            });
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
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
    this.attackCode = "166159449";
    this.defenceCode = "884435532";
    if (Window.isDev) {
      console.log("Versão dev");
    } else {
      console.log("Versão prod");
    }
    this.getBaseInfos();
    // if (Window.isDev) {
    //   this.getPlayersTest();
    // } else {
    // this.getPlayers();
    // }
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
