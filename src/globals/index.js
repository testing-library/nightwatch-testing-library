
const path = require('path');
const fs = require('fs');
// import { queries } from '@testing-library/dom'

const DOM_TESTING_LIBRARY_UMD_PATH = path.join(
  require.resolve('@testing-library/dom'),
  '../../',
  'dist/@testing-library/dom.umd.js',
)
const DOM_TESTING_LIBRARY_UMD = fs.readFileSync(DOM_TESTING_LIBRARY_UMD_PATH).toString()
const XPATH = fs.readFileSync(require.resolve('./xpath.js')).toString();

module.exports = {
  beforeEach(browser, done) {

    browser
      .url('http://localhost:13370').execute(DOM_TESTING_LIBRARY_UMD).execute(function () {
        return window.TestingLibraryDom.getByText(document.body, 'getByText');
      }).execute(XPATH);
    done()
  }

}