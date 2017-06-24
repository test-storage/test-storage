import { browser } from 'protractor';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { BaseTest } from './BaseTest';
import { expect } from 'chai';


describe('Test Storage loginpage', async function() {

  it('should successfully redirect to homepage after login action', function(done) {
    const loginPage = new LoginPage();
    const homePage = new HomePage();

    browser.get('http://localhost:3000', 30000);
    browser.waitForAngular();
    loginPage.typeLogin('admin');
    loginPage.typePassword('admin');
    loginPage.submitLoginButton();

    const actual = homePage.isUserLogged();
    const expected = 'John Doe';

// expect(actual).to.equal(expected);

    return actual.then(function(result){
        expect(result).to.equal(expected);
        done();
    });

  });

});
