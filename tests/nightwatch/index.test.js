
module.exports = {

    'Demo test Google': function (browser, done) {
        browser.getByText('Unique Button Text', (element) => {


            browser.click(element);
            browser
                // .pause(1000000)
                .end();
        })



    }
};