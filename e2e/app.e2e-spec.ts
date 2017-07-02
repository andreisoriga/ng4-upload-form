import { Ng4UploadFormPage } from './app.po';

describe('ng4-upload-form App', () => {
  let page: Ng4UploadFormPage;

  beforeEach(() => {
    page = new Ng4UploadFormPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
