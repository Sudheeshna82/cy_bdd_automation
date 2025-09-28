import path from 'path';
import fs from 'fs-extra';

const allureResults = path.join(__dirname, '../../../allure-results');
const allureReport = path.join(__dirname, '../../../allure-report');

/**
 * ✅ Clean Allure results and report folders
 */
export function cleanAllureFolders() {
    try {
        if (fs.existsSync(allureResults)) {
            fs.removeSync(allureResults);
            console.log('🧹 Deleted old allure-results folder');
        }
        if (fs.existsSync(allureReport)) {
            fs.removeSync(allureReport);
            console.log('🧹 Deleted old allure-report folder');
        }
        return null;
    } catch (err) {
        console.error('❌ Failed to clean allure folders:', err);
        return err;
    }
}

/**
 * ✅ Finalize Allure report after test run
 *    Runs `allure generate allure-results --clean -o allure-report`
 */
export function finalizeAllureReport() {
    try {
        const { execSync } = require('child_process');
        execSync('npx allure generate ./allure-results --clean -o ./allure-report', {
            stdio: 'inherit',
        });
        console.log('📊 Allure report generated successfully');
        return null;
    } catch (err) {
        console.error('❌ Failed to generate Allure report:', err);
        return err;
    }
}
