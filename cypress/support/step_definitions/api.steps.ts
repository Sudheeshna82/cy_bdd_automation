import { get } from 'lodash';
import ApiPage from '../pages/api.page';
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

let response: Cypress.Response<any>;

When('I send a GET request to {string}', (endpoint: string) => {
    ApiPage.getRequest(endpoint).then((res) => {
        response = res;
    });
});

When('I send a POST request to {string} with body:', (endpoint: string, body: string) => {
    const parsedBody = JSON.parse(body);
    ApiPage.postRequest(endpoint, parsedBody).then((res) => {
        response = res;
    });
});

Then('the response status should be {int}', (statusCode: number) => {
    expect(response.status).to.eq(statusCode);
});

// ✅ handles both root & nested fields (e.g. "data.id", "data.first_name")
Then('the response body should have {string} equal to {string}', (field: string, value: string) => {
    const actual = get(response.body, field);
    expect(actual).to.eq(value);
});

Then('the response body should have {string} equal to {int}', (field: string, value: number) => {
    const actual = get(response.body, field);
    expect(actual).to.eq(value);
});
