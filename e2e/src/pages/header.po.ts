import { browser, element, by, promise } from 'protractor';
import { Helpers } from '../helpers/Helpers';

export class HeaderComponent extends Helpers {

    // Locators

    settingsDropdown = element(by.css('[data-test-id="settings-dropdown"]'));
    logoutButton = element(by.css('[data-test-id="logout"]'));

    // Methods

    logout() {
        this.waitForClickable(this.settingsDropdown);
        this.settingsDropdown.click();
        this.waitForPresenceOf(this.logoutButton);
        this.logoutButton.click();
    }
}
