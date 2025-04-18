import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 120 * 1000,
  retries: 0,
  fullyParallel: true,

  projects: [
    {
      name: "pw-firefox:latest:macOS Catalina@lambdatest",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "chrome:latest:Windows 11@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  use: {
    baseURL: "https://www.lambdatest.com/selenium-playground/",
    headless: true, 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
    launchOptions: { slowMo: 1000 },
  },

  reporter: [
    ['dot'],
    ['json', { outputFile: 'jsonReports/jsonReport.json' }],
    ['html', { open: 'never' }],
  ],
};

export default config;
