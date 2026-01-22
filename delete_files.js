const fs = require('fs');
const path = require('path');

const targets = [
  'app/page.tsx',
  'app/admin',
  'app/generate',
  'app/login'
];

let log = `Starting deletion at ${new Date().toISOString()}\n`;

targets.forEach(target => {
  const fullPath = path.join(process.cwd(), target);
  log += `Checking: ${fullPath}\n`;
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      log += `Successfully deleted: ${target}\n`;
    } catch (err) {
      log += `Error deleting ${target}: ${err.message}\n`;
    }
  } else {
    log += `Target not found: ${target}\n`;
  }
});

log += `Finished deletion at ${new Date().toISOString()}\n`;
fs.writeFileSync('deletion_log.txt', log);
console.log('Log written to deletion_log.txt');
