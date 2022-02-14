import { RequestOptions, RESTDataSource } from "apollo-datasource-rest"

const BASE_URL = "https://api.igdb.com/v4/"
const GAME_FIELDS = "f name,summary,storyline,screenshots.image_id;"
const GAMES_FIELDS = "f name,slug,first_release_date,cover.image_id,total_rating,url;"

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
    const fields = `${GAMES_FIELDS} l ${limit};`
    const where = `w rating != null & rating_count > 0 & total_rating > 0 & platforms != null${(platformId ? ` & release_dates.platform = (${platformId}); ` : ";")}`
    const sort = `${((sortField && sortDir) ? `s ${sortField} ${sortDir}; w ${sortField} != null;` : "")}`
    const games = await this.post("games", `${fields} ${where} ${sort}`)

    console.log("getGames", games)
    return games
  }
}
