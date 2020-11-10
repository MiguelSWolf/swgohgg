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
import cardTeam from "../components/team";
import cardMatchmaker from "../components/matchmaker";
// import abilities from "../assets/baseData/abilities.json";
import counters from "../assets/baseData/counters.json";
import units from "../assets/baseData/characters.json";
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
      loading: false,
      showTabMatchmaker: false,
      showTeams: false
    };
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    getBaseInfos: function() {
      this.$store.dispatch("setUnits", units);
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
      this.loading = true;
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
              this.loading = false;
              this.showTeams = true;
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
