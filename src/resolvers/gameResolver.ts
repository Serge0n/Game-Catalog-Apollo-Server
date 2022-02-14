export const gameResolver = {
  Query: {
    game: async (_source: any, { id }: any, { dataSources }: any) => {
      const [game] = await dataSources.gamesAPI.getGame(id)
  
      return game
    },
  
    games: async (_source: any, { limit, platformId, sortField, sortDir }: any, { dataSources }: any) => {
      const games = await dataSources.gamesAPI.getGames(limit, platformId, sortField, sortDir)
  
      return games
    },
  }
}
