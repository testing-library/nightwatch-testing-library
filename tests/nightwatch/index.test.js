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

    },

    async 'getByAltText'(browser) {
        const { getByAltText } = getQueriesFrom(browser);
        const image = await getByAltText('Image Alt Text');

        browser.click(image);
        browser.expect.element(image).to.have.css('border').which.equals('5px solid rgb(255, 0, 0)')
    },
    async 'getByTestId'(browser) {
        const { getByTestId } = getQueriesFrom(browser);
        browser.click(await getByTestId('image-with-random-alt-tag'))
    },

    async 'getAllByText'(browser) {
        const { getAllByText } = getQueriesFrom(browser);
        const chans = await getAllByText('Jackie Chan', { exact: false })


        browser.expect.elements(chans).count.to.equal(2)

    },

    async 'getAllByText - regex'(browser) {
        const { getAllByText } = getQueriesFrom(browser);
        const chans = await getAllByText(/Jackie Chan/)


        browser.expect.elements(chans).count.to.equal(2)

        const firstChan = chans.nth(0);
        const secondChan = chans.nth(1);
        browser.expect.element(firstChan).text.to.equal('Jackie Chan 1');

        browser.expect.element(secondChan).text.to.equal('Jackie Chan 2');
        browser.click(chans.nth(1));

        browser.expect.element(secondChan).text.to.equal('Jackie Kicked');
        browser.click(chans.nth(0));

        browser.expect.element(firstChan).text.to.equal('Jackie Kicked');

    },

    async 'queryAllByText'(browser) {
        const { queryAllByText } = getQueriesFrom(browser);

        const buttons = await queryAllByText('Button Text');
        const nonExistentButtons = await queryAllByText('non existent button');

        browser.expect.elements(buttons).to.be.present;
        browser.assert.elementNotPresent(nonExistentButtons);


    }



};