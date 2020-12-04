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
    throw error;
  }

  const members = [];
  result[0].roster.forEach(member => {
    members.push(member.allyCode);
  });
  return members;
};

const getInfoPlayers = async members => {
  if (members == "development") {
    return staticData.return;
  }
  let { result, error } = await swapi.fetchPlayer({ allycodes: members });
  if (error) {
    throw error;
  }
  return result;
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
  await swapi.connect();
  const { id } = request.query;
  const membersId = await getAllPlayersIds(id);
  const players = await getInfoPlayers(membersId);
  let playersSanitize = [];
  players.forEach(playerRaw => {
    let player = {
      name: playerRaw.name,
      allyCode: playerRaw.allyCode,
      ships: [],
      characters: [],
      others: []
    };
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
  response.statusCode = 200;
  response.setHeader("Content-Type", `application/json`);
  response.end(
    JSON.stringify({
      message: "sended!",
      players: playersSanitize,
      mods: resumeMods
    })
  );
};
