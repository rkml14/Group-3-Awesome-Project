async function getAgents() {
    const fetch = await import('node-fetch');
    const response = await fetch.default('https://valorant-api.com/v1/agents');
    const data = await response.json();
    const agentMap = {};
    data.data.forEach(agentData => {
      agentMap[agentData.displayName] = {
        uuid: agentData.uuid,
        // displayIcon: agentData.displayIcon,
        displayIconSmall: agentData.displayIconSmall,
        // fullPortrait: agentData.fullPortrait
      }; 
    });
    return agentMap;
  }

  async function getSprays() {
    const fetch = await import('node-fetch');
    const response = await fetch.default('https://valorant-api.com/v1/sprays');
    const data = await response.json();
    const sprayMap = {};
    data.data.forEach(sprayData => {
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
        levels: sprayData.levels
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
      });
    });
    return maps;
  }
  
  module.exports = { getAgents, getSprays, getMaps };