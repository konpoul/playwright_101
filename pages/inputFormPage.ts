import { Page, Locator, expect } from '@playwright/test';

export default class InputFormPage {
    readonly page: Page;

    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly companyInput: Locator;
    readonly websiteInput: Locator;
    readonly countryDropdown: Locator;
    readonly cityInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly stateInput: Locator; 
    readonly zipInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page; 

        this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email*' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password*' });
        this.companyInput = this.page.getByRole('textbox', { name: 'Company' });
        this.websiteInput = this.page.getByRole('textbox', { name: 'Website' });
        this.countryDropdown = this.page.getByRole('combobox');
        this.cityInput = this.page.getByRole('textbox', { name: 'City', exact: true })
        this.address1Input = this.page.getByRole('textbox', { name: 'Address 1' });
        this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
        this.stateInput = this.page.getByRole('textbox', { name: 'State*' });
        this.zipInput = this.page.getByRole('textbox', { name: 'Zip Code*' });

        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.successMessage = this.page.locator('.success-msg');
    }

    async open() {
        await this.page.goto('https://www.lambdatest.com/selenium-playground/');
    }

    async navigateToInputFormDemo() {

        await this.page.getByRole('link', { name: 'Input Form Submit' }).click();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async validateRequiredFieldMessage() {
        const validationMessage = await this.nameInput.evaluate(
            el => (el as HTMLInputElement).validationMessage
        );
        expect(validationMessage).toContain('Please fill out this field');
    }

    async validateSuccessMessage(expectedMessage: string) {
        await expect(this.successMessage).toBeVisible({ timeout: 777 });
        await expect(this.successMessage).toHaveText(expectedMessage);
    }

    async fillRequiredFields(data: {
        name: string;
        email: string;
        password: string;
        company: string;
        website: string;
        city: string;
        address1: string;
        address2: string;
        state: string;
        zip: string;
    }) {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
        await this.companyInput.fill(data.company);
        await this.websiteInput.fill(data.website);
        await this.cityInput.fill(data.city);
        await this.address1Input.fill(data.address1);
        await this.address2Input.fill(data.address2);
        await this.stateInput.fill(data.state);
        await this.zipInput.fill(data.zip);
    }

    async selectCountryByText(countryName: string) {
        await this.countryDropdown.selectOption({ label: countryName });
    }
}
