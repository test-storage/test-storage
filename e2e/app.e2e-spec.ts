import { TestStoragePage } from './app.po';

describe('test-storage App', () => {
  let page: TestStoragePage;

  beforeEach(() => {
    page = new TestStoragePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
