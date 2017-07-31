import { browser, element, by, promise } from 'protractor';
import { Helpers } from '../helpers/Helpers';

export class DashboardPage extends Helpers {

    // Locators

    headerPerson = element(by.id('header-person'));

    // Methods

    navigateTo() {
        return browser.get('/dashboard');
    }

    isUserLogged() {
        super.waitForPresenceOf(this.headerPerson);
        return this.headerPerson.getText();
    }
}
