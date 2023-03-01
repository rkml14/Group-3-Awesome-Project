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
  
  module.exports = { getAgents };