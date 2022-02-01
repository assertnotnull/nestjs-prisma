import { Module } from '@nestjs/common'
import { AppController } from './controller/app.controller'
import { AppService } from './service/app.service'
import { prisma } from './external/prisma'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'
@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, { provide: 'PRISMA', useValue: prisma }],
})
export class AppModule {}
