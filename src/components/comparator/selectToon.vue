<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <div class="select">
        <select v-model="mutableValue">
          <option value="">-- Select Unit --</option>
          <option value="AAYLASECURA">Aayla Secura</option>
          <option value="ADMIRALACKBAR">Admiral Ackbar</option>
          <option value="ADMIRALPIETT">Admiral Piett</option>
          <option value="AHSOKATANO">Ahsoka Tano</option>
          <option value="FULCRUMAHSOKA">Ahsoka Tano</option>
          <option value="AMILYNHOLDO">Amilyn Holdo</option>
          <option value="ARCTROOPER501ST">ARC Trooper</option>
          <option value="ASAJVENTRESS">Asajj Ventress</option>
          <option value="AURRA_SING">Aurra Sing</option>
          <option value="B1BATTLEDROIDV2">B1 Battle Droid</option>
          <option value="B2SUPERBATTLEDROID">B2 Super Battle Droid</option>
          <option value="BARRISSOFFEE">Barriss Offee</option>
          <option value="BASTILASHAN">Bastila Shan</option>
          <option value="BASTILASHANDARK">Bastila Shan</option>
          <option value="BAZEMALBUS">Baze Malbus</option>
          <option value="BB8">BB-8</option>
          <option value="BIGGSDARKLIGHTER">Biggs Darklighter</option>
          <option value="BISTAN">Bistan</option>
          <option value="BOKATAN">Bo-Katan Kryze</option>
          <option value="BOBAFETT">Boba Fett</option>
          <option value="BODHIROOK">Bodhi Rook</option>
          <option value="BOSSK">Bossk</option>
          <option value="C3POLEGENDARY">C-3PO</option>
          <option value="CADBANE">Cad Bane</option>
          <option value="CANDEROUSORDO">Canderous Ordo</option>
          <option value="HOTHHAN">Captain Han Solo</option>
          <option value="PHASMA">Captain Phasma</option>
          <option value="CARADUNE">Cara Dune</option>
          <option value="CARTHONASI">Carth Onasi</option>
          <option value="CASSIANANDOR">Cassian Andor</option>
          <option value="CC2224">CC-2224 "Cody"</option>
          <option value="CHEWBACCALEGENDARY">Chewbacca</option>
          <option value="CHIEFCHIRPA">Chief Chirpa</option>
          <option value="CHIEFNEBIT">Chief Nebit</option>
          <option value="CHIRRUTIMWE">Chirrut Îmwe</option>
          <option value="CHOPPERS3">Chopper</option>
          <option value="CLONESERGEANTPHASEI">Clone Sergeant - Phase I</option>
          <option value="CLONEWARSCHEWBACCA">Clone Wars Chewbacca</option>
          <option value="COLONELSTARCK">Colonel Starck</option>
          <option value="COMMANDERLUKESKYWALKER"
            >Commander Luke Skywalker</option
          >
          <option value="CORUSCANTUNDERWORLDPOLICE"
            >Coruscant Underworld Police</option
          >
          <option value="COUNTDOOKU">Count Dooku</option>
          <option value="CT210408">CT-21-0408 "Echo"</option>
          <option value="CT5555">CT-5555 "Fives"</option>
          <option value="CT7567">CT-7567 "Rex"</option>
          <option value="DARKTROOPER">Dark Trooper</option>
          <option value="DARTHMALAK">Darth Malak</option>
          <option value="MAUL">Darth Maul</option>
          <option value="DARTHNIHILUS">Darth Nihilus</option>
          <option value="DARTHREVAN">Darth Revan</option>
          <option value="DARTHSIDIOUS">Darth Sidious</option>
          <option value="DARTHSION">Darth Sion</option>
          <option value="DARTHTRAYA">Darth Traya</option>
          <option value="VADER">Darth Vader</option>
          <option value="DATHCHA">Dathcha</option>
          <option value="DEATHTROOPER">Death Trooper</option>
          <option value="DENGAR">Dengar</option>
          <option value="DIRECTORKRENNIC">Director Krennic</option>
          <option value="DROIDEKA">Droideka</option>
          <option value="EETHKOTH">Eeth Koth</option>
          <option value="EMBO">Embo</option>
          <option value="EMPERORPALPATINE">Emperor Palpatine</option>
          <option value="ENFYSNEST">Enfys Nest</option>
          <option value="EWOKELDER">Ewok Elder</option>
          <option value="EWOKSCOUT">Ewok Scout</option>
          <option value="EZRABRIDGERS3">Ezra Bridger</option>
          <option value="FINN">Finn</option>
          <option value="FIRSTORDEREXECUTIONER">First Order Executioner</option>
          <option value="FIRSTORDEROFFICERMALE">First Order Officer</option>
          <option value="FIRSTORDERSPECIALFORCESPILOT"
            >First Order SF TIE Pilot</option
          >
          <option value="FIRSTORDERTROOPER">First Order Stormtrooper</option>
          <option value="FIRSTORDERTIEPILOT">First Order TIE Pilot</option>
          <option value="GAMORREANGUARD">Gamorrean Guard</option>
          <option value="GARSAXON">Gar Saxon</option>
          <option value="ZEBS3">Garazeb "Zeb" Orrelios</option>
          <option value="GRIEVOUS">General Grievous</option>
          <option value="GENERALHUX">General Hux</option>
          <option value="GENERALKENOBI">General Kenobi</option>
          <option value="GENERALSKYWALKER">General Skywalker</option>
          <option value="VEERS">General Veers</option>
          <option value="GEONOSIANBROODALPHA">Geonosian Brood Alpha</option>
          <option value="GEONOSIANSOLDIER">Geonosian Soldier</option>
          <option value="GEONOSIANSPY">Geonosian Spy</option>
          <option value="GRANDADMIRALTHRAWN">Grand Admiral Thrawn</option>
          <option value="GRANDMASTERYODA">Grand Master Yoda</option>
          <option value="GRANDMOFFTARKIN">Grand Moff Tarkin</option>
          <option value="GREEDO">Greedo</option>
          <option value="GREEFKARGA">Greef Karga</option>
          <option value="HANSOLO">Han Solo</option>
          <option value="HERASYNDULLAS3">Hera Syndulla</option>
          <option value="HERMITYODA">Hermit Yoda</option>
          <option value="HK47">HK-47</option>
          <option value="HOTHREBELSCOUT">Hoth Rebel Scout</option>
          <option value="HOTHREBELSOLDIER">Hoth Rebel Soldier</option>
          <option value="BADBATCHHUNTER">Hunter</option>
          <option value="MAGNAGUARD">IG-100 MagnaGuard</option>
          <option value="IG11">IG-11</option>
          <option value="IG86SENTINELDROID">IG-86 Sentinel Droid</option>
          <option value="IG88">IG-88</option>
          <option value="IMAGUNDI">Ima-Gun Di</option>
          <option value="IMPERIALPROBEDROID">Imperial Probe Droid</option>
          <option value="IMPERIALSUPERCOMMANDO">Imperial Super Commando</option>
          <option value="JANGOFETT">Jango Fett</option>
          <option value="JAWA">Jawa</option>
          <option value="JAWAENGINEER">Jawa Engineer</option>
          <option value="JAWASCAVENGER">Jawa Scavenger</option>
          <option value="JEDIKNIGHTCONSULAR">Jedi Consular</option>
          <option value="ANAKINKNIGHT">Jedi Knight Anakin</option>
          <option value="JEDIKNIGHTGUARDIAN">Jedi Knight Guardian</option>
          <option value="JEDIKNIGHTLUKE">Jedi Knight Luke Skywalker</option>
          <option value="JEDIKNIGHTREVAN">Jedi Knight Revan</option>
          <option value="GRANDMASTERLUKE">Jedi Master Luke Skywalker</option>
          <option value="JOLEEBINDO">Jolee Bindo</option>
          <option value="JUHANI">Juhani</option>
          <option value="JYNERSO">Jyn Erso</option>
          <option value="K2SO">K-2SO</option>
          <option value="KANANJARRUSS3">Kanan Jarrus</option>
          <option value="KIADIMUNDI">Ki-Adi-Mundi</option>
          <option value="KITFISTO">Kit Fisto</option>
          <option value="KUIIL">Kuiil</option>
          <option value="KYLOREN">Kylo Ren</option>
          <option value="KYLORENUNMASKED">Kylo Ren</option>
          <option value="L3_37">L3-37</option>
          <option value="ADMINISTRATORLANDO">Lando Calrissian</option>
          <option value="LOBOT">Lobot</option>
          <option value="LOGRAY">Logray</option>
          <option value="LUKESKYWALKER">Luke Skywalker</option>
          <option value="LUMINARAUNDULI">Luminara Unduli</option>
          <option value="MACEWINDU">Mace Windu</option>
          <option value="MAGMATROOPER">Magmatrooper</option>
          <option value="MISSIONVAO">Mission Vao</option>
          <option value="HUMANTHUG">Mob Enforcer</option>
          <option value="MOFFGIDEONS1">Moff Gideon</option>
          <option value="MONMOTHMA">Mon Mothma</option>
          <option value="MOTHERTALZIN">Mother Talzin</option>
          <option value="NIGHTSISTERACOLYTE">Nightsister Acolyte</option>
          <option value="NIGHTSISTERINITIATE">Nightsister Initiate</option>
          <option value="NIGHTSISTERSPIRIT">Nightsister Spirit</option>
          <option value="NIGHTSISTERZOMBIE">Nightsister Zombie</option>
          <option value="NUTEGUNRAY">Nute Gunray</option>
          <option value="OLDBENKENOBI">Obi-Wan KenobiBen)</option>
          <option value="DAKA">Old Daka</option>
          <option value="PADMEAMIDALA">Padmé Amidala</option>
          <option value="PAO">Pao</option>
          <option value="PAPLOO">Paploo</option>
          <option value="PLOKOON">Plo Koon</option>
          <option value="POE">Poe Dameron</option>
          <option value="POGGLETHELESSER">Poggle the Lesser</option>
          <option value="PRINCESSLEIA">Princess Leia</option>
          <option value="QIRA">Qi'ra</option>
          <option value="QUIGONJINN">Qui-Gon Jinn</option>
          <option value="R2D2_LEGENDARY">R2-D2</option>
          <option value="RANGETROOPER">Range Trooper</option>
          <option value="HOTHLEIA">Rebel Officer Leia Organa</option>
          <option value="EPIXFINN">Resistance Hero Finn</option>
          <option value="EPIXPOE">Resistance Hero Poe</option>
          <option value="RESISTANCEPILOT">Resistance Pilot</option>
          <option value="RESISTANCETROOPER">Resistance Trooper</option>
          <option value="GLREY">Rey</option>
          <option value="REYJEDITRAINING">ReyTraining)</option>
          <option value="REY">Rey</option>
          <option value="ROSETICO">Rose Tico</option>
          <option value="ROYALGUARD">Royal Guard</option>
          <option value="SABINEWRENS3">Sabine Wren</option>
          <option value="SAVAGEOPRESS">Savage Opress</option>
          <option value="SCARIFREBEL">Scarif Rebel Pathfinder</option>
          <option value="SHAAKTI">Shaak Ti</option>
          <option value="SHORETROOPER">Shoretrooper</option>
          <option value="SITHASSASSIN">Sith Assassin</option>
          <option value="SITHTROOPER">Sith Empire Trooper</option>
          <option value="SITHPALPATINE">Sith Eternal Emperor</option>
          <option value="SITHMARAUDER">Sith Marauder</option>
          <option value="FOSITHTROOPER">Sith Trooper</option>
          <option value="SNOWTROOPER">Snowtrooper</option>
          <option value="STORMTROOPER">Stormtrooper</option>
          <option value="STORMTROOPERHAN">Stormtrooper Han</option>
          <option value="SUNFAC">Sun Fac</option>
          <option value="SUPREMELEADERKYLOREN">Supreme Leader Kylo Ren</option>
          <option value="T3_M4">T3-M4</option>
          <option value="TALIA">Talia</option>
          <option value="TEEBO">Teebo</option>
          <option value="ARMORER">The Armorer</option>
          <option value="THEMANDALORIAN">The Mandalorian</option>
          <option value="THEMANDALORIANBESKARARMOR"
            >The MandalorianArmor)</option
          >
          <option value="C3POCHEWBACCA">Threepio &amp; Chewie</option>
          <option value="TIEFIGHTERPILOT">TIE Fighter Pilot</option>
          <option value="TUSKENRAIDER">Tusken Raider</option>
          <option value="TUSKENSHAMAN">Tusken Shaman</option>
          <option value="UGNAUGHT">Ugnaught</option>
          <option value="URORRURRR">URoRRuR'R'R</option>
          <option value="YOUNGCHEWBACCA">Vandor Chewbacca</option>
          <option value="SMUGGLERCHEWBACCA">Veteran Smuggler Chewbacca</option>
          <option value="SMUGGLERHAN">Veteran Smuggler Han Solo</option>
          <option value="VISASMARR">Visas Marr</option>
          <option value="WAMPA">Wampa</option>
          <option value="WATTAMBOR">Wat Tambor</option>
          <option value="WEDGEANTILLES">Wedge Antilles</option>
          <option value="WICKET">Wicket</option>
          <option value="YOUNGHAN">Young Han Solo</option>
          <option value="YOUNGLANDO">Young Lando Calrissian</option>
          <option value="ZAALBAR">Zaalbar</option>
          <option value="ZAMWESELL">Zam Wesell</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "label"],
  data() {
    return {
      mutableValue: ""
    };
  },
  watch: {
    mutableValue: function(newValue) {
      this.$emit("input", newValue);
    },
    value: function(newValue) {
      this.mutableValue = newValue;
    }
  }
};
</script>
