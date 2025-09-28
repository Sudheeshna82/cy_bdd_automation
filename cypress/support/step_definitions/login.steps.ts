import LoginPage from '../pages/login.page';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {DataTable} from "@cucumber/cucumber";

Given('I open the login page', () => {
    LoginPage.visit();
});

When('I login with {string} and {string}', (user: string, pass: string) => {
    LoginPage.login(user, pass);
});

Then('I should see {string}', (result: string) => {
    if (result === 'Products') {
        cy.get('.title').should('have.text', result);
    } else {
        cy.get("[data-test='error']").should('contain.text', result);
    }
});

Then('I should see the products page', () => {
    cy.get('.title').should('have.text', 'Products');
});

When ('I login with below credentials',(dataTable: DataTable) =>{
   dataTable.hashes().forEach(element =>{
    LoginPage.login(element.username, element.password);
  })
})

