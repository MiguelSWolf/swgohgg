import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    teams: [],
    units: []
  },
  getters: {
    getUnitById: state => id => {
      return state.units.find(unit => unit.id === id);
    },
    getUnitByName: state => name => {
      console.log(name);
      console.log(state.units.find(unit => unit.name === name));
      return state.units.find(unit => unit.name === name);
    }
  },
  mutations: {
    setAbilities(state, payload) {
      payload.forEach(abilitie => {
        if (abilitie.combat_type == 1) {
          const indexUnit = state.units.findIndex(
            unit => unit.id == abilitie.character_base_id
          );
          if (indexUnit > 0) {
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
            console.log(`Not found ${abilitie.character_base_id}`);
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
          abilities: []
        };
        state.units.push(aux);
      });
    },
    setTeams(state, payload) {
      state.teams = payload;
      console.log(payload);
    }
  },
  actions: {
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
