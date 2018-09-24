import { browser, ExpectedConditions } from 'protractor';

export class Helpers {

  private WAIT_TIME = 30000;

    waitForPresenceOf(element: any) {
        browser.wait(ExpectedConditions.presenceOf(element), this.WAIT_TIME);
    }

     waitForClickable(element: any) {
        browser.wait(ExpectedConditions.elementToBeClickable(element), this.WAIT_TIME);
    }

    waitForVisibility(element: any) {
        browser.wait(ExpectedConditions.visibilityOf(element), this.WAIT_TIME);
    }

    waitForAngular() {
        browser.waitForAngular();
    }
}
