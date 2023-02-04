module.exports = {
    clickElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch (error) {
            throw new Error(`Selector ${selector} non-clickable`)
        }
    },

    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, (link) => link.textContent);
        } catch (error) {
            throw new Error(`Text unavailable for selector ${selector}`);
        }
    }

}