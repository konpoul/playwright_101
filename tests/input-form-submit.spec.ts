import {test} from "../fixtures/index";
import InputFormPage from '../pages/inputFormPage'; // Adjust the path if needed

  test('Input Form Test Scenario', async ({ page }) => {

    const inputForm = new InputFormPage(page);
    //  1. Open LambdaTest’s Selenium Playground
    await inputForm.open(); 
    // click “Input Form Submit
    await inputForm.navigateToInputFormDemo(); 

    // 2. Click “Submit” without filling in any information in the form
    await inputForm.submitForm();

    // 3. Assert “Please fill out this field” error message
    await inputForm.validateRequiredFieldMessage();

    // Define test form data
    const formData = {
      name: 'Test User',
      email: 'test.user@example.com',
      password: 'password123',
      company: 'Test Company Ltd.',
      website: 'https://example.com',
      city: 'Testville',
      address1: '123 Test Street',
      address2: 'Apt 4B',
      state: 'Testland',
      zip: 'T3S T1N'
    };
    
    // 4. Fill in Name, Email, and other fields.
    await inputForm.fillRequiredFields(formData);

    // 5. From the Country drop-down, select “United States” using the text property
    await inputForm.selectCountryByText('United States');

    // 6. Fill in all fields and click “Submit”
    await inputForm.submitForm();

    // 7. validate the success message “Thanks for contacting us, we will get back to you shortly.”alidate the success message
    const expectedSuccessMessage = 'Thanks for contacting us, we will get back to you shortly.';
    await inputForm.validateSuccessMessage(expectedSuccessMessage);
  });
