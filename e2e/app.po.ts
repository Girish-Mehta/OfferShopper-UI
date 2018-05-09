import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/homepage');
  }

  getFAQButton(){
    return element(by.css('[routerLink="/help/FAQs"]'));
  }

  getShopButton(){
    return element(by.css('[routerLink="/search"]'));
  }

  getHomeButton(){
    return element(by.id('home-button'));
  }

  getTermsAndConditions() {
    return element(by.css('app-help h1'));
  }
}
