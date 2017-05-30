import { NgPresentationPage } from './app.po';

describe('ng-presentation App', () => {
  let page: NgPresentationPage;

  beforeEach(() => {
    page = new NgPresentationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
