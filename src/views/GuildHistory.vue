<template>
  <div class="comparator">
    <!-- <section class="section">
      <div class="columns">
        <div class="column">
          <div class="select">
            <select v-model="date1">
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
              >
                {{ timeConverter(option) }}
              </option>
            </select>
          </div>
        </div>

        <div class="column">
          <div class="select">
            <select v-model="date2">
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
              >
                {{ timeConverter(option) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </section> -->
    <section class="section">
      <!-- <resume-tab
        v-if="tabIsActive('Resume')"
        :yourGuild="yourGuild"
        :opponentGuild="opponentGuild"
      /> -->
      <!-- {{ diffPlayers["166159449"] }} -->
      <div
        v-for="(player, indexPlayer) in diffPlayers"
        :key="indexPlayer"
        class="card"
        style="margin-bottom: 20px"
      >
        <div class="card-header">
          <div class="card-header-title">{{ player.name }}</div>
        </div>
        <div class="card-content">
          <div
            style="border-bottom: 1px solid #ccc; margin-bottom: 20px;"
            v-for="(character, index) in player.characters"
            :key="index"
          >
            <strong>{{ index }}</strong
            ><br />
            <div class="columns">
              <div class="column">
                <unit :unitData="character.old" :key="`${index}_old`" />
              </div>
              <div class="column">
                <unit :unitData="character.new" :key="`${index}_new`" />
              </div>
              <div class="column">
                Power: {{ character.old.power }} 🠖 {{ character.new.power
                }}<br />
                Gears Equipped: {{ character.old.equipped }} 🠖
                {{ character.new.equipped }}<br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import current from "../assets/boteco/1625682588603.json";
import pass from "../assets/boteco/1624828176956.json";
import unit from "../components/comparator/unit";
export default {
  components: { unit },
  data() {
    return {
      options: [
        1623089386989,
        1623541062549,
        1624050995303,
        1624385314610,
        1624828176956
      ],
      currentGuild: {
        code: "",
        name: "",
        updated: "",
        power: "",
        totalPlayers: "",
        players: []
      },
      passGuild: {
        code: "",
        name: "",
        updated: "",
        power: "",
        totalPlayers: "",
        players: []
      },
      date1: null,
      date2: null
    };
  },
  methods: {
    setGuild(data, index) {
      this[`${index}Guild`].name = data.guild.name;
      this[`${index}Guild`].updated = data.guild.updated;
      this[`${index}Guild`].power = data.guild.power;
      this[`${index}Guild`].totalPlayers = data.guild.members;
      this[`${index}Guild`].players = data.players;
      this[`${index}Guild`].mods = data.mods;
    },
    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      return time;
    }
  },
  computed: {
    isDev() {
      return Window.isDev || false;
    },
    diffPlayers() {
      let players = {};
      this.currentGuild.players.forEach(player => {
        const allyCode = player.allyCode;
        const passPlayerIndex = this.passGuild.players.findIndex(
          passPlayer => allyCode == passPlayer.allyCode
        );
        const passPlayer = this.passGuild.players[passPlayerIndex];
        // console.log({passPlayerIndex});
        if (passPlayerIndex >= 0) {
          players[allyCode] = {};
          players[allyCode].name = player.name;
          //   players[allyCode].index = passPlayerIndex;
          players[allyCode].characters = {};
          player.characters.forEach(toon => {
            let oldToon = passPlayer.characters.find(
              oldToon => toon.id == oldToon.id
            );
            if (
              !oldToon ||
              // oldToon.power != toon.power ||
              oldToon.rarity != toon.rarity ||
              oldToon.relic != toon.relic ||
              oldToon.equipped != toon.equipped ||
              oldToon.zeta != toon.zeta
            ) {
              if (!oldToon) oldToon = {};
              let compareToon = {
                new: {
                  id: toon.id,
                  power: toon.power,
                  rarity: toon.rarity,
                  relic: toon.relic,
                  equipped: toon.equipped,
                  gear: toon.gear,
                  zeta: toon.zeta
                },
                old: {
                  id: toon.id,
                  power: oldToon.power || 0,
                  rarity: oldToon.rarity || 0,
                  relic: oldToon.relic || 0,
                  equipped: oldToon.equipped || 0,
                  gear: oldToon.gear || 0,
                  zeta: oldToon.zeta || 0
                }
              };
              // compareToon
              players[allyCode].characters[toon.id] = compareToon;
            }
          });
          //   players[allyCode].passPlayer = passPlayer;
          // players[allyCode].diff = player.power - passPlayer.power;
        }
      });
      // this.current
      return players;
    }
    // diffPlayer() {
    //   return this.diffPlayers["166159449"] || [];
    // }
  },
  // watch: {
  //   date1: function(newVal) {
  //     this.setGuild(newVal, "current");
  //   },
  //   date2: function(newVal) {
  //     this.setGuild(newVal, "pass");
  //   }
  // },
  mounted() {
    this.setGuild(current, "current");
    this.setGuild(pass, "pass");
    if (this.isDev) {
      console.log("Version dev");
    } else {
      console.log("Version prod");
    }
  }
};
</script>
