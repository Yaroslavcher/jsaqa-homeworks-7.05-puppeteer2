let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
    page.close();
});

test("Should book one ticket", async () => {
    const movieTime = "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a";
    await page.waitForSelector(movieTime);
    await page.click(movieTime);
    await page.waitForTimeout(2000);
    const chair = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(1)";
    
    await page.waitForSelector(chair);
    await page.click(chair);
    
const btn = await page.$("body > main > section > button");
    await btn.click();
    const selectedTicketHeader = await page.$eval("h2.ticket__check-title", (link) => link.textContent);
    expect(selectedTicketHeader).toContain("Вы выбрали билеты");
});  