import { Body, Controller, Get, Post } from '@nestjs/common'
import { IMDBService } from 'src/service/imdb.service'

interface TitleBody {
  title: string
}

@Controller('title')
export class TitleController {
  constructor(private readonly imdbService: IMDBService) {}

  @Post()
  async getTitles(@Body() titleBody: TitleBody) {
    return await this.imdbService.getTitle(titleBody.title)
  }
}
