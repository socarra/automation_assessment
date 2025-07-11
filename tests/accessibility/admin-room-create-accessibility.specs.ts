import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ADMIN_BASE_URL } from '../utils/constants';
import { BASE_URL } from '../utils/constants';


test.describe('room detail', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('ADMIN_BASE_URL');

    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
