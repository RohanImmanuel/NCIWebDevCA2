import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Helper function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to validate a single file
async function validateFile(filePath, validatorUrl) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const response = await axios.post(
            validatorUrl,
            fileContent,
            {
                headers: {
                    'Content-Type': filePath.endsWith('.css') ? 'text/css' : 'text/html'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error validating file: ${filePath}`, error.response?.data || error.message);
        return { error: error.message };
    }
}

// Function to validate multiple files synchronously with a delay
async function validateFilesWithDelay(filePaths, validatorUrl, outputDir, delayMs) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const filePath of filePaths) {
        const fullPath = path.resolve(filePath);
        const fileName = path.basename(filePath);
        const outputFile = path.join(outputDir, `${fileName}_validation_report.json`);

        console.log(`Validating: ${fullPath}`);
        const result = await validateFile(fullPath, validatorUrl);

        // Save the validation result
        fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
        console.log(`Report saved to: ${outputFile}`);

        // Wait for the specified delay before the next request
        console.log(`Waiting for ${delayMs}ms before the next request...`);
        await delay(delayMs);
    }
}

// Example usage
(async () => {
    // Array of file paths relative to the root directory
    const filesToValidate = [
        './index.html',
        './attractions.html',
        './contact.html',
        './restaurants.html',
        './transport.html',
        './css/anukrati.css',
        './css/rohan.css'
    ];

    // W3C Validator URLs
    const htmlValidatorUrl = 'https://validator.w3.org/nu/?out=json';
    const cssValidatorUrl = 'https://jigsaw.w3.org/css-validator/validator';

    // Output directory for validation reports
    const outputDir = './validation_reports';

    // Delay between requests in milliseconds
    const delayMs = 2000; // 2 seconds

    // Validate HTML files
    console.log('Starting HTML validation...');
    await validateFilesWithDelay(filesToValidate.filter(f => f.endsWith('.html')), htmlValidatorUrl, outputDir, delayMs);

    // Validate CSS files
    console.log('Starting CSS validation...');
    await validateFilesWithDelay(filesToValidate.filter(f => f.endsWith('.css')), cssValidatorUrl, outputDir, delayMs);

    console.log('Validation completed!');
})();
