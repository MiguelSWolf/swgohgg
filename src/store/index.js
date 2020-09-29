import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    getPlayerAttack: state => {
      return state.players[state.playerIndexAttack];
    },
    getPlayerDefence: state => {
      return state.players[state.playerIndexDefence];
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
          isLight: unit.alignment == "Light Side",
          isDark: unit.alignment == "Dark Side",
          abilities: []
        };
        state.units.push(aux);
      });
    },
    setTeams(state, payload) {
      state.teams = payload;
    },
    setPlayer(state, payload) {
      state.players.push(payload);
    }
  },
  actions: {
    setPlayer(context, payload) {
      context.commit("setPlayer", payload);
    },
    setAbilities(context, payload) {
      context.commit("setAbilities", payload);
    },
    setTeams(context, payload) {
      context.commit("setTeams", payload);
    },
    setUnits(context, payload) {
      context.commit("setUnits", payload);
    }
  },
  modules: {}
});
