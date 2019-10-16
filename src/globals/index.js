
const path = require('path');
const fs = require('fs');
// import { queries } from '@testing-library/dom'

const DOM_TESTING_LIBRARY_UMD_PATH = path.join(
  require.resolve('@testing-library/dom'),
  '../../',
  'dist/@testing-library/dom.umd.js',
)
const DOM_TESTING_LIBRARY_UMD = fs.readFileSync(DOM_TESTING_LIBRARY_UMD_PATH).toString()
const SIMMERJS = fs.readFileSync(require.resolve('simmerjs/dist/simmer.js')).toString();
module.exports = {
  beforeEach(browser, done) {
    console.log(SIMMERJS)
    browser
      .url('http://localhost:13370').execute(DOM_TESTING_LIBRARY_UMD)
      .execute(function () {
        return window.TestingLibraryDom.getByText(document.body, 'getByText');
      })
      .execute(SIMMERJS);
    done();
  }

}