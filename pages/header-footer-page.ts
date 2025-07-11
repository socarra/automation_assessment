import { Page, expect } from '@playwright/test';
import { BASE_URL } from '../tests/utils/constants';

export class HeaderFooterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(BASE_URL);
  }

  async checkHeaderLinks() {
    await this.page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
    await expect(this.page.locator('#rooms')).toContainText('Our Rooms');
    await this.page.locator('#navbarNav').getByRole('link', { name: 'Booking' }).click();
    await expect(this.page.locator('#booking')).toContainText('Check Availability & Book Your Stay');
    await this.page.getByRole('link', { name: 'Amenities' }).click();
    await expect(this.page.locator('#amenities')).toContainText('Amenities');
    await this.page.getByRole('link', { name: 'Location' }).click();
    await expect(this.page.locator('#location')).toContainText('Our Location');
    await this.page.locator('#navbarNav').getByRole('link', { name: 'Contact' }).click();
    await expect(this.page.locator('#contact')).toContainText('Send Us a Message');
  }

  async checkFooterOnPageLinks() {
    await this.page.getByRole('link', { name: 'Home' }).click();
    await expect(this.page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
    await this.page.getByRole('contentinfo').getByRole('link', { name: 'Rooms' }).click();
    await expect(this.page.getByRole('heading', { name: 'Our Rooms' })).toBeVisible();
  }

  async checkFooterOffPageLinks() {
    await this.page.goto(BASE_URL);
    await expect(this.page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
    await this.page.getByRole('link', { name: 'Cookie-Policy' }).click();
    await expect(this.page).toHaveURL(`${BASE_URL}cookie`);
    await expect(this.page.locator('h1')).toContainText('Cookie Policy');

    await this.page.goto(BASE_URL);
    await this.page.getByRole('link', { name: 'Privacy-Policy' }).click();
    await expect(this.page).toHaveURL(`${BASE_URL}privacy`);
    await expect(this.page.locator('h1')).toContainText('Privacy Policy Notice');

    await this.page.goto(BASE_URL);
    await this.page.getByRole('link', { name: 'Admin panel' }).click();
    await expect(this.page).toHaveURL(`${BASE_URL}admin`);
    await expect(this.page.getByRole('navigation')).toContainText('Restful Booker Platform Demo');
  }
}