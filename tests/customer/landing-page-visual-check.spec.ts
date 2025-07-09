import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await expect(page).toHaveScreenshot();
});