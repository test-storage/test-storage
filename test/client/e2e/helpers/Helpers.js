"use strict";
const protractor_1 = require('protractor');
class Helpers {
    waitForPresenceOf(element) {
        protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(element));
    }
    waitForClickable(element) {
        protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(element));
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=Helpers.js.map