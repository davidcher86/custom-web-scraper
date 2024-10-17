import { ScraperInterface } from './Scraper.interface';
import { AxiosScraperService } from './AxiosScraperService';
import { PuppeteerScrapeService } from './PuppeteerScrapeService';
import { Inject, Injectable } from '@nestjs/common';
import data from '../../mockdata/data.json';
import { PlaywrightScrapeService } from './playwright.scraper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ScrapeHandler {
    constructor (@Inject(CACHE_MANAGER) private cacheService: Cache) {}
    
    public async scrape(query: string): Promise<any> {
        let scrapeService: ScraperInterface;
        const scrapeList = data.userID;

        let responseObject : any = {};

        const results: any = scrapeList.filter(scrape => scrape.activated).map(async (scraperInfo) => {
            console.log('scrape: ', scraperInfo.name);
            switch (scraperInfo.scrapeArgs.scraperEngine) {
                case 'static':
                    scrapeService = new AxiosScraperService();
                    break; 
                case 'playwright':
                    scrapeService = new PlaywrightScrapeService();
                    break;
                case 'puppeteer':
                default:
                    scrapeService = new PuppeteerScrapeService();
                    break;
            }

            console.log(`for ${scraperInfo.name} using ${scraperInfo.scrapeArgs.scraperEngine} scraper`);
            
            const cachedResult = await this.cacheService.get(`${query}-${scraperInfo.name}`);

            let result;
            if (cachedResult) {
                console.log(`retrieving reult from cache for ${query}-${scraperInfo.name}`);
                result = cachedResult
            } else {
                result = await scrapeService.execute(query, scraperInfo);
            }

            // const res = await scrapeService.execute(query, scraperInfo);
            responseObject[scraperInfo.name] = result;
            return result;
        });

        await Promise.all(results);
        return responseObject;
    }
}