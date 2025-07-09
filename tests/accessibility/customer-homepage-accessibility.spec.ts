import AxeBuilder from '@axe-core/playwright';
import test, { expect } from '@playwright/test';


test.describe('Customer homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://automationintesting.online/');

    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
    

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Customer homepage with custom viewport', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 400 });
    await page.goto('https://automationintesting.online/');

    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});