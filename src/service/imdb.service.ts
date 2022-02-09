import { Injectable, Logger } from '@nestjs/common'
import { array, Codec, GetType, number, optional, string } from 'purify-ts'
import { map, prop } from 'rambdax'
import { RapidAPI } from '../external/http'

const imageCodec = Codec.interface({
  height: number,
  id: string,
  url: string,
  width: number,
})

const titleCodec = Codec.interface({
  id: string,
  image: optional(imageCodec),
  runningTimeInMinutes: optional(number),
  nextEpisode: optional(string),
  numberOfEpisodes: optional(number),
  seriesEndYear: optional(number),
  seriesStartYear: optional(number),
  title: optional(string),
  titleType: optional(string),
  year: optional(number),
})
type Title = GetType<typeof titleCodec>

const responseCodec = Codec.interface({
  results: array(titleCodec),
})

type Response = GetType<typeof responseCodec>

function toJSON(data) {
  try {
    return JSON.parse(data)
  } catch (err) {
    Logger.error(err)
  }
}

@Injectable()
export class IMDBService extends RapidAPI {
  constructor() {
    super('imdb8.p.rapidapi.com')
  }

  async getTitle(query: string) {
    try {
      const response = await this.httpGet('title/find').query({ q: query })
      const jsonData: Response = toJSON(response.text)
      const results: Title[] = jsonData.results
      Logger.debug(results)
      results.forEach(({ id }) => Logger.debug(id))
      return map(prop('id'), results)
    } catch (err) {
      throw new Error(
        err.message,
        // @ts-ignore
        { cause: err },
      )
    }

    const out = await this.eitherRequest(
      this.httpGet('title/find').query({ q: query }),
    )
      .chain(async (text) => this.toJSON(text))
      .chain(async (response) => {
        Logger.debug(response)
        return responseCodec.decode(response)
      })
      .map((response) => {
        // response.results.forEach(({ id }) => Logger.debug(id))
        return response.results.map(({ year }) => `it's the year ${year}`)
      })

    try {
      const result = out.unsafeCoerce()
      return result
    } catch (err) {
      Logger.error(out, err)
      throw err
    }
  }
}
