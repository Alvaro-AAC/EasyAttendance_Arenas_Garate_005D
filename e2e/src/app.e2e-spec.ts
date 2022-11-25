import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Prueba iolabel', () => {
    page.navigateTo();
    expect(page.getiolabel()).toContain('¡Listo! Ya quedaste presente');
  });
  it('Prueba selecconfig', () => {
    page.navigateTo();
    expect(page.getpruebaselec()).toContain('Nunca');
  });
  it('Prueba selecnotice', () => {
    page.navigateTo();
    expect(page.getnoticias()).toContain('@DuocUC');
  });
  it('Prueba scann', () => {
    page.navigateTo();
    expect(page.getscanner()).toContain('Cerrar');
  });
  it('Prueba labelogin', () => {
    page.navigateTo();
    expect(page.getlabel()).toContain('Iniciar con DuocUC');
  });
});
