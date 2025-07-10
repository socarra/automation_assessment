import { test, expect } from '@playwright/test';
import { AdminRoomPage } from '../../pages/admin-room-page';
import { getMinuteSecondTimestamp } from '../utils/timestamp';
const timestamp = getMinuteSecondTimestamp();

test('admin can create and edit a room', async ({ page }) => {
  const adminRoomPage = new AdminRoomPage(page);
  await page.goto('https://automationintesting.online/admin');
  await adminRoomPage.loginIfNeeded();


  const roomName = `555 - ${timestamp}`; 

  // Create a new room
  await adminRoomPage.createRoom(roomName, '951');

  // Assert room creation has been successful
  await page.getByText(roomName).click();
  await expect(page.locator('#root-container')).toContainText(`Room: 555`);
  await expect(page.locator('#root-container')).toContainText('Type: Twin');
  await expect(page.locator('#root-container')).toContainText('Features: Radio, Safe');
  await expect(page.locator('#root-container')).toContainText('Room price: 951');

  // Edit the room - verify edits display on the page
  await adminRoomPage.editRoom('Double', '550', `Description added in edit - ${timestamp}`);
  await expect(page.locator('#root-container')).toContainText(`Room: 555`);
  await expect(page.locator('#root-container')).toContainText('Type: Double');
  await expect(page.locator('#root-container')).toContainText('Features: Radio, Safe');
  await expect(page.locator('#root-container')).toContainText('Room price: 550');
  await expect(page.locator('#root-container')).toContainText('Description added in edit');
});
