import { Logger } from '@nestjs/common'
import { Either, EitherAsync } from 'purify-ts'
import * as request from 'superagent'
import { getRequiredEnvVar } from './processenv'

export enum RapidAPIHeaderNames {
  xRapidApiHost = 'x-rapidapi-host',
  xRapidApiKey = 'x-rapidapi-key',
}

export class RapidAPI {
  protected rapidApiKey: string
  protected url: string

  constructor(protected host: string) {
    this.rapidApiKey = getRequiredEnvVar('RAPIDAPI_KEY').unsafeCoerce()
    this.url = `https://${host}/`
  }

  protected setHeaders(request: request.SuperAgentRequest) {
    return request
      .set(RapidAPIHeaderNames.xRapidApiHost, this.host)
      .set(RapidAPIHeaderNames.xRapidApiKey, this.rapidApiKey)
  }

  protected httpGet(path: string) {
    return this.setHeaders(request.get(this.buildPath(path)))
  }

  protected buildPath(path: string) {
    Logger.debug(`${this.url}${path}`)
    return `${this.url}${path}`
  }

  protected eitherRequest(request: request.SuperAgentRequest) {
    return EitherAsync<RapidAPIError, request.Response>(async () => {
      try {
        return await request
      } catch (error) {
        throw new RapidAPIError(
          error.message,
          // @ts-ignore
          { cause: error },
        )
      }
    }).map((request) => request.text)
  }

  protected toJSON(results: string) {
    return Either.encase(() => JSON.parse(results)).mapLeft(
      () => new RapidAPIError('invalid body'),
    )
  }
}

export class RapidAPIError extends Error {}
