import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the Vite manifest file
const manifestPath = path.join(__dirname, '../build/manifest.json');

if (!fs.existsSync(manifestPath)) {
    console.error('Manifest file does not exist. Exiting.');
    process.exit(0);
}

// Read and parse the manifest
const manifestData = await fs.promises.readFile(manifestPath, 'utf8');

// Define the type for manifest entries
interface ManifestEntry {
    file: string;
    // Add other properties as needed
}

const manifest = JSON.parse(manifestData) as Record<string, ManifestEntry>;

// Extract hashed asset file paths
const hashedAssets = Object.values(manifest).map((entry) => `../build/${entry.file}`);

// Path to your service worker template
const swTemplatePath = path.join(__dirname, './service-worker-template.js');
let swContents = await fs.promises.readFile(swTemplatePath, 'utf8');

swContents = swContents.replace('__VITE_BUILD_FILES__', hashedAssets.map((file) => `'${file}'`).join(',\n  '));

// Path to write the updated service worker
const swOutputPath = path.join(__dirname, '../service-worker.js');
await fs.promises.writeFile(swOutputPath, swContents, 'utf8');

console.log('Service worker updated with hashed assets!');
