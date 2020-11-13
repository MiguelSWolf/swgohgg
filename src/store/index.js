import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLoading: false,
    players: [],
    playerIndexAttack: 0,
    playerIndexDefence: 1,
    teams: [],
    units: []
  },
  getters: {
    getUnitById: state => id => {
      return state.units.find(unit => unit.id === id);
    },
    getUnitByName: state => name => {
      return state.units.find(unit => unit.name === name);
    },
    getUnitFromPlayerById: state => (id, player) => {
      if (!player === undefined || !id) return {};
      const unit = state.players[player].units.find(
        unit => unit.data.base_id === id
      );
      if (!unit) return {};
      return unit.data;
    },
    getUnitFromPlayerByName: state => (name, player) => {
      if (!player === undefined || !name) return {};
      const unit = state.players[player].units.find(
        unit => unit.data.name === name
      );
      if (!unit) return {};
      return unit.data;
    },
    getPlayerAttack: state => {
      return state.players[state.playerIndexAttack];
    },
    getPlayerDefence: state => {
      return state.players[state.playerIndexDefence];
    },
    calcTeamPower: (state, getters) => (team, index) => {
      let lead = getters.getUnitFromPlayerByName(team.lead, index);
      if (lead.name != null) {
        team.power += lead.power;
        team.squad.forEach(name => {
          const unit = getters.getUnitFromPlayerByName(name, index);
          if (unit.name != null) {
            team.power += unit.power ?? 0;
            team.count++;
          }
        });
        team.avg = parseInt(team.power / team.count);
      } else {
        team.haveLead = false;
      }
    },
    getMatchMakerCalc: state => index => {
      let gpUnits = [];
      if (!state.players[index]) return 0;
      state.players[index].units.forEach(unit => {
        if (unit.data.combat_type === 1) gpUnits.push(unit.data.power);
      });
      let gpUnitsSort = gpUnits.sort(function(a, b) {
        return a - b;
      });
      gpUnitsSort = gpUnitsSort.slice(gpUnitsSort.length - 80);
      let total = gpUnitsSort.reduce((a, b) => a + b, 0);
      return total;
    },
    getMatchMakerUnits: state => {
      if (!state.players[1]) return {};
      let yourMatchMakerUnits = [];
      state.players[0].units.forEach(unit => {
        if (unit.data.combat_type === 1)
          yourMatchMakerUnits.push({
            name: unit.data.name,
            power: unit.data.power
          });
      });
      let yourGpUnitsSort = yourMatchMakerUnits.sort(function(a, b) {
        return a.power - b.power;
      });
      yourGpUnitsSort = yourGpUnitsSort.reverse();
      yourGpUnitsSort = yourGpUnitsSort.slice(0, 80);

      let opponentMatchMakerUnits = [];
      state.players[1].units.forEach(unit => {
        if (unit.data.combat_type === 1)
          opponentMatchMakerUnits.push({
            name: unit.data.name,
            power: unit.data.power
          });
      });
      let opponentGpUnitsSort = opponentMatchMakerUnits.sort(function(a, b) {
        return a.power - b.power;
      });
      opponentGpUnitsSort = opponentGpUnitsSort.reverse();
      opponentGpUnitsSort = opponentGpUnitsSort.slice(0, 80);

      let matchMakerUnits = [];
      yourGpUnitsSort.forEach(unit => {
        matchMakerUnits.push({
          name: unit.name,
          yourPower: unit.power,
          opponentPower: 0
        });
      });
      opponentGpUnitsSort.forEach(unit => {
        let index = matchMakerUnits.findIndex(row => {
          if (unit.name == row.name) return true;
        });
        if (index >= 0) {
          matchMakerUnits[index].opponentPower = unit.power;
        } else {
          matchMakerUnits.push({
            name: unit.name,
            yourPower: 0,
            opponentPower: unit.power
          });
        }
      });

      let unitsSort = matchMakerUnits.sort(function(a, b) {
        let aPower = null;
        let bPower = null;
        if (a.yourPower > a.opponentPower) aPower = a.yourPower;
        else aPower = a.opponentPower;
        if (b.yourPower > b.opponentPower) bPower = b.yourPower;
        else bPower = b.opponentPower;
        return aPower - bPower;
      });
      unitsSort = unitsSort.reverse();
      return unitsSort;
    }
  },
  mutations: {
    setAbilities(state, payload) {
      payload.forEach(abilitie => {
        if (abilitie.combat_type == 1) {
          const indexUnit = state.units.findIndex(
            unit => unit.id == abilitie.character_base_id
          );
          if (indexUnit >= 0) {
            const aux = {
              id: abilitie.base_id,
              name: abilitie.name,
              image: `https://swgoh.gg/${abilitie.image}`,
              isOmega: abilitie.is_omega,
              isZeta: abilitie.is_zeta,
              tierMax: abilitie.tier_max
            };
            state.units[indexUnit].abilities.push(aux);
          } else {
            console.log(`Not found -${abilitie.character_base_id}-`);
          }
        }
      });
    },
    setUnits(state, payload) {
      payload.forEach(unit => {
        const aux = {
          id: unit.base_id,
          name: unit.name,
          image: `https://swgoh.gg/${unit.image}`,
          url: unit.url,
          // maxPower: unit.gp,
          isLight: unit.alignment == "Light Side",
          isDark: unit.alignment == "Dark Side"
          // abilities: []
        };
        state.units.push(aux);
      });
    },
    setTeams(state, payload) {
      const defaultConfig = {
        power: 0,
        avg: 0,
        count: 1,
        haveLead: true
      };
      payload.forEach(team => {
        team = { ...team, ...defaultConfig, chosenCounter: undefined };
        team.counters.forEach((counter, index) => {
          team.counters[index] = { ...counter, ...defaultConfig };
        });
        state.teams.push(team);
      });
    },
    setPlayer(state, { payload, getters }) {
      state.players.push(payload);
      if (state.players.length == 2) {
        state.teams.forEach(team => {
          getters.calcTeamPower(team, state.playerIndexAttack);
          team.counters.forEach(counterTeam => {
            getters.calcTeamPower(counterTeam, state.playerIndexDefence);
          });
        });
      }
    },
    clearPlayers(state) {
      state.players = [];
    },
    startLoading(state) {
      state.showLoading = true;
    },
    endLoading(state) {
      state.showLoading = false;
    }
  },
  actions: {
    setPlayer(context, payload) {
      context.commit("setPlayer", { payload, getters: context.getters });
    },
    setAbilities(context, payload) {
      context.commit("setAbilities", payload);
    },
    setTeams(context, payload) {
      context.commit("setTeams", payload);
    },
    setUnits(context, payload) {
      context.commit("setUnits", payload);
    },
    clearPlayers(context) {
      context.commit("clearPlayers");
    },
    startLoading(context) {
      context.commit("startLoading");
    },
    endLoading(context) {
      context.commit("endLoading");
    }
  },
  modules: {}
});
