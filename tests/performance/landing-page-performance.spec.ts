import { test } from '@playwright/test';
import * as fs from 'fs';
import { getMinuteSecondTimestamp } from '../utils/timestamp';
const timestamp = getMinuteSecondTimestamp();

test('basic performance navigation', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  );

  const navigationTiming = JSON.parse(navigationTimingJson);
  console.log(navigationTiming);

  // Write output to a file in the current working directory
  fs.writeFileSync(`navigation-timing-${timestamp}.json`, navigationTimingJson, 'utf-8');
});