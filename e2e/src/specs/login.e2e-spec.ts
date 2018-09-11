import { LoginPage } from '../pages/login.po';
import { DashboardPage } from '../pages/dashboard.po';
import { ProjectsPage } from '../pages/projects.po';
import { browser, element, by } from 'protractor';

describe('test-storage App', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let projectsPage: ProjectsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    projectsPage = new ProjectsPage();
  });

  it('should successfully login and redirect to projects page', () => {
    loginPage.navigateTo();

    loginPage.typeLogin('admin');
    loginPage.typePassword('admin');
    loginPage.submitLoginButton();

    const actual = projectsPage.isPageLoaded();
    const expected = true;

    expect(actual).toEqual(expected);
  });

  xit('should successfully redirect to login page after logout', () => {

    dashboardPage.logout();

    const actual = loginPage.isLoginPage();
    const expected = true;

    expect(actual).toEqual(expected);
  });
});
