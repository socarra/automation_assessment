import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ContactFormPage } from '../../pages/contact-form-page';

test.describe('Contact form', () => {
  test('should validate and submit once errors corrected', async ({ page }) => {
    const contactForm = new ContactFormPage(page);

    // Generate fresh test data
    const testData = {
      name: faker.person.fullName(),
      validEmail: faker.internet.exampleEmail(),
      subject: 'Question about facilities',
      description: 'This is my question about the facilities that are on offer at the B&B',
      invalidPhone: '1234567890',
      validPhone: faker.phone.number(),
      invalidEmail: 'john.doe',
      invalidName: '',
      invalidSubject: '',
      invalidDescription: '',
    };

    await contactForm.goto();

    // invalid phone
    await contactForm.fillForm({ ...testData, phone: testData.invalidPhone,email: testData.validEmail });
    await contactForm.submit();
    await contactForm.expectPhoneValidationError();

    // valid phone, but invalid email
    await contactForm.fillForm({ ...testData, phone: testData.validPhone, email: testData.invalidEmail });
    await contactForm.submit();
    await contactForm.expectEmailValidationError();

    // valid email, but invalid name
    await contactForm.fillForm({ ...testData, phone: testData.validPhone, email: testData.validEmail, name: testData.invalidName });
    await contactForm.submit();
    await contactForm.expectNameValidationError();

    // valid name, but invalid subject
    await contactForm.fillForm({ ...testData, phone: testData.validPhone, email: testData.validEmail, name: testData.name, subject: testData.invalidSubject });
    await contactForm.submit();
    await contactForm.expectSubjectValidationError();

    // valid subject, but invalid description
    await contactForm.fillForm({ ...testData, phone: testData.validPhone, email: testData.validEmail, name: testData.name, subject: testData.subject, description: testData.invalidDescription });
    await contactForm.submit();
    await contactForm.expectEmptyMessageValidationError();

    // valid form
    await contactForm.fillForm({ ...testData, phone: testData.validPhone, email: testData.validEmail, name: testData.name, subject: testData.subject, description: testData.description });
    await contactForm.submit();
    await contactForm.expectSuccess(testData.subject, testData.name);
  });
});
