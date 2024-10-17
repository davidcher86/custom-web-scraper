import { Module } from '@nestjs/common';
import { ScrapeHandlerController } from './app.scrape.controller';
import { ScrapeHandler } from './scrape.service';

@Module({
    controllers: [ScrapeHandlerController],
    providers: [ScrapeHandler]
})
export class ScrapeModule {}
