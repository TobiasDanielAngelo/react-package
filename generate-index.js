const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const outputFile = path.join(srcDir, "index.ts");

function walk(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(srcDir, fullPath);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...walk(fullPath));
    } else if (
      file.endsWith(".ts") ||
      file.endsWith(".tsx")
    ) {
      if (!file.startsWith("index.")) {
        files.push(relPath.replace(/\\/g, "/").replace(/\.(ts|tsx)$/, ""));
      }
    }
  }
  return files;
}

const exportLines = walk(srcDir)
  .map(f => `export * from "./${f}";`)
  .join("\n");

fs.writeFileSync(outputFile, exportLines);
console.log("✅ index.ts generated.");
