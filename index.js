const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();

  let data = []

  for (let i = 1; i < 56; i++) {

    await page.goto(`http://www.hymnalaccompanist.com/twi/twin${i}.html`, { waitUntil: 'domcontentloaded' })

    data.push({
      number: `N${i}`,
      title: await page.evaluate(() => document.querySelector('td:nth-of-type(2)').innerText),
      songEN: await page.evaluate(() => document.getElementById('0').innerText)
    })

    console.log(i)

  }


  fs.writeFile('./json/ng-hymns.json', JSON.stringify(data, null, 2), (err) => err ? console.error('Data not written', err) : console.log('Data written!'))
})()


