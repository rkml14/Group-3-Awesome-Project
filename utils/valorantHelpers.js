async function getAgents() {
  const fetch = await import('node-fetch');
  const response = await fetch.default('https://valorant-api.com/v1/agents');
  const data = await response.json();
  const agentMap = {};
  data.data.forEach((agentData) => {
    agentMap[agentData.displayName] = {
      uuid: agentData.uuid,
      displayIcon: agentData.displayIcon,
      displayIconSmall: agentData.displayIconSmall,
      fullPortrait: agentData.fullPortrait,
    };
  });
  return agentMap;
}

const getAgentsFiltered = async () => {
  const fetch = await import('node-fetch');
  const response = await fetch.default('https://valorant-api.com/v1/agents');
  const data = await response.json();
  const agentArray = Object.values(data.data); // convert object values to array
  const filteredAgents = agentArray.filter(
    (agent) => agent.isPlayableCharacter
  ); // filter out non-playable characters
  return filteredAgents;
};

async function getSprays() {
  const fetch = await import('node-fetch');
  const response = await fetch.default('https://valorant-api.com/v1/sprays');
  const data = await response.json();
  const sprayMap = {};
  data.data.forEach((sprayData) => {
    sprayMap[sprayData.uuid] = {
      uuid: sprayData.uuid,
      displayName: sprayData.displayName,
      category: sprayData.category,
      themeUuid: sprayData.themeUuid,
      displayIcon: sprayData.displayIcon,
      fullIcon: sprayData.fullIcon,
      fullTransparentIcon: sprayData.fullTransparentIcon,
      animationPng: sprayData.animationPng,
      animationGif: sprayData.animationGif,
      assetPath: sprayData.assetPath,
      levels: sprayData.levels,
    };
  });
  return sprayMap;
}

async function getMaps() {
  const fetch = await import('node-fetch');
  const response = await fetch.default('https://valorant-api.com/v1/maps');
  const data = await response.json();
  const maps = [];
  data.data.forEach((mapData) => {
    maps.push({
      displayName: mapData.displayName,
      splash: mapData.splash,
      displayIcon: mapData.displayIcon,
      coordinates: mapData.coordinates,
    });
  });
  return maps;
}

async function getSpecifiedMap() {
  const fetch = await import('node-fetch');
  const response = await fetch.default('https://valorant-api.com/v1/maps');
  const data = await response.json();
  const maps = data.data.filter(mapData => mapData.uuid !== 'ee613ee9-28b7-4beb-9666-08db13bb2244').map((mapData) => {
    return {
      displayName: mapData.displayName,
      splash: mapData.splash,
      displayIcon: mapData.displayIcon,
      coordinates: mapData.coordinates,
    };
  });
  return maps;
}

async function getWeapons() {
  const fetch = await import('node-fetch');
  const response = await fetch.default('https://valorant-api.com/v1/weapons');
  const data = await response.json();
  const weapons = data.data
    .filter((weaponData) => !weaponData.displayName.includes('Skin'))
    .map((weaponData) => {
      const weapon = {
        displayName: weaponData.displayName,
        category: weaponData.category.replace('EEquippableCategory::', ''),
        image: weaponData.displayIcon,
        weaponStats: weaponData.weaponStats,
        cost: weaponData.shopData ? weaponData.shopData.cost : null, // add this line to extract the cost
      };

      if (weaponData.shopData && weaponData.shopData.cost) {
        weapon.cost = weaponData.shopData.cost;
      }

      return weapon;
    });

  const categorizedWeapons = {};

  // Categorize the weapons
  weapons.forEach((weapon) => {
    if (categorizedWeapons[weapon.category]) {
      categorizedWeapons[weapon.category].push(weapon);
    } else {
      categorizedWeapons[weapon.category] = [weapon];
    }
  });

  return categorizedWeapons;
}

function sortByCost(weapons) {
  return weapons.sort((a, b) => {
    if (!a.cost) {
      return 1;
    } else if (!b.cost) {
      return -1;
    } else {
      return a.cost - b.cost;
    }
  });
}

module.exports = {
  getAgents,
  getSprays,
  getMaps,
  getAgentsFiltered,
  getWeapons,
  sortByCost,
  getSpecifiedMap,
};
