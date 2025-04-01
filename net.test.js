const { clickElement, getText, hoverAndClickElement, hoverElement } = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultTimeout(20000);
});

afterEach(() => {
    page.close();
});

describe("Cinema site tests", () => {
    beforeEach(async() => {
        await page.goto("https://qamid.tmweb.ru/client/index.php");
    });

    test("Should booking a ticket", async () => {
        await clickElement(page, "a:nth-child(4)");
        await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
        await page.waitForSelector(".buying-scheme");
        await hoverElement(page, "div:nth-child(2) span:nth-child(1)"); // Пришлось добавить т.к. клик не работает без наведения, даже с задержкой
        await clickElement(page, "div:nth-child(2) span:nth-child(1)");
        await clickElement(page, ".acceptin-button");
        const actual = await getText(page, ".ticket__check-title");
        const expected = "Вы выбрали билеты:"
        expect(actual).toContain(expected);
    },10000);

    test("Should booking several tickets", async () => {
        await clickElement(page, "a:nth-child(4)");
        await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
        await page.waitForSelector(".buying-scheme");
        await hoverElement(page, "div:nth-child(2) span:nth-child(1)"); // Пришлось добавить т.к. клик не работает без наведения, даже с задержкой
        await clickElement(page, "div:nth-child(2) span:nth-child(1)");
        await clickElement(page, "div:nth-child(2) span:nth-child(2)");
        await clickElement(page, ".acceptin-button");
        const actual = await getText(page, ".ticket__check-title");
        const expected = "Вы выбрали билеты:"
        expect(actual).toContain(expected);
    },10000);

    test("Occupied seat cannot be reserved", async () => {
        await clickElement(page, "a:nth-child(4)");
        await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
        await page.waitForSelector(".buying-scheme");
        await hoverElement(page, "div:nth-child(3) span:nth-child(3)");  // Пришлось добавить т.к. клик не работает без наведения, даже с задержкой
        await clickElement(page, "div:nth-child(3) span:nth-child(3)");
        await clickElement(page, ".acceptin-button");
        await clickElement(page, ".acceptin-button");
        await page.goto("https://qamid.tmweb.ru/client/index.php");
        await clickElement(page, "a:nth-child(4)");
        await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
        await page.waitForSelector(".buying-scheme");
        await hoverElement(page, "div:nth-child(3) span:nth-child(3)");  // Пришлось добавить т.к. клик не работает без наведения, даже с задержкой
        await clickElement(page, "div:nth-child(3) span:nth-child(3)");
        await page.waitForSelector(".acceptin-button");
        const actual = await page.$eval(".acceptin-button", (button) => button.disabled);
        const expected = true;
        expect(actual).toBe(expected);
    }, 10000);
})