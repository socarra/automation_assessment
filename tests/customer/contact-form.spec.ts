import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
// This test suite validates the contact form functionality on the Shady Meadows B&B website.

const BASE_URL = 'https://automationintesting.online/';
const TEST_DATA = {
  name: faker.person.fullName(),
  email: faker.internet.exampleEmail(),
  subject: 'Question about facilities',
  description: 'This is my question about the facilities that are on offer at the B&B',
  invalidPhone: '1234567890',
  validPhone: faker.phone.number(),
};

async function fillContactForm(page, phone: string) {
  await page.getByTestId('ContactName').fill(TEST_DATA.name);
  await page.getByTestId('ContactEmail').fill(TEST_DATA.email);
  await page.getByTestId('ContactSubject').fill(TEST_DATA.subject);
  await page.getByTestId('ContactDescription').fill(TEST_DATA.description);
  await page.getByTestId('ContactPhone').fill(phone);
}

test.describe('Contact form', () => {
  test('should validate and submit the contact form', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
    await page.locator('#navbarNav').getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#contact')).toContainText('Send Us a Message');

    // Submit with invalid phone
    await fillContactForm(page, TEST_DATA.invalidPhone);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#contact')).toContainText('Phone must be between 11 and 21 characters.');

    // Submit with valid phone
    await page.getByTestId('ContactPhone').fill(TEST_DATA.validPhone);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#contact')).toContainText(TEST_DATA.subject);
    await expect(page.locator('#contact')).toContainText(`Thanks for getting in touch ${TEST_DATA.name}!`);
  });
});
