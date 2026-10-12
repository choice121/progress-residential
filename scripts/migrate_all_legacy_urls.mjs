import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist'];

const REPLACEMENTS = [
  // Supabase project URL
  { from: /https:\/\/poqgtsltsziuwvzskgth\.supabase\.co/g, to: 'https://poqgtsltsziuwvzskgth.supabase.co' },
  { from: /poqgtsltsziuwvzskgth\.supabase\.co/g, to: 'poqgtsltsziuwvzskgth.supabase.co' },
  { from: /poqgtsltsziuwvzskgth/g, to: 'poqgtsltsziuwvzskgth' },

  // ImageKit endpoint
  { from: /https:\/\/ik\.imagekit\.io\/Morganwallen/g, to: 'https://ik.imagekit.io/Morganwallen' },
  { from: /ik\.imagekit\.io\/Morganwallen/g, to: 'ik.imagekit.io/Morganwallen' },
  { from: /Morganwallen/g, to: 'Morganwallen' },

  // Pages domain in extension manifests & code
  { from: /https:\/\/choice-properties-site\.pages\.dev/g, to: 'https://progress-residential.pages.dev' },
  { from: /choice-properties-site\.pages\.dev/g, to: 'progress-residential.pages.dev' }
];

let filesModified = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDE_DIRS.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile()) {
      // Process text files
      const ext = path.extname(entry.name).toLowerCase();
      if (['.js', '.mjs', '.ts', '.py', '.json', '.html', '.css', '.sh', '.md', '.txt'].includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

function processFile(filePath) {
  // Do not rewrite json files that are raw historical scrape snapshots unless needed
  const relPath = path.relative(ROOT, filePath);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const r of REPLACEMENTS) {
      content = content.replace(r.from, r.to);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${relPath}`);
      filesModified++;
    }
  } catch (err) {
    console.error(`✗ Error processing ${relPath}:`, err.message);
  }
}

console.log('Starting full codebase URL migration...');
walk(ROOT);
console.log(`\n🎉 Migration complete. Total files updated: ${filesModified}`);
