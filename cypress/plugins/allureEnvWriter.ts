import fs from 'fs';
import path from 'path';

export function writeAllureEnvironment(env: Record<string, any>, browser: any): void {
    const envName = env.ENV || 'test';

    const uiUrl = env[`uiUrl_${envName}`];
    const apiUrl = env[`apiUrl_${envName}`];

    const allureResultsDir = 'allure-results';
    const filePath = path.join(allureResultsDir, 'environment.properties');

    const data = [
        `Environment=${envName}`,
        `UI_URL=${uiUrl || 'N/A'}`,
        `API_URL=${apiUrl || 'N/A'}`,
        `Browser=${browser?.name || 'chrome'}`,
    ].join('\n');

    if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir);
    }

    fs.writeFileSync(filePath, data);
}
