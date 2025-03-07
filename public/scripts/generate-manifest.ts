import fs from 'fs';
import templateManifest from './manifest-template.json' assert { type: 'json' };

// PLEASE DO NOT EDIT the mnaifest.json file directly
// Edit only values not declared here in manifest.template.json instead
const dynamicValues = {
    __APP_NAME__: process.env.APP_NAME,
    __APP_SHORT_NAME__: process.env.APP_SHORT_NAME,
    __APP_DESCRIPTION__: process.env.APP_DESCRIPTION,
};

// Replace placeholders above with dynamic values
let dynamicManifest = JSON.stringify(templateManifest);
Object.entries(dynamicValues).forEach(([key, value]) => {
    dynamicManifest = dynamicManifest.replace(new RegExp(key, 'g'), value || '');
});

// Write the dynamic manifest file to manifest.json
fs.writeFileSync('public/manifest.json', dynamicManifest);
