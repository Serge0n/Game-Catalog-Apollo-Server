import { RequestOptions, RESTDataSource } from "apollo-datasource-rest"

const BASE_URL = "https://api.igdb.com/v4/"
const GAME_FIELDS = "f name,first_release_date,release_dates.date,release_dates.platform,age_ratings.category,age_ratings.rating,genres.name,game_engines.name,game_modes.name,platforms.abbreviation,cover.url,rating,rating_count,total_rating,url;"

export class GamesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Client-ID', this.context.clientId)
    request.headers.set('Authorization', this.context.token)
  }

  async getGame(gameId: number) {
    const game = await this.post("games", `${GAME_FIELDS} w id = ${gameId};`)

    console.log("getGame", game)
    return game
  }

  async getGames(limit: number, platformId?: number, sortField?: string, sortDir?: string) {
    const fields = `${GAME_FIELDS} l ${limit};`
    const where = `w rating != null & rating_count > 0 & total_rating > 0 & platforms != null${(platformId ? ` & release_dates.platform = (${platformId}); ` : ";")}`
    const sort = `${((sortField && sortDir) ? `s ${sortField} ${sortDir}; w ${sortField} != null;` : "")}`
    const games = await this.post("games", `${fields} ${where} ${sort}`)

    console.log("getGames", games)
    return games
  }
}
