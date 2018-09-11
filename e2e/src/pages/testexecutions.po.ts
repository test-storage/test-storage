import { browser, element, by, promise } from 'protractor';
import { Helpers } from '../helpers/Helpers';

export class TestExecutionsPage extends Helpers {

    // Locators

    headerPerson = element(by.id('header-person'));
    logoutButton = element(by.id('logout'));

    // Methods

    navigateTo() {
        return browser.get('/testmanagement');
    }

}
