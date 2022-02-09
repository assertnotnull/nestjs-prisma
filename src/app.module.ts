import { Module } from '@nestjs/common'
import { AppController } from './controller/app.controller'
import { TitleController } from './controller/title.controller'
import { UserController } from './controller/user.controller'
import { PrismaService } from './external/prisma'
import { AppService } from './service/app.service'
import { IMDBService } from './service/imdb.service'
import { UserService } from './service/user.service'
@Module({
  imports: [],
  controllers: [AppController, UserController, TitleController],
  providers: [AppService, UserService, PrismaService, IMDBService],
})
export class AppModule {}
