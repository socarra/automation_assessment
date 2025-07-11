import { test } from '@playwright/test';
import { HeaderFooterPage } from '../../pages/header-footer-page';

test.describe('Header and Footer links', () => {
  test('verify all header links', async ({ page }) => {
    const headerFooter = new HeaderFooterPage(page);
    await headerFooter.goto();
    await headerFooter.checkHeaderLinks();
  });

  test('verify all footer on-page links', async ({ page }) => {
    const headerFooter = new HeaderFooterPage(page);
    await headerFooter.goto();
    await headerFooter.checkFooterOnPageLinks();
  });

  test('verify all footer off-page links', async ({ page }) => {
    const headerFooter = new HeaderFooterPage(page);
    await headerFooter.checkFooterOffPageLinks();
  });
});
