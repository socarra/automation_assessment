import { test } from '@playwright/test';
import { RoomBookingPage } from '../../pages/room-booking-page';
import { BASE_URL } from '../utils/constants';
import { faker } from '@faker-js/faker'; 


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


test('should validate booking form and confirm booking', async ({ page }) => {
  // Define test data
  const checkIn = getFutureDate(35);
  const checkOut = getFutureDate(45);
  const expectedBookingDates = `${toIso(checkIn)} - ${toIso(checkOut)}`;
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  const validEmail = faker.internet.exampleEmail({ firstName: first, lastName: last });
  const invalidEmail = 'john.doe';
  const validPhone = faker.phone.number();
  const invalidPhone = '1234567890';


  const bookingPage = new RoomBookingPage(page);
  await bookingPage.goto(BASE_URL);
  await bookingPage.selectBookingDates(checkIn, checkOut);
  await bookingPage.selectRoom();

  // Try invalid email
  await bookingPage.fillBookingForm({ first, last, email: invalidEmail, phone: validPhone });
  await bookingPage.submitBooking();
  await bookingPage.expectEmailValidationError();

  // Try invalid phone
  await bookingPage.fillBookingForm({ first, last, email: validEmail, phone: invalidPhone });
  await bookingPage.submitBooking();
  await bookingPage.expectPhoneValidationError();

  // Submit with valid data
  await bookingPage.fillBookingForm({ first, last, email: validEmail, phone: validPhone });
  await bookingPage.submitBooking();
  await bookingPage.expectBookingConfirmed(expectedBookingDates);
  await bookingPage.returnHome();
});
