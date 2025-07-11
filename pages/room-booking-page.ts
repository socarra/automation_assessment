import { Page, expect } from '@playwright/test';

export class RoomBookingPage {
  constructor(private page: Page) {}

  async goto(baseUrl: string) {
    await this.page.goto(baseUrl);
  }

  async selectBookingDates(checkIn: string, checkOut: string) {
    await this.page.getByRole('link', { name: 'Book Now', exact: true }).click();
    await this.page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox').click();
    await this.page.locator('input[type="text"]').first().fill(checkIn);
    await this.page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox').click();
    await this.page.locator('input[type="text"]').nth(1).fill(checkOut);
    await this.page.getByRole('button', { name: 'Check Availability' }).click();
  }

  async selectRoom() {
    const roomLink = this.page.locator('div').filter({ hasText: /^£100 per nightBook now$/ }).getByRole('link');
    if (!(await roomLink.isVisible())) {
      throw new Error('Expected room link with text "£100 per nightBook now" was not found.');
    }
    await roomLink.click();
    await this.page.getByRole('button', { name: 'Reserve Now' }).click();
  }

  async fillBookingForm(data: { first: string; last: string; email: string; phone: string }) {
    await this.page.getByRole('textbox', { name: 'Firstname' }).fill(data.first);
    await this.page.getByRole('textbox', { name: 'Lastname' }).fill(data.last);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(data.email);
    await this.page.getByRole('textbox', { name: 'Phone' }).fill(data.phone);
  }

  async submitBooking() {
    await this.page.getByRole('button', { name: 'Reserve Now' }).click();
  }

  async expectEmailValidationError() {
    await expect(this.page.locator('form')).toContainText('must be a well-formed email address');
  }

  async expectPhoneValidationError() {
    await expect(this.page.locator('form')).toContainText('size must be between 11 and 21');
  }

  async expectBookingConfirmed(expectedBookingDates: string) {
    await expect(this.page.locator('#root-container')).toContainText('Booking Confirmed');
    await expect(this.page.locator('#root-container')).toContainText('Your booking has been confirmed for the following dates:');
    await expect(this.page.locator('#root-container')).toContainText(expectedBookingDates);
  }

  async returnHome() {
    await this.page.getByRole('link', { name: 'Return home' }).click();
    await expect(this.page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
  }
}