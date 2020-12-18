<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-4">
            <div class="columns is-tablet">
              <div class="column is-3">
                <div class="field">
                  Your Ally Code
                </div>
                <div class="field">
                  <input class="input is-fullwidth" v-model.trim="attackCode" />
                </div>
                <div class="field">
                  {{ attack.name }}<br />
                  GP: {{ formatNumber(attack.galactic_power) }}<br />
                  Matchmaker: {{ formatNumber(attackMatchmaker) }}<br />
                  Last update: ({{ attack.last_updated }})
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
                  Opponent Ally Code
                </div>
                <div class="field">
                  <input
                    class="input is-fullwidth"
                    v-model.trim="defenceCode"
                  />
                </div>
                <div class="field">
                  {{ defence.name }}<br />
                  GP: {{ formatNumber(defence.galactic_power) }}<br />
                  Matchmaker: {{ formatNumber(defenceMatchmaker) }}<br />
                  Last update: ({{ defence.last_updated }})
                </div>
              </div>
              <div class="column is-3">
                <div class="field">Actions</div>
                <input
                  class="button is-info is-fullwidth"
                  value="Search"
                  type="submit"
                  @click="getPlayers"
                />
              </div>
            </div>
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tabs is-large">
        <ul>
          <li :class="{ 'is-active': !showTabMatchmaker }">
            <a @click.prevent="showTabMatchmaker = false">Counters</a>
          </li>
          <li :class="{ 'is-active': showTabMatchmaker }">
            <a @click.prevent="showTabMatchmaker = true">MatchMaker</a>
          </li>
        </ul>
      </div>
      <div class="container" v-if="showTeams && showTabMatchmaker">
        <card-matchmaker />
      </div>
      <div class="container" v-if="showTeams && !showTabMatchmaker">
        <h1 class="title">Teams</h1>
        <card-team :team="teams[0]" v-if="isDev" />
        <card-team :team="team" v-for="team in teams" :key="team.id" v-else />
      </div>
    </section>
  </div>
</template>

<script>
import cardTeam from "../components/team";
import cardMatchmaker from "../components/matchmaker";
// import abilities from "../assets/baseData/abilities.json";
import counters from "../assets/baseData/counters.json";
import { mapState } from "vuex";

import player166159449 from "../assets/166159449.json";
import player884435532 from "../assets/884435532.json";

export default {
  name: "Home",
  components: {
    cardTeam,
    cardMatchmaker
  },
  data() {
    return {
      attackCode: "",
      defenceCode: "",
      showTabMatchmaker: false,
      showTeams: false
    };
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    getBaseInfos: function() {
      // this.$store.dispatch("setAbilities", abilities);
      this.$store.dispatch("setTeams", counters);
    },
    getPlayersTest: function() {
      this.$store.dispatch("setPlayer", player166159449);
      this.attackCode = "166159449";
      this.$store.dispatch("setPlayer", player884435532);
      this.defenceCode = "884435532";
      this.showTeams = true;
    },
    getPlayers: function() {
      this.$store.dispatch("startLoading");
      this.showTeams = false;
      this.$store.dispatch("clearPlayers");
      this.$http
        .get(`player/${this.attackCode}/`)
        .then(responseAttack => {
          this.$store.dispatch("setPlayer", responseAttack.body);
          this.$http
            .get(`player/${this.defenceCode}/`)
            .then(responseDefence => {
              this.$store.dispatch("setPlayer", responseDefence.body);
              this.$store.dispatch("endLoading");
              this.showTeams = true;
            })
            .catch(err => {
              console.error(err);
              this.$store.dispatch("endLoading");
            });
        })
        .catch(err => {
          console.error(err);
          this.$store.dispatch("endLoading");
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
    attackMatchmaker() {
      const aux = this.$store.getters.getMatchMakerCalc(
        this.$store.state.playerIndexAttack
      );
      return aux;
    },
    defenceMatchmaker() {
      const aux = this.$store.getters.getMatchMakerCalc(
        this.$store.state.playerIndexDefence
      );
      return aux;
    },

    isDev() {
      return Window.isDev || false;
    },
    ...mapState({
      teams: state => state.teams
    })
  },
  mounted() {
    this.getBaseInfos();
    if (this.isDev) {
      console.log("Version dev");
      this.getPlayersTest();
    } else {
      console.log("Version prod");
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
</style>
