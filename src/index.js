const { queries: baseQueries } = require('@testing-library/dom');

module.exports.getQueriesFrom = (browser) => {
    const queries = {};
    Object.keys(baseQueries).forEach(queryName => {
        queries[queryName] = (...args) => new Promise((resolve, reject) => {
            args = args.map(arg => {
                if (arg instanceof RegExp) {
                    return { RegExp: arg.toString() };
                }
                return arg;
            })
            // eslint-disable-next-line no-shadow
            browser.execute(function (queryName, ...args) {
                try {
                    args = args.map(arg => {
                        if (arg.RegExp) {
                            // eslint-disable-next-line no-eval
                            return eval(arg.RegExp);
                        }
                        return arg;
                    });
                    if (/AllBy/.test(queryName)) {
                        const elms = window.TestingLibraryDom[queryName](document.body, ...args);

                        const selector = elms.map(elm => window.Simmer(elm)).join(', ');

                        return selector;
                    } else {
                        const elm = window.TestingLibraryDom[queryName](document.body, ...args);

                        const selector = window.Simmer(elm);

                        return selector;
                    }
                } catch (e) {
                    return { error: { message: e.message, stack: e.stack } };
                }
            }, [queryName, ...args], (result) => {


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
                    nth(index) { return (({ selector, index })) }
                })


            });
        })
    });

    return queries;
}