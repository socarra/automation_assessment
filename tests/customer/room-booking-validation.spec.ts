import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BASE_URL } from '../utils/constants';



function getFutureDate(daysAhead: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function toIso(dateStr: string) {
  const [dd, mm, yyyy] = dateStr.split('/');
  return `${yyyy}-${mm}-${dd}`;
}

async function fillBookingForm(page, data: { first: string; last: string; email: string; phone: string }) {
  await page.getByRole('textbox', { name: 'Firstname' }).fill(data.first);
  await page.getByRole('textbox', { name: 'Lastname' }).fill(data.last);
  await page.getByRole('textbox', { name: 'Email' }).fill(data.email);
  await page.getByRole('textbox', { name: 'Phone' }).fill(data.phone);
}

test.describe('Room booking validation', () => {
  test('should validate booking form and confirm booking', async ({ page }) => {
    // Prepare dates
    const checkIn = getFutureDate(35);
    const checkOut = getFutureDate(45);
    const expectedBookingDates = `${toIso(checkIn)} - ${toIso(checkOut)}`;

    // Generate random user data
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    const validEmail = faker.internet.exampleEmail({ firstName: first, lastName: last });
    const invalidEmail = 'john.doe';
    const validPhone = faker.phone.number();
    const invalidPhone = '1234567890';

    // Go to booking page and select dates
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Book Now', exact: true }).click();
    await page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox').click();
    await page.locator('input[type="text"]').first().fill(checkIn);
    await page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox').click();
    await page.locator('input[type="text"]').nth(1).fill(checkOut);
    await page.getByRole('button', { name: 'Check Availability' }).click();

    // Assert room is visible
    const roomLink = page.locator('div').filter({ hasText: /^£100 per nightBook now$/ }).getByRole('link');
    if (!(await roomLink.isVisible())) {
      throw new Error('Expected room link with text "£100 per nightBook now" was not found.');
    }
    await roomLink.click();
    await page.getByRole('button', { name: 'Reserve Now' }).click();

    // Try invalid email
    await fillBookingForm(page, {
      first,
      last,
      email: invalidEmail,
      phone: validPhone,
    });
    await page.getByRole('button', { name: 'Reserve Now' }).click();
    await expect(page.locator('form')).toContainText('must be a well-formed email address');

    // Try invalid phone
    await page.getByRole('textbox', { name: 'Email' }).fill(validEmail);
    await page.getByRole('textbox', { name: 'Phone' }).fill(invalidPhone);
    await page.getByRole('button', { name: 'Reserve Now' }).click();
    await expect(page.locator('form')).toContainText('size must be between 11 and 21');

    // Submit with valid data
    await page.getByRole('textbox', { name: 'Phone' }).fill(validPhone);
    await page.getByRole('button', { name: 'Reserve Now' }).click();
    await expect(page.locator('#root-container')).toContainText('Booking Confirmed');
    await expect(page.locator('#root-container')).toContainText('Your booking has been confirmed for the following dates:');
    await expect(page.locator('#root-container')).toContainText(expectedBookingDates);
    await page.getByRole('link', { name: 'Return home' }).click();
    await expect(page.locator('h1')).toContainText('Welcome to Shady Meadows B&B');
  });
});
