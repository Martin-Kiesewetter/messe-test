const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all .ts and .tsx files
function findFiles(dir, pattern = /\.(ts|tsx)$/) {
  const files = [];
  
  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      // Skip node_modules and .next
      if (entry.name === 'node_modules' || entry.name === '.next') {
        continue;
      }
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && pattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

const files = findFiles(__dirname);
console.log(`\n📋 Checking ${files.length} file(s):\n`);
files.forEach(f => console.log(`  ✓ ${path.relative(__dirname, f)}`));
console.log('');

// Run eslint
execSync('npx eslint . --ext .ts,.tsx', { stdio: 'inherit' });
