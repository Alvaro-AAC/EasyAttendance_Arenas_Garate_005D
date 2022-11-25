import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getiolabel() {
    return element(by.deepCss('app-root ion-label')).getText();
  }
  getpruebaselec() {
    return element(by.deepCss('app-root ion-select-option')).getText();
  }
  getnoticias() {
    return element(by.deepCss('app-root ion-label')).getText();
  }
  getscanner() {
    return element(by.deepCss('ion-button')).getText();
  }
  getlabel() {
    return element(by.deepCss('app-root ion-label')).getText();
  }
}
