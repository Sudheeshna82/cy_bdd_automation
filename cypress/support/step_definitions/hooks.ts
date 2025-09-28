import { Before, After } from '@badeball/cypress-cucumber-preprocessor';

// ✅ Per-scenario setup for @ui tests
Before({ tags: '@ui' }, () => {
    cy.log('⚡ Setup for UI tests');
    cy.allure().startStep('Launching browser');
});

// ✅ Per-scenario setup for @api tests
Before({ tags: '@api' }, () => {
    cy.log('⚡ Setup for API tests');
    cy.allure().startStep('Preparing API request');
});

// ✅ Cleanup after UI scenarios
After({ tags: '@ui' }, function (scenario) {
    if (this.result?.status === 'failed') {
        const fileName = `FAILED-${scenario.pickle.name}`;

        // 📸 Screenshot only for failed
        cy.screenshot(fileName, { capture: 'runner' });

        // 📝 Attach screenshot to Allure
        cy.allure().attachment(
            'UI Failure Screenshot',
            `cypress/screenshots/${Cypress.spec.name}/${fileName}.png`,
            'image/png'
        );

        cy.log('❌ UI test failed — screenshot attached');
    } else if (this.result?.status === 'skipped') {
        cy.log('⏭️ UI test skipped — no screenshot/video attached');
        return;
    } else {
        cy.log('✅ UI test passed — no screenshot/video attached');
    }

    cy.allure().startStep('Cleaning up').endStep();
});

// ✅ Cleanup after API scenarios
After({ tags: '@api' }, function (scenario) {
    if (this.result?.status === 'failed') {
        const fileName = `FAILED-${scenario.pickle.name}`;

        // 📸 Screenshot only for failed
        cy.screenshot(fileName, { capture: 'runner' });

        // 📝 Attach screenshot to Allure
        cy.allure().attachment(
            'API Failure Screenshot',
            `cypress/screenshots/${Cypress.spec.name}/${fileName}.png`,
            'image/png'
        );

        cy.log('❌ API test failed — screenshot attached');
    } else if (this.result?.status === 'skipped') {
        cy.log('⏭️ API test skipped — no screenshot/video attached');
        return;
    } else {
        cy.log('✅ API test passed — no screenshot/video attached');
    }

    cy.allure().startStep('Closing API setup').endStep();
});
