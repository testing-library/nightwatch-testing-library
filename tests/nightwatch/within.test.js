const { getQueriesFrom, within } = require('../../src');


module.exports = {
    beforeEach(browser, done) {
        browser
            .url('http://localhost:13370');
        done()
    },
    async 'getByText within container'(browser) {
        const { getByTestId } = getQueriesFrom(browser);

        const nested = await getByTestId('nested');
        const button = await within(nested).getByText('Button Text');

        browser.click(button);
        browser.expect.element(button).text.to.equal('Button Clicked');

    },


    async 'works with nested selector from "All" query with index - regex'(browser) {

        const { getAllByTestId } = getQueriesFrom(browser);

        const nestedDivs = await getAllByTestId(/nested/);

        browser.expect.elements(nestedDivs).count.to.equal(2)

        const nested = within(nestedDivs.nth(1));

        const button = await nested.getByText('Button Text');
        const text = await nested.getByText('text only in 2nd nested');

        browser.expect.element(button).to.be.present;
        browser.expect.element(text).to.be.present;
        // await t
        //     .expect(nested.getByText('Button Text').exists).ok()
        //     .expect(nested.getByText('text only in 2nd nested').exists).ok()

    },
}