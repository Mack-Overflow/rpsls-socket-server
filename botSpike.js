const puppeteer = require('puppeteer');
// console.log("hello puppeteer");
async function getPage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3030');
  await page.click('#rckBtn');
  // await page.screenshot({path: 'example.png'});
  // console.log(page);

  await browser.close();
}

getPage();