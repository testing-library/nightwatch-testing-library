const { queries: baseQueries } = require('@testing-library/dom');

module.exports.getQueriesFrom = (browser) => {
    const queries = {};
    Object.keys(baseQueries).forEach(queryName => {
        queries[queryName] = (...args) => new Promise((resolve, reject) => {
            // eslint-disable-next-line no-shadow
            browser.execute(function (queryName, ...args) {
                try {
                    const elm = window.TestingLibraryDom[queryName](document.body, ...args);

                    const selector = window.Simmer(elm);

                    return { selector };
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
                const { value: selector } = result;
                resolve(selector)


            });
        })
    });

    return queries;
}