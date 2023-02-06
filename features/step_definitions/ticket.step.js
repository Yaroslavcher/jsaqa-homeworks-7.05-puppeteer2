const {Given, When, Then, Before, After, setDefaultTimeout} = require('cucumber');
const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const {clickElement, getText} = require("../../lib/commands.js");
//const sets = require("../../lib/chairs");

setDefaultTimeout(30000);

Before(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;


});
After(async function () {
    if(this.browser) {
        await this.browser.close();
    }
});

Given("user is on 'ИДЕМВКИНО' main page", async function () {
    return await this.page.goto('http://qamid.tmweb.ru/client/index.php');
});
When("user clicks on next day and first time, on {int} row and {int} chair and on Забронировать button", async function (row, chair) {
    await clickElement(this.page, "a:nth-child(2) > span.page-nav__day-week"); // click on date
    await clickElement(this.page, "a.movie-seances__time");  // click on time
    await clickElement(this.page, "div:nth-child(${row}) > span:nth-child(${chair})");
    return await clickElement(this.page, "button.acceptin-button"); //click on button "Забронировать";
});

Then("user sees opened page with header {string}", async function (string) {
    const actual = await getText(this.page, "h2.ticket__check-title");
    const expected = string;
    expect(actual).contains(expected);
});