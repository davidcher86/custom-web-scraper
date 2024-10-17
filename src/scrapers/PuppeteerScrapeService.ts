import puppeteer from 'puppeteer';
import { ScraperInterface } from './Scraper.interface';

export class PuppeteerScrapeService implements ScraperInterface {
    public async execute(query: string, scraperInfo: any): Promise<any> {
        const browser = await puppeteer.launch({ 
            args: scraperInfo.disableSec ? [
              '--disable-web-security',
            ] : [],
            headless: true 
        });
 
        console.log('puppeteer startד scraping: ' + scraperInfo.name);
        const page = await browser.newPage();
        if (scraperInfo.disableSec) {
            await page.setBypassCSP(true);
        }
        // await page.setBypassCSP(true);
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        // console.log('data: ' + data.userID[0].scrapeArgs.extractArgs);
        const searchUrl = scraperInfo.url.replace('{query}', query);
        console.log(`searchUrl ${searchUrl}`);
        try {
            // await page.goto(searchUrl, { timeout: 6000000 });

            await page.goto(searchUrl, { waitUntil: 'load' });
            // await page.exposeFunction("extractValue", this.extractValue);
            
            // await page.waitForSelector(".tileBlock");
            console.log('waiting for: ' + scraperInfo.scrapeArgs.loadSelector);
            await page.waitForSelector(scraperInfo.scrapeArgs.loadSelector);
            
            const items = await page.$$eval(scraperInfo.scrapeArgs.listIdentifier, (list, scraperInfo) => {
                let results: any[] = [];
                let dynamicObject : any = {};
                list.forEach((element: any) => {
                    scraperInfo.scrapeArgs.extractArgs.forEach((arg: any) => {
                        let selector = arg.selector;
                        let key = arg.keyName;
                        let type = arg.type;
                        if (element.querySelector(selector) == undefined || element.querySelector(selector) == null) {
                            return;
                        }
                        
                        // console.log(`selector: ${selector}, key: ${key}, type: ${type}`);
                        let value = '';
                        switch (type) {
                            case 'src':
                                value = element.querySelector(selector).getAttribute('src');
                                break;
                            case 'text':
                            default:
                                value = element.querySelector(selector).textContent?.trim();
                                break;
                        }
                        // console.log(`value: ${value}`);
                        dynamicObject[key] = value;
                    });
                    
                    results.push(dynamicObject);
                });
                return results;
            }, scraperInfo);

            return items;
        } catch (error) {
            console.log('error: ' + error);
            return [];          
        } finally {
            await browser.close();
        }
    }
    
    extractValue(type: String, selector: String, elem: any): any {
        switch (type) {
            case 'src':

                return elem.querySelector(selector).getAttribute('src');
                break;
            case 'text':
            default:
                return elem.querySelector(selector).textContent?.trim();
        }
    }
}

export { ScraperInterface };
