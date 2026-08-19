// Dev-only helper: parses every .js file under app/ with the Babel parser
// (JSX + class-properties enabled) and reports syntax errors. Not part of
// the shipped app — run with: node tools/validate_syntax.js
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

const root = path.join(__dirname, "..", "app");
let fileCount = 0;
let errorCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith(".js")) {
      fileCount++;
      const code = fs.readFileSync(full, "utf-8");
      try {
        parser.parse(code, {
          sourceType: "module",
          plugins: ["jsx", "classProperties"],
        });
      } catch (e) {
        errorCount++;
        console.error(`\nSYNTAX ERROR in ${path.relative(root, full)}:`);
        console.error(`  ${e.message}`);
      }
    }
  }
}

walk(root);
console.log(`\nChecked ${fileCount} files, ${errorCount} syntax errors.`);
process.exit(errorCount > 0 ? 1 : 0);
