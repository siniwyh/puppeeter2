const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { hoverElement, clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(10000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  await this.page.setDefaultTimeout(20000);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the main page", async function () {
    await this.page.goto("https://qamid.tmweb.ru/client/index.php");
});

When("user chooses day and time of session", async function () {
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='199']");
  await this.page.waitForSelector(".buying-scheme");
});

When("user selects seat {string}", async function (seatSelector) {
    await hoverElement(this.page, seatSelector); 
    await clickElement(this.page, seatSelector);
    await clickElement(page, ".acceptin-button");
});

Then("sees the title {string}", async function (string) {
    const actual = await getText(this.page, '.ticket__check-title');
    const expected = await string;
    expect(actual).contains(expected);
});