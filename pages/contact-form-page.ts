import { Page, expect } from '@playwright/test';
import { BASE_URL } from '../tests/utils/constants';


export class ContactFormPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(BASE_URL);
    // await this.page.goto('https://automationintesting.online/');
    await expect(this.page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
    await this.page.locator('#navbarNav').getByRole('link', { name: 'Contact' }).click();
    await expect(this.page.locator('#contact')).toContainText('Send Us a Message');
  }

  async fillForm(data: { name: string; email: string; subject: string; description: string; phone: string }) {
    await this.page.getByTestId('ContactName').fill(data.name);
    await this.page.getByTestId('ContactEmail').fill(data.email);
    await this.page.getByTestId('ContactSubject').fill(data.subject);
    await this.page.getByTestId('ContactDescription').fill(data.description);
    await this.page.getByTestId('ContactPhone').fill(data.phone);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async expectPhoneValidationError() {
    await expect(this.page.locator('#contact')).toContainText('Phone must be between 11 and 21 characters.');
  }

  async expectEmailValidationError() {
    await expect(this.page.locator('#contact')).toContainText('must be a well-formed email address');
  }

  async expectNameValidationError() {
    await expect(this.page.locator('#contact')).toContainText('Name may not be blank');
  }

  async expectSubjectValidationError() {
    await expect(this.page.locator('#contact')).toContainText('Subject may not be blank');
  }

  async expectSubjectTooLongValidationError() {
    await expect(this.page.locator('#contact')).toContainText('Subject must be between 5 and 100 characters.');
  }

  async expectEmptyMessageValidationError() {
    await expect(this.page.locator('#contact')).toContainText('Message may not be blank');
  }

  async expectMessageTooLongValidationError() {
    await expect(this.page.locator('#contact')).toContainText('Message must be between 20 and 2000 characters.');
  }

  async expectSuccess(subject: string, name: string) {
    await expect(this.page.locator('#contact')).toContainText(subject);
    await expect(this.page.locator('#contact')).toContainText(`Thanks for getting in touch ${name}!`);
  }
}
