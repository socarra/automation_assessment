import { expect, Page } from '@playwright/test';

export class AdminRoomPage {
  constructor(public page: Page) {}

  async loginIfNeeded() {
    const headingText = await this.page.getByRole('heading').textContent();
    if (headingText && headingText.includes('Login')) {
    // Uncomment the following lines to use environment variables for credentials  
    //  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ADMIN_USERNAME);
    //  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ADMIN_PASSWORD);
      await this.page.getByRole('textbox', { name: 'Username' }).fill('admin');
      await this.page.getByRole('textbox', { name: 'Password' }).fill('password');
      await this.page.getByRole('button', { name: 'Login' }).click();
    }
    await expect(this.page.locator('#navbarSupportedContent')).toContainText('Rooms');
  }

  async createRoom(roomName: string, price: string) {
    await this.page.getByTestId('roomName').fill(roomName);
    await this.page.locator('#type').selectOption('Twin');
    await this.page.locator('#accessible').selectOption('true');
    await this.page.locator('#roomPrice').fill(price);
    await this.page.getByRole('checkbox', { name: 'Safe' }).check();
    await this.page.getByRole('checkbox', { name: 'Radio' }).check();
    await this.page.getByRole('button', { name: 'Create' }).click();
  }

  async editRoom(newType: string, newPrice: string, description: string) {
    await this.page.getByRole('button', { name: 'Edit' }).click();
    await this.page.getByLabel('Type:').selectOption(newType);
    await this.page.getByRole('textbox', { name: 'Room price:' }).fill(newPrice);
    await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
    await this.page.getByRole('button', { name: 'Update' }).click();
  }
}