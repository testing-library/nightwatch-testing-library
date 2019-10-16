
    const DTLError = require('../DTLError');

    module.exports.command = function (text, callback) {
    
    
        const self = this;
        // eslint-disable-next-line no-shadow
        this.execute(function (text) {
            try {
                const elm = window.TestingLibraryDom.findAllByTestId(document.body, text);
    
                const xpath = window.createXPathFromElement(elm);
    
                return { xpath, tagName: elm.tagName };
            } catch (e) {
                return { error: { message: e.message, stack: e.stack } };
            }
        }, [text], (result) => {
    
    
            if (result.value.error) {
                const { message, stack } = result.value.error;
                // have to dump the error message here.
                // eslint-disable-next-line no-console
                console.error(message);
                callback.call(self, { selector: 'findAllByTestId', value: text, locatorStrategy: 'findAllByTestId' })
            }
            const { value: { xpath, tagName } } = result;
            callback.call(self, { selector: tagName, value: xpath, locatorStrategy: 'xpath' })
    
    
        });
    
    }
    