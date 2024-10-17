import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { ScrapeRequest } from '../model/ScrapeRequest';
import { ScrapeHandler } from './scrape.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller("scrape")
export class ScrapeHandlerController {
  constructor(private scraperHandler: ScrapeHandler) {}

  @UseGuards(AuthGuard)
  @Post("query")
  query(@Body() req: ScrapeRequest, @Res() res: any): Promise<any> {
    const { queryParam } = req;

    try {
      return this.scraperHandler.scrape(queryParam)
              .then((data) => res.status(200).json(data));
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}
