import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('offer-shopper App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  //test for checking if FAQ button is there
  it('should display FAQ button', () => {
    expect(page.getFAQButton().getText()).toEqual('FAQ');
  });

  //test for checking if shop button is there
  it('should display Shop button', () => {
    expect(page.getShopButton().getText()).toEqual('Shop');
  });

  //test for checking if home button is there
  it('should display Home button', () => {
    expect(page.getHomeButton().getText()).toEqual('Hom');
  });

  //test for checking if FAQ header is there
  it('should display FAQ title', () => {
    page.getFAQButton().click();
    expect(page.getTermsAndConditions().getText()).toEqual('FREQUENTLY ASKED QUESTIONS');
  });
 
});
