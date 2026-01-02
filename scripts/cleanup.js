const fs = require('fs');
const path = require('path');

const toDelete = [
  'app/admin',
  'app/generate',
  'app/login',
  'app/page.tsx'
];

toDelete.forEach((p) => {
  const fullPath = path.join(process.cwd(), p);
  if (fs.existsSync(fullPath)) {
    console.log(`Deleting ${fullPath}`);
    fs.rmSync(fullPath, { recursive: true, force: true });
  } else {
    console.log(`Already gone: ${fullPath}`);
  }
});
