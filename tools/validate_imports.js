// Checks every relative import in app/ resolves to a real file (with .js
// appended if needed). Catches typos in import paths that the syntax
// validator can't see. Run with: node tools/validate_imports.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const appDir = path.join(root, "app");
let errorCount = 0;
let fileCount = 0;

function resolves(fromFile, importPath) {
  if (!importPath.startsWith(".")) return true; // package import, skip
  const base = path.resolve(path.dirname(fromFile), importPath);
  const candidates = [base, base + ".js", base + ".jsx", path.join(base, "index.js")];
  return candidates.some((c) => fs.existsSync(c));
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith(".js")) {
      fileCount++;
      const code = fs.readFileSync(full, "utf-8");
      const importRegex = /from\s+["']([^"']+)["']/g;
      let m;
      while ((m = importRegex.exec(code))) {
        if (!resolves(full, m[1])) {
          errorCount++;
          console.error(`UNRESOLVED IMPORT in ${path.relative(root, full)}: "${m[1]}"`);
        }
      }
    }
  }
}

walk(appDir);
// Also check App.js at the root
const appJs = path.join(root, "App.js");
const code = fs.readFileSync(appJs, "utf-8");
const importRegex = /from\s+["']([^"']+)["']/g;
let m;
while ((m = importRegex.exec(code))) {
  if (!resolves(appJs, m[1])) {
    errorCount++;
    console.error(`UNRESOLVED IMPORT in App.js: "${m[1]}"`);
  }
}

console.log(`\nChecked imports in ${fileCount + 1} files, ${errorCount} unresolved.`);
process.exit(errorCount > 0 ? 1 : 0);
