import { browser, element, by, promise } from 'protractor';
import { Helpers } from '../helpers/Helpers';

export class ProjectsPage extends Helpers {

    // Locators

    createProjectButton = element(by.css('[data-test-id="create-project"]'));

    // Methods

    navigateTo() {
        return browser.get('/projects');
    }

    isPageLoaded() {
      browser.waitForAngularEnabled(false);
      this.waitForPresenceOf(this.createProjectButton);
      return this.createProjectButton.isDisplayed();
    }
}
