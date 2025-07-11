import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('room detail', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://automationintesting.online/reservation/1?checkin=2025-07-07&checkout=2025-07-08');

    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
