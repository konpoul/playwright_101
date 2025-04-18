import { test as base, chromium } from "playwright/test";
import SimpleFormPage from "../pages/simpleFormPage";
import DragDropRangeSlidersPage from "../pages/dragDropRangeSlidersPage";
import InputFormPage from "../pages/inputFormPage";
import 'dotenv/config';
import path from "path";
type pages = {
      simpleForm: SimpleFormPage;
      dragDropRangeSliders: DragDropRangeSlidersPage;
      inputForm: InputFormPage;
}

const capabilities = {
      'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
      'browserVersion': 'latest',
      'LT:Options': {
            'platform': 'Windows 10',
            'build': 'Playwright Sample Build',
            'name': 'Playwright Sample Test',
            'user': process.env.LT_USERNAME,
            'accessKey': process.env.LT_ACCESS_KEY,
            'network': true,
            "tunnel": false,
            'video': true,
            'console': true,
            'screenshots': true
      }


}

const modifyCapabilities = (configName, testName) => {
      let config = configName.split("@lambdatest")[0];
      let [browserName, browserVersion, platform] = config.split(":");
      capabilities.browserName = browserName
            ? browserName
            : capabilities.browserName;
      capabilities.browserVersion = browserVersion
            ? browserVersion
            : capabilities.browserVersion;
      capabilities["LT:Options"]["platform"] = platform
            ? platform
            : capabilities["LT:Options"]["platform"];
      capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj, keys) => {
      keys.reduce(
            (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
            obj
      )
}

export const test = base.extend<pages>({
      page: async ({ }, use, testInfo) => {

            let fileName = testInfo.file.split(path.sep).pop();

            if (testInfo.project.name.match(/lambdatest/)) {
                  modifyCapabilities(
                        testInfo.project.name,
                        `${testInfo.title} - ${fileName}`
                  );

                  const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
                  const context = await browser.newContext(testInfo.project.use);
                  const ltPage = await context.newPage();

                  await use(ltPage);

                  const testStatus = {
                        action: "setTestStatus",
                        arguments: {
                              status: testInfo.status,
                              remark: testInfo.error?.stack || testInfo.error?.message,
                        },
                  };

                  await ltPage.evaluate(() => { },
                        `lambdatest_action: ${JSON.stringify(testStatus)}`);
                  await ltPage.close();
                  await context.close();
                  await browser.close();
            } else {

                  const browser = await chromium.launch({ headless: false });
                  const context = await browser.newContext();
                  const page = await context.newPage();

                  await use(page);
                  await page.close();
                  await context.close();
                  await browser.close();
            }
      },
      simpleForm: async ({ page }, use) => {
            await use(new SimpleFormPage(page));
      },
      dragDropRangeSliders: async ({ page }, use) => {
            await use(new DragDropRangeSlidersPage(page));
      },
      inputForm: async ({ page }, use) => {
            await use(new InputFormPage(page));
      },
})

export const expect = test.expect;