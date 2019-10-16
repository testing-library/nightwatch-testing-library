const { getQueriesFrom } = require('../../src');

module.exports = {


    async 'Button click works'(browser) {
        const { getByText } = getQueriesFrom(browser);
        const button = await getByText('Unique Button Text');


        browser.expect.element(button).text.not.to.equal('Button Clicked')

        browser.click(button);

        browser.expect.element(button).text.to.equal('Button Clicked')

    },

    async 'getByPlaceholderText'(browser) {

        const { getByPlaceholderText } = getQueriesFrom(browser);
        const input = await getByPlaceholderText('Placeholder Text');

        browser.expect.element(input).value.not.to.equal('Hello Placeholder');
        browser.setValue(input, 'Hello Placeholder');

        browser.expect.element(input).value.to.equal('Hello Placeholder');

    },

    async 'getByLabelText'(browser) {
        const { getByLabelText } = getQueriesFrom(browser);
        const input = await getByLabelText('Label For Input Labelled By Id');
        browser.setValue(input, 'Hello Input Labelled by Id');

        browser.expect.element(input).value.to.equal('Hello Input Labelled by Id');

    }

};