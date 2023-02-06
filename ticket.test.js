const {clickElement, getText} = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a:nth-child(2) > span.page-nav__day-week"); // click on date
    await clickElement(page, "a.movie-seances__time");  // click on time
});

afterEach(() => {
    page.close();
});

test("Should book one ticket", async () => {
    await clickElement(page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)"); // click on chair
    await clickElement(page, "button.acceptin-button"); //click on button "Забронировать"
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
});

test("Should book two tickets", async () => {
    await clickElement(page, "div:nth-child(7) > .buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    await clickElement(page, ".buying-scheme__chair_selected + :not(.buying-scheme__chair_taken)");   
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
});

test("Should try to book taken chair", async () => {
    await clickElement(page, "div > .buying-scheme__chair_taken");
    const actual = await page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    expect(actual).toEqual("true");
});
 