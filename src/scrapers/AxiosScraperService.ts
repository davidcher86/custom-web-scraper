import { ScraperInterface } from './Scraper.interface';
const cheerio = require('cheerio'); 
// const XRay = require('x-ray');
// const x = XRay();
const axios = require('axios');

export class AxiosScraperService implements ScraperInterface {
    public async execute(query: string, scraperInfo: any): Promise<any> {
        // const x = require('x-ray-scraper');
 
        const searchUrl = scraperInfo.url.replace('{query}', query);
        console.log('searchUrl ' + searchUrl);

        return axios.get(searchUrl) 
	        .then(( data: any ) => {
                console.log(data)
                const html = cheerio.load(data); 

                // elementList
                return data;
        });
    }
}