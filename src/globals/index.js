
const path = require('path');
const fs = require('fs');
// import { queries } from '@testing-library/dom'

const DOM_TESTING_LIBRARY_UMD_PATH = path.join(
  require.resolve('@testing-library/dom'),
  '../../',
  'dist/@testing-library/dom.umd.js',
)
const DOM_TESTING_LIBRARY_UMD = fs.readFileSync(DOM_TESTING_LIBRARY_UMD_PATH).toString()

module.exports = {

  // this.injectScript(DOM_TESTING_LIBRARY_UMD_PATH, 'DTL', function () {
  //   console.log('here')
  // });
  beforeEach(browser, done) {

    browser
      .url('http://localhost:13370').execute(DOM_TESTING_LIBRARY_UMD);
    done()
  }
  //this.execute('document.append("hello")')
  // this.execute(`document.write(\`<script>${DOM_TESTING_LIBRARY_UMD}</script>\`)`);
}