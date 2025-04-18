import { test, expect } from "../fixtures/index";
import SimpleFormPage from '../pages/simpleFormPage';

test('Simple Form Test Scenario', async ({ page }) => {
  const simpleFormPage = new SimpleFormPage(page);

  //   Open LambdaTest’s Selenium Playground
  await simpleFormPage.open();
  //   Click “Simple Form Demo”
  await simpleFormPage.clickSimpleFormDemo();
  //   Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/simple-form-demo/);

  //   Create a variable for a string value”.
  const message = 'Welcome to LambdaTest';

  //   Use above variable to enter values in the “Enter Message” text box
  await simpleFormPage.enterMessage(message);
  //   Click “Get Checked Value”
  await simpleFormPage.clickGetCheckedValue();

  /* Validate whether the same text message is displayed in the right-hand
panel under the “Your Message:” section. */
  await expect(simpleFormPage.messageLocator).toHaveText(message),{ timeout: 5000 };
});
