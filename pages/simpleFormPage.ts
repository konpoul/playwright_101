import { Page } from '@playwright/test';

export default class SimpleFormPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async open() {
    await this.page.goto('');
  }

  async clickSimpleFormDemo() {
    await this.page.getByRole('link', { name: 'Simple Form Demo' }).click();
  }

  async enterMessage(message: string) {
    await this.page.getByRole('textbox', { name: 'Please enter your Message' }).fill(message);
  }

  async clickGetCheckedValue() {
    await this.page.getByRole('button', { name: 'Get Checked Value' }).click();
  }

  get messageLocator() {
    return this.page.locator('#message');
  }

}