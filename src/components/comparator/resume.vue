<template>
  <div class="table-container">
    <h2>Units</h2>
    <table-balance
      :data="resumeGLs"
      :your="yourGuild.name"
      :opponent="opponentGuild.name"
    />

    <table-balance
      :data="resumeToons"
      :your="yourGuild.name"
      :opponent="opponentGuild.name"
    />

    <h2>Ships</h2>
    <table-balance
      :data="resumeShips"
      :your="yourGuild.name"
      :opponent="opponentGuild.name"
    />

    <h2>Mods</h2>
    <table-balance
      :data="resumeMods"
      :your="yourGuild.name"
      :opponent="opponentGuild.name"
    />

    <h2>Gears</h2>
    <table-balance
      :data="resumeGears"
      :your="yourGuild.name"
      :opponent="opponentGuild.name"
    />
  </div>
</template>

<script>
import TableBalance from "../tablaBalance";
export default {
  props: ["yourGuild", "opponentGuild"],
  components: {
    TableBalance
  },
  data() {
    return {
      countToons: [],
      countShips: [],
      configGL: [
        {
          name: "JABBA [G13]",
          toon: "JABBATHEHUTT",
          gear: 13
        },
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
          name: "JMK [G13]",
          toon: "JEDIMASTERKENOBI",
          gear: 13
        },
        {
          name: "LOVE [G13]",
          toon: "LORDVADER",
          gear: 13
        }
      ],
      configResume: [
        {
          name: "BEN [G13]",
          toon: "BENSOLO",
          gear: 13
        },
        {
          name: "MAUL [G13]",
          toon: "MAULS7",
          gear: 13
        },
        {
          name: "MALGUS [G13]",
          toon: "DARTHMALGUS",
          gear: 1
        },
        {
          name: "KK [G13]",
          toon: "KYLEKATARN",
          gear: 13
        },
        {
          name: "CAT [G13]",
          toon: "COMMANDERAHSOKA",
          gear: 13
        },
        // {
        //   name: "BOBAFAT [G13]",
        //   toon: "BOBAFETTSCION",
        //   gear: 13
        // },
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
          name: "KAM [G13]",
          toon: "KIADIMUNDI",
          gear: 13
        },
        // {
        //   name: "DR [G12+]",
        //   toon: "DARTHREVAN",
        //   gear: 12
        // },
        // {
        //   name: "Padme [G13]",
        //   toon: "PADMEAMIDALA",
        //   gear: 13
        // },
        // {
        //   name: "JKR [G12+]",
        //   toon: "JEDIKNIGHTREVAN",
        //   gear: 12
        // },
        // {
        //   name: "GG [G13]",
        //   toon: "GRIEVOUS",
        //   gear: 13
        // },
        {
          name: "JKL [G13]",
          toon: "JEDIKNIGHTLUKE",
          gear: 13
        }
      ],
      configShips: [
        {
          name: "NEGO [7*]",
          toon: "CAPITALNEGOTIATOR",
          rarity: 7
        },
        {
          name: "MALE [7*]",
          toon: "CAPITALMALEVOLENCE",
          rarity: 7
        },
        {
          name: "PROFUNDITY [7*]",
          toon: "CAPITALPROFUNDITY",
          rarity: 7
        },
        {
          name: "PROFUNDITY [6*]",
          toon: "CAPITALPROFUNDITY",
          rarity: 6
        },
        {
          name: "PROFUNDITY [5*]",
          toon: "CAPITALPROFUNDITY",
          rarity: 5
        },
        {
          name: "PROFUNDITY [4*]",
          toon: "CAPITALPROFUNDITY",
          rarity: 4
        },
        {
          name: "EXECUTOR [7*]",
          toon: "CAPITALEXECUTOR",
          rarity: 7
        },
        {
          name: "EXECUTOR [6*]",
          toon: "CAPITALEXECUTOR",
          rarity: 6
        },
        {
          name: "EXECUTOR [5*]",
          toon: "CAPITALEXECUTOR",
          rarity: 5
        },
        {
          name: "EXECUTOR [4*]",
          toon: "CAPITALEXECUTOR",
          rarity: 4
        },
        {
          name: "VULTURE [7*]",
          toon: "VULTUREDROID",
          rarity: 7
        },
        {
          name: "HYENA [7*]",
          toon: "HYENABOMBER",
          rarity: 7
        }
      ],
      resumeGears: []
    };
  },
  methods: {
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
    fillToon(toon) {
      return {
        toon: toon,
        your: Array(23).fill(0),
        opponent: Array(23).fill(0)
      };
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

          player.ships.forEach(ship => {
            if (
              ship.id == "CAPITALNEGOTIATOR" ||
              ship.id == "CAPITALMALEVOLENCE" ||
              ship.id == "CAPITALEXECUTOR" ||
              ship.id == "CAPITALPROFUNDITY" ||
              ship.id == "VULTUREDROID" ||
              ship.id == "HYENABOMBER"
            ) {
              let indexShip = this.countShips.findIndex(row => {
                return ship.id == row.toon;
              });
              if (indexShip == -1) {
                indexShip = this.countShips.length;
                this.countShips.push(this.fillToon(ship.id));
              }
              this.countShips[indexShip][index][ship.rarity]++;
            }
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
    }
  },
  computed: {
    resumeGLs() {
      let resume = [];
      let your = 0;
      let opponent = 0;
      this.configGL.forEach(configRow => {
        let row = {
          name: configRow.name,
          your: 0,
          opponent: 0
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
        your += row.your;
        opponent += row.opponent;
      });
      resume.push({
        name: "Total",
        your,
        opponent
      });
      return resume;
    },
    resumeToons() {
      let resume = [];
      let your = 0;
      let opponent = 0;
      this.configResume.forEach(configRow => {
        let row = {
          name: configRow.name,
          your: 0,
          opponent: 0
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
        your += row.your;
        opponent += row.opponent;
      });
      resume.push({
        name: "Total",
        your,
        opponent
      });
      return resume;
    },
    balanceFill() {
      return { your: 0, opponent: 0 };
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
    },
    resumeShips() {
      let resume = [];
      let your = 0;
      let opponent = 0;
      this.configShips.forEach(configRow => {
        let row = {
          name: configRow.name,
          your: 0,
          opponent: 0
        };
        let ship = this.countShips.find(ship => {
          return ship.toon == configRow.toon;
        });
        if (ship) {
          row.your += ship.your[configRow.rarity];
          row.opponent += ship.opponent[configRow.rarity];
        }
        resume.push(row);
        your += row.your;
        opponent += row.opponent;
      });
      resume.push({
        name: "Total",
        your,
        opponent
      });
      return resume;
    }
  },
  mounted() {
    this.fillResumeGears();
    this.countResumeToons();
  }
};
</script>
