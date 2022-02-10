import { Logger } from '@nestjs/common'
import { Left, Maybe, Right } from 'purify-ts'

export const getEnvVar = (key: string) =>
  Maybe.fromFalsy(process.env[key]).toEither(`Missing env var ${key}`)
// process.env[key] ? Right(process.env[key]) : Left(`Missing env var ${key}`)

export const printErrorAndStop = (msg: string) => {
  Logger.error(msg)
  process.exit()
}

export const getRequiredEnvVar = (key: string) =>
  getEnvVar(key).ifLeft(printErrorAndStop)
