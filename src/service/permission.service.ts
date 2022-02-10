import { Logger } from '@nestjs/common'

export interface User {
  email: string
  canAccess: boolean
  canEdit: boolean
}

export function canUserAcccess({ canAccess }: User) {
  Logger.debug('checking user can access...')
  if (!canAccess) {
    throw new Error('no access')
  }
  return true
}

export function canUserEdit({ canEdit }: User) {
  Logger.debug('checking user can edit..')
  return canEdit
    ? { sucess: true, errors: null }
    : { success: false, errors: [new Error('badly managed multiple errors')] }
}
