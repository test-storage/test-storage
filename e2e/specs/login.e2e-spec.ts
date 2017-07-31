import { LoginPage } from '../pages/login.po';
import { DashboardPage } from '../pages/dashboard.po';

describe('test-storage App', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
  });

  it('should successfully redirect to dashboard and logged in as John Doe', async() => {
    loginPage.navigateTo();

    loginPage.typeLogin('admin');
    loginPage.typePassword('admin');
    loginPage.submitLoginButton();

    const actual = await dashboardPage.isUserLogged();
    const expected = 'John Doe';

    expect(actual).toEqual(expected);
  });
});
