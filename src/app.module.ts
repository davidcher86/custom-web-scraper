import { Module } from '@nestjs/common';
import { ScrapeHandlerController } from './scrapers/app.scrape.controller';
import { ScrapeHandler } from './scrapers/scrape.service';
import { ScrapeModule } from './scrapers/scrape.module';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [ScrapeModule, 
            AuthModule, 
            UsersModule, 
            CacheModule.register({ 
              isGlobal: true,
              store: redisStore,
              host: 'localhost',
              port: 6379,
              ttl: 600000,
              // db: 'testToken'
            })],
  // controllers: [UsersController],
  // providers: [UsersService],
  // controllers: [ScrapeHandlerController],
  // providers: [ScrapeHandler]
})
export class AppModule {}
