import { ScraperInterface } from "./Scraper.interface";

const express = require('express');
const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

export class SeleniumScrapeService implements ScraperInterface {
    private driver: any = null;

    public async execute(query: string, scraperInfo: any): Promise<any> {
        await this.initDriver();

        try {

        } catch (error) {
            console.error("Error while scraping:", error);
            return [];
        } finally {
            await this.closeDriver();
        }
    }

    async initDriver() {
        this.driver = await new Builder().forBrowser('chrome').build();
    }

    async closeDriver() {
        if (this.driver) {
          await this.driver.quit();
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
