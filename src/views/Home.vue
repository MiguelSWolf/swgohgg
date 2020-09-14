<template>
  <div class="home">
    <div class="list">
      <!-- <div v-for="unit in player.ground" :key="unit.id">
          <unit :unit="unit" />
      </div> -->
    </div>
    <div class="listTeams">
      <team
        :team="team"
        :teams="teams"
        :showCounter="true"
        :ground="player.ground"
        v-for="team in teams"
        :key="team.name"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
// import unit from "../components/unit";
import team from "../components/team";

export default {
  name: "Home",
  data: function() {
    return {
      player: {
        data: {
          name: "",
          guild: ""
        },
        ground: [],
        ship: [],
        arenaShip: {
          rank: 0,
          lead: "",
          squad: [],
          reforcement: []
        },
        arenaGround: {
          rank: 0,
          lead: "",
          squad: []
        }
      },
      teams: [
        {
          name: "ZBossk",
          lead: "BOSSK",
          squadNeeded: [],
          squadOption: [
            "AURRA_SING",
            "BOBAFETT",
            "JANGOFETT",
            "CADBANE",
            "DENGAR",
            "EMBO",
            "GREEDO",
            "GREEFKARGA",
            "IG88"
          ],
          counter: ["ZNute", "ZRey"]
        },
        {
          name: "ZNute",
          lead: "NUTEGUNRAY",
          squadNeeded: [],
          squadOption: ["WATTAMBOR", "COUNTDOOKU", "JANGOFETT", "ENFYSNEST"],
          counter: []
        },
        {
          name: "ZRey",
          lead: "REYJEDITRAINING",
          squadNeeded: [],
          squadOption: ["BB8", "REY", "FINN", "RESISTANCETROOPER"],
          counter: []
        }
      ],
      code: 295177617,
      token: "8e1f5f4742763e2f32ee2a3151f742184382a148",
      apiSwgoh: "https://api.swgoh.help/swgoh/",
      loading: false
    };
  },
  components: {
    // unit,
    team
  },
  methods: {
    getPlayerData: function() {
      this.loading = true;
      const headers = {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json"
      };
      const data = { allycodes: [this.code] };
      this.$http
        // .post(`${this.apiSwgoh}players`, data, { headers })
        .get("data.json", data, { headers })
        .then(resource => {
          this.player.data.name = resource.body[0].name;
          this.player.data.guild = resource.body[0].guildName;
          resource.body[0].roster.forEach(element => {
            if (element.combatType == 1) {
              let unit = {
                id: element.defId,
                name: element.defId,
                photo: `https://swgoh.gg/game-asset/u/${element.defId}/`,
                gear: element.gear,
                rarity: element.rarity,
                relic: element.relic.currentTier,
                // skills: element.skills,
                // mods: element.mods,
                gp: element.gp,
                level: element.level
              };
              this.player.ground.push(unit);
            }
          });

          this.loading = false;
        });
    }
  },
  mounted() {
    this.getPlayerData();
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
