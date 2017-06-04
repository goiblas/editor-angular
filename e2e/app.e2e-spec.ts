import { NgEditorPage } from './app.po';

describe('ng-editor App', () => {
  let page: NgEditorPage;

  beforeEach(() => {
    page = new NgEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
