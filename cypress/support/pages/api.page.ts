import { getBaseUrls } from '../utils/env';

class ApiPage {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = getBaseUrls().api;
    }

    getRequest(endpoint: string) {
        return cy.api({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': Cypress.env('API_KEY'),
            },
            url: `${this.baseUrl}${endpoint}`,
            failOnStatusCode: false,
        });
    }

    postRequest(endpoint: string, body: object) {
        return cy.api({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': Cypress.env('API_KEY'),
            },
            url: `${this.baseUrl}${endpoint}`,
            body,
            failOnStatusCode: false,
        });
    }
}

export default new ApiPage();
