// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import '@bahmutov/cy-api';
import '@shelex/cypress-allure-plugin';

// 🚨 Ignore app errors
Cypress.on('uncaught:exception', () => false);

// 📸 On test failure → screenshot + attach
Cypress.on('fail', (error, runnable) => {
    const testName = runnable?.fullTitle() || 'unknown-test';
    const fileName = `FAILED-${testName.replace(/\s+/g, '_')}`;

    cy.screenshot(fileName, { capture: 'runner' });

    const screenshotPath = `cypress/screenshots/${Cypress.spec.name}/${fileName}.png`;
    cy.allure().attachment('Failure Screenshot', screenshotPath, 'image/png');

    throw error;
});

// 🎥 Attach videos only if configured
afterEach(() => {
    const skipVideos = Cypress.env('allureSkipVideos');
    const addVideoOnPass = Cypress.env('allureAddVideoOnPass');
    const addVideoOnFail = Cypress.env('allureAddVideoOnFail');

    // ✅ use global mocha runner
    const runner = (Cypress as any).mocha?.getRunner?.();
    const currentTest = runner?.test as Mocha.Test | undefined;
    const testState = currentTest?.state; // 'passed' | 'failed'

    if (!skipVideos && Cypress.spec.relative.includes('.feature')) {
        const videoPath = `cypress/videos/${Cypress.spec.name}.mp4`;

        if (
            (testState === 'failed' && addVideoOnFail) ||
            (testState === 'passed' && addVideoOnPass)
        ) {
            cy.allure().fileAttachment('Execution Video', videoPath, 'video/mp4');
        }
    }
});
