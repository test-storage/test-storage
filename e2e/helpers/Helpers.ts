import { browser, ExpectedConditions } from 'protractor';

export class Helpers {

    waitForPresenceOf(element: any) {
        browser.wait(ExpectedConditions.presenceOf(element));
    }

     waitForClickable(element: any) {
        browser.wait(ExpectedConditions.elementToBeClickable(element));
    }

    waitForAngular() {
        browser.waitForAngular();
    }
}
