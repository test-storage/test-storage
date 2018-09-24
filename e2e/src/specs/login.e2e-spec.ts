import { HeaderComponent } from './../pages/header.po';
import { LoginPage } from '../pages/login.po';
import { ProjectsPage } from '../pages/projects.po';

describe('test-storage App', () => {
  let loginPage: LoginPage;
  let headerComponent: HeaderComponent;
  let projectsPage: ProjectsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    headerComponent = new HeaderComponent();
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

  it('should successfully redirect to login page after logout', () => {

    headerComponent.logout();

    const actual = loginPage.isLoginPage();
    const expected = true;

    expect(actual).toEqual(expected);
  });
});
