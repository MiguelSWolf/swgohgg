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
      <div class="table-container">
        <h2>Units</h2>
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr>
            <th>Name</th>
            <th>Your</th>
            <th>Opponent</th>
            <th>Balance</th>
          </tr>
          <tr v-for="row in resumeToons" :key="row.name">
            <th>{{ row.name }}</th>
            <td>{{ row.your }}</td>
            <td>{{ row.opponent }}</td>
            <td>{{ row.balance }}</td>
          </tr>
        </table>

        <h2>Mods</h2>
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr>
            <th>Name</th>
            <th>Your</th>
            <th>Opponent</th>
            <th>Balance</th>
          </tr>
          <tr v-for="row in resumeMods" :key="row.name">
            <th>{{ row.name }}</th>
            <td>{{ row.your }}</td>
            <td>{{ row.opponent }}</td>
            <td>{{ row.balance }}</td>
          </tr>
        </table>

        <h2>Gears</h2>
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr>
            <th>Name</th>
            <th>Your</th>
            <th>Opponent</th>
            <th>Balance</th>
          </tr>
          <tr v-for="row in resumeGears" :key="row.name">
            <th>{{ row.name }}</th>
            <td>{{ row.your }}</td>
            <td>{{ row.opponent }}</td>
            <td>{{ row.balance }}</td>
          </tr>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yourGuild: {
        code: "724522764",
        name: "",
        players: [],
        mods: []
      },
      opponentGuild: {
        code: "568739525",
        name: "",
        players: [],
        mods: []
      },
      configResume: [
        {
          name: "SLKR [G13]",
          toon: "SUPREMELEADERKYLOREN",
          gear: 13
        },
        {
          name: "Rey [G13]",
          toon: "GLREY",
          gear: 13
        },
        {
          name: "JML [G13]",
          toon: "GRANDMASTERLUKE",
          gear: 13
        },
        {
          name: "SEE [G13]",
          toon: "SITHPALPATINE",
          gear: 13
        },
        {
          name: "GAS [G13]",
          toon: "GENERALSKYWALKER",
          gear: 13
        },
        {
          name: "Malak [G12+]",
          toon: "DARTHMALAK",
          gear: 12
        },
        {
          name: "Padme [G13]",
          toon: "PADMEAMIDALA",
          gear: 13
        },
        {
          name: "JKR [G12+]",
          toon: "JEDIKNIGHTREVAN",
          gear: 12
        },
        {
          name: "GG [G13]",
          toon: "GRIEVOUS",
          gear: 13
        }
      ],
      resumeGears: [],
      countToons: [],
      teamsReady: false
    };
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    fillToon(toon) {
      return {
        toon: toon,
        your: Array(23).fill(0),
        opponent: Array(23).fill(0)
      };
    },
    countGear(gear, relic, index) {
      if (gear < 11) return;
      else if (gear < 12) this.resumeGears[0][index]++;
      else if (gear < 13) this.resumeGears[1][index]++;
      else {
        this.resumeGears[2][index]++;
        if (relic < 5) this.resumeGears[3][index]++;
        else if (relic < 8) this.resumeGears[4][index]++;
        else this.resumeGears[5][index]++;
      }
    },
    countResumeToons() {
      const aux = ["your", "opponent"];
      aux.forEach(index => {
        this[`${index}Guild`].players.forEach(player => {
          player.characters.forEach(unit => {
            let indexToon = this.countToons.findIndex(row => {
              return unit.id == row.toon;
            });
            if (indexToon == -1) {
              indexToon = this.countToons.length;
              this.countToons.push(this.fillToon(unit.id));
            }
            this.countToons[indexToon][index][unit.gear]++;
            this.countGear(unit.gear, unit.relic, index);
          });
        });
      });
    },
    fillResumeGears() {
      this.resumeGears.push({ name: "G11", ...this.balanceFill });
      this.resumeGears.push({ name: "G12", ...this.balanceFill });
      this.resumeGears.push({ name: "G13", ...this.balanceFill });
      this.resumeGears.push({ name: "Tier 0~2", ...this.balanceFill });
      this.resumeGears.push({ name: "Tier 3~5", ...this.balanceFill });
      this.resumeGears.push({ name: "Tier 6~7", ...this.balanceFill });
    },
    getGuild() {
      const apiYour = `/api/guild/${this.yourGuild.code}`;
      const apiOpponent = `/api/guild/${this.opponentGuild.code}`;
      this.$http.get(apiYour).then(responseYour => {
        this.yourGuild.players = responseYour.body.players;
        this.yourGuild.mods = responseYour.body.mods;
        this.$http.get(apiOpponent).then(responseOpponent => {
          this.opponentGuild.players = responseOpponent.body.players;
          this.opponentGuild.mods = responseOpponent.body.mods;
          this.countResumeToons();
        });
      });
    }
  },
  computed: {
    isDev() {
      return Window.isDev || false;
    },
    resumeToons() {
      let resume = [];
      this.configResume.forEach(configRow => {
        let row = {
          name: configRow.name,
          your: 0,
          opponent: 0,
          balance: 0
        };
        let unit = this.countToons.find(unit => {
          return unit.toon == configRow.toon;
        });
        if (unit) {
          for (let i = configRow.gear; i < 23; i++) {
            row.your += unit.your[i];
            row.opponent += unit.opponent[i];
          }
        }
        resume.push(row);
      });
      return resume;
    },
    balanceFill() {
      return { your: 0, opponent: 0, balance: 0 };
    },
    resumeMods() {
      let resume = [];
      let obj = { name: "15+ speed mods", ...this.balanceFill };
      let i;
      for (i = 15; i < 20; i++) {
        obj.your += this.yourGuild.mods[i] || 0;
        obj.opponent += this.opponentGuild.mods[i] || 0;
      }
      resume.push(obj);

      obj = { name: "20+ speed mods", ...this.balanceFill };
      for (; i < 25; i++) {
        obj.your += this.yourGuild.mods[i] || 0;
        obj.opponent += this.opponentGuild.mods[i] || 0;
      }
      resume.push(obj);

      obj = { name: "25+ speed mods", ...this.balanceFill };
      for (; i < 32; i++) {
        obj.your += this.yourGuild.mods[i] || 0;
        obj.opponent += this.opponentGuild.mods[i] || 0;
      }
      resume.push(obj);

      return resume;
    }
  },
  mounted() {
    this.fillResumeGears();
    if (this.isDev) {
      console.log("Version dev");
      this.$http.get(`/api/guild/568739525`).then(({ body }) => {
        this.yourGuild.players = body.players;
        this.opponentGuild.players = body.players;
        this.yourGuild.mods = body.mods;
        this.opponentGuild.mods = body.mods;
        this.countResumeToons();
      });
    } else {
      console.log("Version prod");
    }
  }
};
</script>
