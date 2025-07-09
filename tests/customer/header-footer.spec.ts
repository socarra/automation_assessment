import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationintesting.online/';

async function checkHeaderLinks(page) {
  await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
  await expect(page.locator('#rooms')).toContainText('Our Rooms');
  await page.locator('#navbarNav').getByRole('link', { name: 'Booking' }).click();
  await expect(page.locator('#booking')).toContainText('Check Availability & Book Your Stay');
  await page.getByRole('link', { name: 'Amenities' }).click();
  await expect(page.locator('#amenities')).toContainText('Amenities');
  await page.getByRole('link', { name: 'Location' }).click();
  await expect(page.locator('#location')).toContainText('Our Location');
  await page.locator('#navbarNav').getByRole('link', { name: 'Contact' }).click();
  await expect(page.locator('#contact')).toContainText('Send Us a Message');
}

async function checkFooterOnPageLinks(page) {
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Rooms' }).click();
  await expect(page.getByRole('heading', { name: 'Our Rooms' })).toBeVisible();
}

async function checkFooterOffPageLinks(page) {
  await page.goto(BASE_URL);
  await expect(page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
  await page.getByRole('link', { name: 'Cookie-Policy' }).click();
  await expect(page).toHaveURL(BASE_URL + 'cookie');
  await expect(page.locator('h1')).toContainText('Cookie Policy');

  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'Privacy-Policy' }).click();
  await expect(page).toHaveURL(BASE_URL + 'privacy');
  await expect(page.locator('h1')).toContainText('Privacy Policy Notice');

  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'Admin panel' }).click();
  await expect(page).toHaveURL(BASE_URL + 'admin');
  await expect(page.getByRole('navigation')).toContainText('Restful Booker Platform Demo');
}

test.describe('Header and Footer links', () => {
  test('verify all header links', async ({ page }) => {
    await page.goto(BASE_URL);
    await checkHeaderLinks(page);
  });

  test('verify all footer on-page links', async ({ page }) => {
    await page.goto(BASE_URL);
    await checkFooterOnPageLinks(page);
  });

  test('verify all footer off-page links', async ({ page }) => {
    await checkFooterOffPageLinks(page);
  });
});