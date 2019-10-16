const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { queries } = require('@testing-library/dom');


const writeFile = promisify(fs.writeFile);

const fileWrites = Object.keys(queries).map(queryName => {

    const commandCode = `
    const DTLError = require('../DTLError');

    module.exports.command = function (text, callback) {
    
    
        const self = this;
        // eslint-disable-next-line no-shadow
        this.execute(function (text) {
            try {
                const elm = window.TestingLibraryDom.${queryName}(document.body, text);
    
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
                callback.call(self, { selector: '${queryName}', value: text, locatorStrategy: '${queryName}' })
            }
            const { value: { xpath, tagName } } = result;
            callback.call(self, { selector: tagName, value: xpath, locatorStrategy: 'xpath' })
    
    
        });
    
    }
    `;


    return writeFile(path.resolve(`./src/commands/${queryName}.js`), commandCode);

});

Promise.all(fileWrites).then(() => {
    console.log('Done');
})