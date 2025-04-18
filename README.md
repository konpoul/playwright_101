This project contains automated tests written using Playwright for scenarios on the LambdaTest Playground website.

## Running Tests

### LambdaTest Execution (Parallel - for Reviewers in Gitpod)

The Gitpod environment is automatically configured by `.gitpod.yml` (installs dependencies and browsers).

1.  **Prepare `.env` File for LambdaTest Credentials:**
    *   In your Gitpod workspace, **copy** the `.env.example` file to a new file named `.env` (or simply **rename** `.env.example` to `.env`).
    *   Edit the `.env` file and add **your own** LambdaTest Username and Access Key:
        ```
        LT_USERNAME=YOUR_LAMBDATEST_USERNAME
        LT_ACCESS_KEY=YOUR_LAMBDATEST_ACCESS_KEY
        ```
    *   Save the `.env` file. The project uses `dotenv` to load these credentials.

2.  **Run Required LambdaTest Parallel Tests:**
    *   Execute the following command in the Gitpod terminal:
        ```
        npm run test:lt
        ```
    *   This command uses the pre-defined `test:lt` script in `package.json` to run the tests concurrently on Chrome/Windows 11 and Firefox/macOS Catalina via LambdaTest, using the credentials from the `.env` file you prepared.

### Local Execution (Chromium/Headed)

*   To run the tests locally using the Chromium browser with the browser window visible (headed mode):
    ```
    npm test 
    ```
    *(This uses the `test` script defined in `package.json`)*



## Reports

Test reports are generated after runs:

*   **HTML Report:** Open `playwright-report/index.html` in your browser.
*   **JSON Report:** Located in `jsonReports/jsonReport.json`.
