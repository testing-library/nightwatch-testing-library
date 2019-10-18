const { configure, getQueriesFrom } = require('../../src');

configure({ testIdAttribute: 'data-automation-id' });

module.exports = {
    before() {

        configure({ testIdAttribute: 'data-automation-id' });

    },
    after() {
        configure(null);
    },
    beforeEach(browser, done) {
        browser
            .url('http://localhost:13370');
        done()
    },
    async 'supports alternative testIdAttribute'(browser) {
        const { getByTestId } = getQueriesFrom(browser);

        const image = await getByTestId('image-with-random-alt-tag');
        browser.click(image);
        browser.expect.element(image).to.have.css('border').which.equals('5px solid rgb(255, 0, 0)')

    },

    async 'still works after navigation'(browser) {
        const { getByTestId, getByText } = getQueriesFrom(browser);

        browser.click(await getByText('Go to Page 2'));

        browser.click(await getByTestId('page2-thing'));

        browser.expect.element(await getByText('second page')).to.be.present;

    }
}
