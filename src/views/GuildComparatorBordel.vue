<template>
  <div class="comparator">
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
      <teams-tab v-if="tabIsActive('Your Teams')" :guild="yourGuild" />
      <teams-tab v-if="tabIsActive('Opponent Teams')" :guild="opponentGuild" />
      <arena-tab v-if="tabIsActive('Your Arena')" :guild="yourGuild" />
      <arena-tab v-if="tabIsActive('Opponent Arena')" :guild="opponentGuild" />
    </section>
  </div>
</template>

<script>
import yourGuild from "../assets/BordelJawa.json";
import opponentGuild from "../assets/The imperials legion.json";
import ResumeTab from "../components/comparator/resume";
import TeamsTab from "../components/comparator/teams";
import ArenaTab from "../components/comparator/arena";
export default {
  components: {
    ResumeTab,
    TeamsTab,
    ArenaTab
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
        { name: "Your Teams", active: false },
        { name: "Opponent Teams", active: false },
        { name: "Your Arena", active: false },
        { name: "Opponent Arena", active: false }
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
    this.setGuild(yourGuild, "your");
    this.setGuild(opponentGuild, "opponent");
    if (this.isDev) {
      console.log("Version dev");
    } else {
      console.log("Version prod");
    }
  }
};
</script>
