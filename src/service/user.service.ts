import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/external/prisma'

@Injectable()
export class UserService {
  constructor(@Inject('PRISMA') private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany()
  }
}
