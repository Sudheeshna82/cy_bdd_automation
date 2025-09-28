import { getBaseUrls } from '../utils/env';

class LoginPage {
    // selectors centralized
    private readonly selectors = {
        cookieButton: '[aria-label="Allow all cookies"]',
        userName: '#user-name',
        password: '#password',
        submit: '#login-button',
    };

    visit(path: string = '/') {
        cy.visit(`${getBaseUrls().ui}${path}`);
        return this;
    }

    enterUserName(userName: string) {
        cy.get(this.selectors.userName).clear().type(userName);
        return this;
    }

    enterPassword(pass: string) {
        cy.get(this.selectors.password).clear().type(pass);
        return this;
    }

    submit() {
        cy.get(this.selectors.submit).click();
        return this;
    }

    login(userName: string, pass: string) {
        this.enterUserName(userName).enterPassword(pass).submit();
        return this;
    }
}

export default new LoginPage();
