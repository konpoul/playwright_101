import { test, expect } from "../fixtures/index";
import SimpleFormPage from '../pages/simpleFormPage';

test('Simple Form Test Scenario', async ({ page }) => {
  const simpleFormPage = new SimpleFormPage(page);

  //  1. Open LambdaTest’s Selenium Playground
  await simpleFormPage.open();
  //  2. Click “Simple Form Demo”
  await simpleFormPage.clickSimpleFormDemo();
  //  3. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/simple-form-demo/);

  // 4.  Create a variable for a string value”.
  const message = 'Welcome to LambdaTest';

  // 5.  Use above variable to enter values in the “Enter Message” text box
  await simpleFormPage.enterMessage(message);
  // 6.  Click “Get Checked Value”
  await simpleFormPage.clickGetCheckedValue();

  /* 7. Validate whether the same text message is displayed in the right-hand
panel under the “Your Message:” section. */
  await expect(simpleFormPage.messageLocator).toHaveText(message),{ timeout: 777 };
});
