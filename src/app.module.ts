import { Module } from '@nestjs/common'
import { AppController } from './controller/app.controller'
import { AppService } from './service/app.service'
import { PrismaService } from './external/prisma'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'
@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
