
module.exports = {

    'Button click works'(browser) {
        browser.getByText('Unique Button Text', (button) => {


            browser.expect.element(button).text.not.to.equal('Button Clicked')

            browser.click(button);

            browser.expect.element(button).text.to.equal('Button Clicked')


        })
    },

    'getByPlaceholderText'(browser) {
        browser.getByPlaceholderText('Placeholder Text', (input) => {

            browser.expect.element(input).value.not.to.equal('Hello Placeholder');
            browser.setValue(input, 'Hello Placeholder');

            browser.expect.element(input).value.to.equal('Hello Placeholder');
        })
    },

    // 'getByLabelText'(browser) {
    //     browser.getByLabelText('Label For Input Labelled By Id', (input) => {
    //         browser.setValue(input, 'Hello Input Labelled by Id');

    //         browser.expect.element(input).value.to.equal('Hello Input Labelled by Id');
    //     });
    // }
};