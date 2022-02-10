import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/external/prisma'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany()
  }
}
