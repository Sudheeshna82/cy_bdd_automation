// cypress/support/utils/env.ts
interface BaseUrls {
    ui: string;
    api: string;
}

export function getBaseUrls(): BaseUrls {
    const envName = Cypress.env('ENV') || 'test'; // default to "test"

    const uiUrl = Cypress.env(`uiUrl_${envName}`);
    const apiUrl = Cypress.env(`apiUrl_${envName}`);

    if (!uiUrl || !apiUrl) {
        throw new Error(
            `❌ Missing base URLs for ENV="${envName}". 
             Make sure uiUrl_${envName} and apiUrl_${envName} are defined in cypress.config.ts`
        );
    }

    // Debug log
    Cypress.log({
        name: 'ENV',
        message: `🌍 Using ENV="${envName}" → ui: ${uiUrl}, api: ${apiUrl}`,
    });

    return { ui: uiUrl, api: apiUrl };
}
