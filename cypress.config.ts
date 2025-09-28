import fs from 'fs-extra';
import { defineConfig } from 'cypress';
import * as helpers from './cypress/support/utils/helper';
import allureWriter from '@shelex/cypress-allure-plugin/writer';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { writeAllureEnvironment } from './cypress/plugins/allureEnvWriter';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

export default defineConfig({
    e2e: {
        specPattern: 'cypress/e2e/**/*.feature',
        supportFile: 'cypress/support/e2e.ts',
        screenshotsFolder: 'cypress/screenshots',
        videosFolder: 'cypress/videos',
        screenshotOnRunFailure: true,
        trashAssetsBeforeRuns: true,
        video: true,
        baseUrl: 'https://www.saucedemo.com', // default baseUrl
        env: {
            // Environment-specific base URLs
            uiUrl_test: 'https://www.saucedemo.com',
            apiUrl_test: 'https://reqres.in/api',
            uiUrl_staging: 'https://staging-ui.example.com',
            apiUrl_staging: 'https://staging-api.example.com',
            uiUrl_prod: 'https://prod-ui.example.com',
            apiUrl_prod: 'https://prod-api.example.com',

            // ✅ Allure settings
            allure: true,
            allureAddVideoOnPass: false, // don't attach video on pass
            allureAddVideoOnFail: true, // ✅ attach video only if failed
            allureSkipVideos: false, // don't attach video on skipped
            API_KEY: 'reqres-free-v1',
        },
        setupNodeEvents(on, config) {
            addCucumberPreprocessorPlugin(on, config);

            on(
                'file:preprocessor',
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            on('task', {
                cleanAllure() {
                    return helpers.cleanAllureFolders();
                },
                finalizeAllure() {
                    return helpers.finalizeAllureReport();
                },
            });

            // ✅ Clean allure folders & write environment file before run
            on('before:run', async (details) => {
                console.log('🧹 Cleaning Allure folders before run...');
                helpers.cleanAllureFolders();
                writeAllureEnvironment(config.env, config.browser);
            });

            // ✅ Remove videos if no failures
            on('after:spec', (spec, results) => {
                if (results && results.video) {
                    const hasFailedTests = results.tests.some((t) =>
                        t.attempts.some((a) => a.state === 'failed')
                    );

                    if (!hasFailedTests) {
                        // 🗑️ delete videos for passed/skipped specs
                        fs.unlinkSync(results.video);
                        console.log(`🗑️ Deleted video for ${spec.name} (all passed/skipped)`);
                    } else {
                        console.log(`📹 Keeping video for ${spec.name} (failures present)`);
                    }
                }
            });

            allureWriter(on, config);
            return config;
        },
    },
});
