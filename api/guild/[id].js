/* eslint-disable no-unreachable */
import staticData from "./../../src/assets/guild-568739525.json";

const ApiSwgohHelp = require("api-swgoh-help");
let resumeMods = new Array(30).fill(0);
const swapi = new ApiSwgohHelp({
  username: "hachaalma",
  password: "qwert12345!",
  dump: true
});
const getAllPlayersIds = async id => {
  if (id == "1") return "development";
  const payload = { allycodes: [id] };
  let { result, error } = await swapi.fetchGuild(payload);
  if (error) {
    console.error("Deu pau na API");
    throw error;
  }

  const membersId = [];
  result[0].roster.forEach(member => {
    membersId.push(member.allyCode);
  });
  const guild = {
    name: result[0].name,
    updated: result[0].updated,
    power: result[0].gp,
    members: result[0].members
  };
  console.log(`Dados obtidos da guilda ${guild.name}`);
  console.log(`Players obtidos: ${membersId.length}`);
  console.log("------------------------");
  return { membersId, guild };
};

const getInfoPlayers = async members => {
  if (members == "development") {
    return staticData.return;
  }
  let players = [];
  let antesTotal = Date.now();
  for (const member of members) {
    console.log(`------------------------------------`);
    console.log(`Buscando ${players.length + 1}/${members.length}`);
    let antes = Date.now();
    let query = null;
    let hasResults;
    do {
      hasResults = false;
      query = await swapi.fetchPlayer({ allycodes: [member] });
      if (query.result && query.result.length > 0) {
        hasResults = true;
        console.log(`Buscando por ${member} - achado: ${query.result.length}`);
        players.push(query.result[0]);
      } else {
        console.log("Falha na API");
        console.log("Tentando novamente...");
      }
    } while (!hasResults);
    let duracao = Date.now() - antes;
    console.log(`Concluida busca de ${query.result[0].name}`);
    console.log(`No tempo de: ${duracao / 1000}`);
  }
  let duracaoTotal = Date.now() - antesTotal;
  console.log(`Todas as buscas levaram o tempo de: ${duracaoTotal / 1000}`);
  return players;
};

const countMods = mods => {
  mods.forEach(mod => {
    mod.secondaryStat.forEach(stat => {
      if (stat.unitStat == 5) {
        resumeMods[stat.value]++;
      }
    });
  });
};

const sanatizeToon = toonRaw => {
  let toon = {
    id: toonRaw.defId,
    power: toonRaw.gp,
    isCharacter: toonRaw.combatType == 1,
    isShip: toonRaw.combatType == 2,
    rarity: toonRaw.rarity
  };
  if (toon.isCharacter) {
    toon.relic = toonRaw.relic.currentTier;
    toon.equipped = toonRaw.equipped.length;
    toon.gear = toonRaw.gear;
    toon.zeta = 0;
    toonRaw.skills.forEach(skill => {
      if (skill.isZeta) toon.zeta++;
    });
  }
  return toon;
};

export default async (request, response) => {
  console.log(
    "========================\n\
========================\n\
========================"
  );
  console.log("Começou a processar");
  console.log("------------------------");
  await swapi.connect();
  const { id } = request.query;
  const { membersId, guild } = await getAllPlayersIds(id);
  const players = await getInfoPlayers(membersId);
  // console.log(players);

  console.log("Começou a calcular");
  console.log("------------------------");
  let playersSanitize = [];
  players.forEach(playerRaw => {
    let player = {
      name: playerRaw.name,
      allyCode: playerRaw.allyCode,
      ships: [],
      characters: [],
      others: [],
      arena: {
        lead: "",
        squad: [],
        rank: 0
      }
    };
    try {
      player.arena.rank = playerRaw.arena.char.rank;
      for (const key in playerRaw.arena.char.squad) {
        const toon = playerRaw.arena.char.squad[key];
        if (toon.squadUnitType === 2) {
          player.arena.lead = toon.defId;
        } else {
          player.arena.squad.push(toon.defId);
        }
      }
    } catch (e) {
      console.log("----------------------");
      console.log(`Problema na arena do player ${playerRaw.name}`);
      console.log(e.message);
      console.log(playerRaw.arena.char);
    }
    try {
      playerRaw.roster.forEach(unitRaw => {
        let unit = sanatizeToon(unitRaw);
        if (unit.isCharacter) countMods(unitRaw.mods);
        if (unit.isShip) player.ships.push(unit);
        else if (unit.isCharacter) player.characters.push(unit);
        else player.others.push(unit);
      });
    } catch {
      console.log("==================");
      console.log(playerRaw.name);
    }
    playersSanitize.push(player);
  });
  console.log("acabou");
  response.statusCode = 200;
  response.setHeader("Content-Type", `application/json`);
  response.end(
    JSON.stringify({
      message: "sended!",
      guild: guild,
      players: playersSanitize,
      mods: resumeMods
    })
  );
};
