
const path = require('path');
const fs = require('fs');
const { queries: baseQueries } = require('@testing-library/dom');
// import { queries } from '@testing-library/dom'

const DOM_TESTING_LIBRARY_UMD_PATH = path.join(
    require.resolve('@testing-library/dom'),
    '../../',
    'dist/@testing-library/dom.umd.js',
)
const DOM_TESTING_LIBRARY_UMD = fs.readFileSync(DOM_TESTING_LIBRARY_UMD_PATH).toString()
const SIMMERJS = fs.readFileSync(require.resolve('simmerjs/dist/simmer.js')).toString();

let _config = null;

function injectNWTL(browser) {
    browser.execute(DOM_TESTING_LIBRARY_UMD);

    browser.execute(SIMMERJS);

    if (_config) {
        // eslint-disable-next-line no-shadow
        browser.execute(function (_config) {
            window.TestingLibraryDom.configure(_config);
        }, [_config])
    }

}


const getQueriesFrom = (browser, container) => {
    const queries = {};
    Object.keys(baseQueries).forEach(queryName => {
        queries[queryName] = (...args) => new Promise((resolve, reject) => {
            args = args.map(arg => {
                if (arg instanceof RegExp) {
                    return { RegExp: arg.toString() };
                }
                return arg;
            })

            injectNWTL(browser)
            // eslint-disable-next-line no-shadow
            browser.execute(function (queryName, container, ...args) {
                try {
                    args = args.map(arg => {
                        if (arg.RegExp) {
                            // eslint-disable-next-line no-eval
                            return eval(arg.RegExp);
                        }
                        return arg;
                    });
                    const root = container ? document.querySelector(container) : document.body;
                    if (/AllBy/.test(queryName)) {
                        const elms = window.TestingLibraryDom[queryName](root, ...args);

                        const selector = elms.map(elm => window.Simmer(elm)).join(', ');

                        return selector;
                    } else {
                        const elm = window.TestingLibraryDom[queryName](root, ...args);

                        const selector = window.Simmer(elm);

                        return selector;
                    }
                } catch (e) {
                    return { error: { message: e.message, stack: e.stack } };
                }
            }, [queryName, container, ...args], (result) => {


                if (result.value.error) {
                    const { message } = result.value.error;
                    // have to dump the error message here, NW won't fail if you throw.
                    // eslint-disable-next-line no-console
                    console.error(message);
                    reject({ selector: queryName, value: [...args], locatorStrategy: queryName })
                }
                let { value: selector } = result;
                if (!selector) {
                    selector = `.NWTL_${queryName}-${args[0].replace(/ /g, '-')}`
                }
                resolve({
                    selector,
                    nth(index) { return (({ selector: selector.split(/, /)[index], browser: () => browser })) },
                    browser: () => browser
                })


            });
        })
    });

    return queries;
}
const within = (selector) => {
    return getQueriesFrom(selector.browser(), selector.selector);
}
const configure = (config) => {
    _config = config;
}
module.exports = {
    configure, getQueriesFrom, within
}