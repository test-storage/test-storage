import { browser } from 'protractor';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { BaseTest } from './BaseTest';
import { expect } from 'chai';
import { should } from 'chai-as-promised';

describe('Test Storage loginpage', async function() {
    this.timeout(100000);
  it('should successfully redirect to homepage after login action', function(done) {
    let loginPage = new LoginPage();
    let homePage = new HomePage();

    browser.get('http://localhost:3000', 30000);
    browser.waitForAngular();
    loginPage.typeLogin('admin@test-storage.local');
    loginPage.typePassword('pass123');
    loginPage.submitLoginButton();
        
    let actual = homePage.isUserLogged();
    let expected = 'John Doe';

// expect(actual).to.equal(expected);

    return actual.then(function(result){
        expect(result).to.equal(expected);
        done();
    });
    
  });
  
});