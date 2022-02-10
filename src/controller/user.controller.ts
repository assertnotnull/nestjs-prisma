import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import {
  canUserAcccess,
  canUserEdit,
  User,
} from 'src/service/permission.service'
import { UserService } from 'src/service/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers()
  }

  @Post()
  async canUserDo(@Body() user: User) {
    if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
    /**
     * very long function
     *
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *
     *if (canUserAcccess(user)) {
      Logger.debug('yes can access')
    }
    const check = canUserEdit(user)
     *
     *
     * very long - since you can't break this function because it have many returns
     * there's a return hidden here
     */
    if (!check.success) {
      Logger.debug('user cannot edit')
      return 'false'
    }

    /**
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * real example had 600 lines as function
     */
    Logger.debug('can edit')
    return 'true'
  }
}
