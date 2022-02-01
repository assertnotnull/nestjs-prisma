import { PrismaClient } from '@prisma/client'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  getUsers() {
    return this.prisma.user.findMany()
  }
}
