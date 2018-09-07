const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://wqs.jd.com/closet/match/com_index.html?PTAG=17053.1.1&formulaId=2609&utm_source=weixin&utm_medium=weixin&utm_campaign=t_1000072672_17053_001&from=groupmessage&isappinstalled=0');
  await page.setViewport({
  	width: 1200,
  	height: 800
  });

  await autoScroll(page);
  
  await page.screenshot({
  	path: 'jd.png',
  	fullPage: true
  });

  await browser.close();
})();


function autoScroll(page){
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        })
    });
}