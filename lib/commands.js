module.exports = {
    clickElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } 
        
        catch (error) {
            throw new Error(`Selector is not clickable: ${selector}`);
        }
    },
 
    clickElementAfterSelector: async function (page, selector, elementSelector) {
        try {
            await page.waitForSelector(selector);
            await page.waitForSelector(elementSelector);
            await page.click(elementSelector);
        } catch (error) {
            throw new Error(`Element is not clickable: selector=${selector}, buttonSelector=${buttonSelector}, Error: ${error.message}`);
        }
    },

    hoverElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.hover(selector);
        }
        catch (error) {
            throw new Error(`Selector not found: ${selector}`);
        }
    },
    
    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, (link) => link.textContent);
        } 
        
        catch (error) {
            throw new Error(`Text is not available for selector: ${selector}`);
        }
    },
};