<template>
  <div class="comparator">
    <section class="section">
      <div class="container">
        <form @submit.prevent="getGuild()">
          <div class="field is-grouped is-grouped-right">
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Your"
                v-model="yourGuild.code"
              />
            </p>
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Opponent"
                v-model="opponentGuild.code"
              />
            </p>
            <p class="control">
              <input type="submit" class="button is-info" value="Search" />
            </p>
          </div>
        </form>
      </div>
    </section>
    <section class="section">
      <div class="tabs">
        <ul>
          <li
            v-for="tab in tabs"
            :key="tab.name"
            :class="{ 'is-active': tab.active }"
            @click="activeTab(tab.name)"
          >
            <a>{{ tab.name }}</a>
          </li>
        </ul>
      </div>
      <resume-tab
        v-if="tabIsActive('Resume')"
        :yourGuild="yourGuild"
        :opponentGuild="opponentGuild"
      />
    </section>
  </div>
</template>

<script>
import yourGuild from "../assets/Despertar.json";
import opponentGuild from "../assets/Ascendancy-Usk.json";
import ResumeTab from "../components/comparator/resume";
export default {
  components: {
    ResumeTab
  },
  data() {
    return {
      yourGuild: {
        code: "",
        name: "",
        updated: "",
        power: "",
        totalPlayers: "",
        players: [],
        mods: []
      },
      opponentGuild: {
        code: "",
        name: "",
        updated: "",
        power: "",
        totalPlayers: "",
        players: [],
        mods: []
      },
      tabs: [
        { name: "Resume", active: false },
        { name: "Teams", active: false }
      ]
    };
  },
  methods: {
    getGuild() {
      const apiYour = `/api/guild/${this.yourGuild.code}`;
      const apiOpponent = `/api/guild/${this.opponentGuild.code}`;
      this.$store.dispatch("startLoading");
      this.$http.get(apiYour).then(responseYour => {
        this.setGuild(responseYour.body, "your");
        this.$http.get(apiOpponent).then(responseOpponent => {
          this.setGuild(responseOpponent.body, "opponent");
          this.$store.dispatch("endLoading");
        });
      });
    },
    setGuild(data, index) {
      this.resetGuild(index);
      this[`${index}Guild`].name = data.guild.name;
      this[`${index}Guild`].updated = data.guild.updated;
      this[`${index}Guild`].power = data.guild.power;
      this[`${index}Guild`].totalPlayers = data.guild.members;
      this[`${index}Guild`].players = data.players;
      this[`${index}Guild`].mods = data.mods;
    },
    resetGuild(index) {
      this[`${index}Guild`].players = [];
      this[`${index}Guild`].mods = [];
    },
    tabIsActive(name) {
      const tab = this.tabs.find(item => {
        return item.name === name;
      });
      if (tab) {
        return tab.active;
      }
    },
    activeTab(name) {
      this.tabs.forEach(item => {
        item.active = false;
      });
      const tabIndex = this.tabs.findIndex(item => {
        return item.name === name;
      });
      if (tabIndex >= 0) {
        this.tabs[tabIndex].active = true;
      }
    }
  },
  computed: {
    isDev() {
      return Window.isDev || false;
    }
  },
  mounted() {
    if (this.isDev) {
      console.log("Version dev");
      this.setGuild(yourGuild, "your");
      this.setGuild(opponentGuild, "opponent");
    } else {
      console.log("Version prod");
    }
  }
};
</script>
