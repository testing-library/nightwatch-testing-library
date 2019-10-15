module.exports.command = function (text, callback) {

    return new Promise((resolve, reject) => {

        const self = this;
        // eslint-disable-next-line no-shadow
        this.execute(function (text) {
            const elm = window.TestingLibraryDom.getByText(document.body, text);
            const xpath = window.createXPathFromElement(elm);

            return { xpath, tagName: elm.tagName };
        }, [text], (result) => {
            const { value: { xpath, tagName } } = result;
            callback.call(self, { selector: tagName, value: xpath, locatorStrategy: 'xpath' })

        });
    });


    // return this;
    // const self = this;
    // return new Promise((res, rej) => {
    //     const thing = self.execute(function () {
    //         res(window.TestingLibraryDom.getByText(document.body, 'getByText'));
    //     }, (result) => {
    //         console.log(result)
    //     });
    // })
}