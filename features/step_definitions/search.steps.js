const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { hoverElement, clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(20000);

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
  await clickElement(this.page, "a:nth-child(4)");
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='199']");
  await this.page.waitForSelector(".buying-scheme");
});

When("user selects seat {string}", async function (seatSelector) {
  await hoverElement(this.page, seatSelector); 
  await clickElement(this.page, seatSelector);
  await clickElement(this.page, ".acceptin-button");
});

When("user selects seat {string} and seat {string}", async function (firstSeatSelector, secondSeatSelector) {
  await hoverElement(this.page, firstSeatSelector); 
  await clickElement(this.page, firstSeatSelector);
  await clickElement(this.page, secondSeatSelector);
  await clickElement(this.page, ".acceptin-button");
});

When("user buys ticket", async function () {
  await this.page.waitForSelector(".ticket__check-title");
  await clickElement(this.page, ".acceptin-button");
});

When("user returns to the previous page", async function () {
  await this.page.goto("https://qamid.tmweb.ru/client/index.php");
});

Then("sees occupied seats cannot be reserved", async function () {
  const actual = await this.page.$eval(".acceptin-button", (button) => button.disabled);
  expect(actual).to.be.true
});

Then("sees the title {string}", async function (string) {
  const actual = await getText(this.page, '.ticket__check-title');
  const expected = await string;
  expect(actual).contains(expected);
});