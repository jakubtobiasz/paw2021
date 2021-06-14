import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');
    await page.waitFor(1000);
    await page.screenshot({ path: 'screen-pre-run.png' });
    await page.type('#note-title', 'Testowy tytuł notatki');
    await page.type('#note-body', 'Notatka testowa');
    await page.click('#add-note');
    await page.waitFor(1000);
    await page.screenshot({ path: 'screen-post-run.png' });

    await browser.close();
})();
