import { browser, element, by, promise } from 'protractor';
import { Helpers } from '../helpers/Helpers';

export class HomePage extends Helpers {
 
    // Locators

    headerPerson = element(by.id('header-person'));

    // Methods

    isUserLogged() {
        super.waitForPresenceOf(this.headerPerson);
        return this.headerPerson.getText();
    }
}