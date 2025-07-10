import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
import { getMinuteSecondTimestamp } from '../utils/timestamp';


async function loginIfNeeded(page) {
  const headingText = await page.getByRole('heading').textContent();
  if (headingText && headingText.includes('Login')) {
  //  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ADMIN_USERNAME);
  //  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ADMIN_PASSWORD);
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
  }
  await expect(page.locator('#navbarSupportedContent')).toContainText('Rooms');
}

async function createRoom(page, roomName: string, price: string) {
  await page.getByTestId('roomName').fill(roomName);
  await page.locator('#type').selectOption('Twin');
  await page.locator('#accessible').selectOption('true');
  await page.locator('#roomPrice').fill(price);
  await page.getByRole('checkbox', { name: 'Safe' }).check();
  await page.getByRole('checkbox', { name: 'Radio' }).check();
  await page.getByRole('button', { name: 'Create' }).click();
}

async function editRoom(page, newType: string, newPrice: string, description: string) {
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Type:').selectOption(newType);
  await page.getByRole('textbox', { name: 'Room price:' }).fill(newPrice);
  await page.getByRole('textbox', { name: 'Description' }).fill(description);
  await page.getByRole('button', { name: 'Update' }).click();
}

test('admin can create and edit a room', async ({ page }) => {
  await page.goto('https://automationintesting.online/admin');
  await loginIfNeeded(page);

  // Generate timestamp for uniqueness
  const timestamp = getMinuteSecondTimestamp();
  const roomName = `555 - ${timestamp}`;

  // Create a new room
  await createRoom(page, roomName, '951');

  // Assert room creation
  await page.getByText(roomName).click();
  await expect(page.locator('#root-container')).toContainText(`Room: 555`);
  await expect(page.locator('#root-container')).toContainText('Type: Twin');
  await expect(page.locator('#root-container')).toContainText('Features: Radio, Safe');
  await expect(page.locator('#root-container')).toContainText('Room price: 951');

  // Edit the room
  await editRoom(page, 'Double', '550', `Description added in edit - ${timestamp}`);
});